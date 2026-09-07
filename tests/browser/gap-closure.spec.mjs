import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
const example = slug => fs.readFileSync(`components/${slug}/example.html`, 'utf8');
async function fixture(page, html, width = 390) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('/health');
  await page.setContent(`<!doctype html><html lang="en" data-theme="kujo-light"><head><title>Component reference</title><link rel="stylesheet" href="/dist/sitekit.css"></head><body><main id="main"><h1>Component reference</h1>${html}</main></body></html>`);
  await page.addScriptTag({ url: '/dist/sitekit.js' });
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('16px "Departure Mono"'))).toBe(true);
}
for (const slug of fs.readdirSync('components').filter(s => fs.existsSync(`components/${s}/example.html`))) {
  test(`isolated ${slug}`, async ({ page }) => {
    await fixture(page, slug === 'skip-link' ? example(slug).replace(/<main.*?<\/main>/s, '') : example(slug));
    const issues = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(issues.violations).toEqual([]);
    expect(await page.evaluate(() => [...document.querySelectorAll('[hidden]')].filter(e => e.getClientRects().length).length)).toBe(0);
  });
}
test('drawer lifecycle and nonmodal focus', async ({ page }) => {
  await fixture(page, example('drawer')+'<button id="after">After</button>');
  const drawer = page.locator('[data-sk-drawer]'); await expect(drawer).toBeHidden();
  await page.locator('[data-sk-drawer-open]').click(); await expect(drawer).toBeVisible();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape'); await expect(drawer).toBeHidden(); await expect(page.locator('[data-sk-drawer-open]')).toBeFocused();
  await page.evaluate(() => { let b=document.createElement('button'); b.textContent='New opener'; b.dataset.skDrawerOpen='project-drawer'; document.body.append(b); SiteKit.enhance(b); SiteKit.enhance(); });
  await page.getByRole('button',{name:'New opener'}).click(); await expect(drawer).toBeVisible();
  await page.locator('[data-sk-drawer-close]').click(); await expect(page.getByRole('button',{name:'New opener'})).toBeFocused();
  await page.evaluate(() => { let d=document.querySelector('[data-sk-drawer]'); SiteKit.dispose(d); d.remove(); document.body.append(d); SiteKit.enhance(d); });
  await page.getByRole('button',{name:'New opener'}).click(); await expect(drawer).toBeVisible();
});
test('tabs manual automatic vertical and instances', async ({ page }) => {
  await fixture(page, example('tabs'));
  await page.evaluate(() => { let r=document.querySelector('.sk-tabs').cloneNode(true); SiteKit.prefixIds(r,'second'); r.dataset.activation='manual'; r.querySelector('[role=tablist]').setAttribute('aria-orientation','vertical'); document.querySelector('main').append(r); SiteKit.enhance(r); SiteKit.enhance(r); });
  let first=page.locator('.sk-tabs').first(), second=page.locator('.sk-tabs').last();
  await first.getByRole('tab',{name:'Overview'}).focus(); await page.keyboard.press('ArrowRight'); await expect(first.getByRole('tab',{name:'Details'})).toHaveAttribute('aria-selected','true');
  await second.getByRole('tab',{name:'Overview'}).focus(); await page.keyboard.press('ArrowDown'); await expect(second.getByRole('tab',{name:'Details'})).toBeFocused(); await expect(second.getByRole('tab',{name:'Overview'})).toHaveAttribute('aria-selected','true'); await page.keyboard.press('Enter'); await expect(second.getByRole('tab',{name:'Details'})).toHaveAttribute('aria-selected','true');
});
test('combobox filters commits escapes and empty results', async ({ page }) => {
  await fixture(page,example('combobox')); let input=page.getByRole('combobox');
  await input.fill('Ca');
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('ArrowDown'); await expect(input).toHaveAttribute('aria-activedescendant',/sk-option/); await page.keyboard.press('Enter'); await expect(input).toHaveValue('Card');
  await input.fill('missing'); await expect(page.getByRole('status')).toHaveText('No results'); await page.keyboard.press('Escape'); await expect(input).toHaveValue('Card'); await expect(input).toHaveAttribute('aria-expanded','false');
});
test('calendar leap year boundaries keyboard and native value', async ({ page }) => {
  await fixture(page,example('date-picker'));
  await page.locator('input[type=date]').fill('2024-02-28'); await page.locator('input[type=date]').dispatchEvent('change');
  await page.getByRole('button',{name:'Wednesday, February 28, 2024',exact:true}).focus(); await page.keyboard.press('ArrowRight'); await expect(page.getByRole('button',{name:'Thursday, February 29, 2024',exact:true})).toBeFocused(); await page.keyboard.press('Enter'); await expect(page.locator('input[type=date]')).toHaveValue('2024-02-29'); await page.keyboard.press('ArrowRight'); await expect(page.getByRole('button',{name:'Friday, March 1, 2024',exact:true})).toBeFocused();
});
test('editor selected text formatting paste and safe serialization', async ({ page }) => {
  await fixture(page,example('rich-text-editor'));
  await page.getByRole('textbox',{name:'Content'}).evaluate(e => { e.focus(); const r=document.createRange();r.selectNodeContents(e);let s=getSelection();s.removeAllRanges();s.addRange(r); });
  await page.getByRole('button',{name:'Bold',exact:true}).click(); await expect(page.locator('[contenteditable] strong')).toHaveText('Write content here.');
  await page.getByRole('textbox',{name:'Content'}).evaluate(e => { e.focus();const r=document.createRange();r.selectNodeContents(e);getSelection().removeAllRanges();getSelection().addRange(r); const d=new DataTransfer();d.setData('text/plain','<img src=x onerror=alert(1)>');d.setData('text/html','<img src=x onerror=alert(1)>');e.dispatchEvent(new ClipboardEvent('paste',{clipboardData:d,bubbles:true,cancelable:true})); });
  expect(await page.locator('[contenteditable] img').count()).toBe(0);
  const safe=await page.locator('.sk-rich-text-editor').evaluate(e => { e.querySelector('[contenteditable]').innerHTML='<a href="javascript:alert(1)" onclick="alert(1)">Bad</a><svg onload="alert(1)"></svg><strong>Safe</strong>'; return SiteKit.serializeEditor(e); });
  expect(safe).toBe('<a>Bad</a><strong>Safe</strong>');
});
test('promoted stepper segmented tree toast and copy', async ({ page }) => {
  await fixture(page,['stepper','segmented-control','tree-view','toast','code-block'].map(example).join(''));
  await page.locator('input[type=number]').evaluate(e=>{e.min='0';e.max='4';e.step='0.5';}); await page.getByRole('button',{name:'Increase value'}).click(); await expect(page.locator('input[type=number]')).toHaveValue('3.5'); await page.getByRole('button',{name:'Increase value'}).click(); await expect(page.getByRole('button',{name:'Increase value'})).toBeDisabled();
  await page.getByRole('button',{name:'List',exact:true}).click(); await expect(page.getByRole('button',{name:'List',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Inputs',exact:true}).click(); await expect(page.getByRole('link',{name:'Text input'})).toBeHidden();
  await page.getByRole('button',{name:'Dismiss',exact:true}).click(); await expect(page.locator('.sk-toast')).toBeHidden();
  await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{value:{writeText:async t=>{window.copied=t;}}});}); await page.getByRole('button',{name:'Copy',exact:true}).click(); expect(await page.evaluate(()=>window.copied)).toBe(await page.locator('code').textContent());
});
for (const theme of ['kujo-light','kujo-dark','personal-dark']) test(`button icon inheritance ${theme}`,async({page})=>{
  await fixture(page,['primary','secondary','ghost','danger'].map(v=>`<button class="sk-button" data-variant="${v}">Save<span class="sk-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M1 1L20 20"/></svg></span></button>`).join(''));
  await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
  for(const b of await page.locator('button').all()){ for(const state of ['base','hover','focus','disabled']) { if(state==='hover')await b.hover();if(state==='focus')await b.focus();if(state==='disabled')await b.evaluate(e=>e.disabled=true); expect(await b.evaluate(e=>getComputedStyle(e).color===getComputedStyle(e.querySelector('path')).stroke)).toBe(true); } }
});
for(const width of [320,390,768,1440]) test(`containment ${width}`,async({page})=>{
  for(const slug of ['bento-grid','slider','content-section','generator-panel','newsletter-signup','product-showcase']){
    await fixture(page,example(slug),width);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
    if(slug==='bento-grid' && width<=390) expect(await page.locator('.sk-bento-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length)).toBe(1);
  }
});

test('dynamic tabs inserted before repeat enhancement', async ({page}) => {
  await fixture(page,example('tabs'));
  await page.evaluate(()=>{let r=document.querySelector('.sk-tabs');r.querySelector('[role=tablist]').insertAdjacentHTML('beforeend','<button type="button" role="tab" aria-controls="new-panel">New</button>');r.insertAdjacentHTML('beforeend','<section id="new-panel" role="tabpanel">New content</section>');SiteKit.enhance(r);});
  await expect(page.locator('#new-panel')).toBeHidden(); await page.getByRole('tab',{name:'New',exact:true}).click(); await expect(page.locator('#new-panel')).toBeVisible();
});
test('tooltip preserves descriptions, pointer travel and Escape',async({page})=>{
  await fixture(page,'<p id="extra">Additional description</p>'+example('tooltip').replace('aria-describedby="tooltip-content"','aria-describedby="extra tooltip-content"'));
  const trigger=page.getByRole('button',{name:'Info',exact:true}), tip=page.getByRole('tooltip');
  await trigger.hover();await expect(tip).toBeVisible();await tip.hover();await expect(tip).toBeVisible();await trigger.focus();await page.keyboard.press('Escape');await expect(tip).toBeHidden();await expect(trigger).toHaveAttribute('aria-describedby','extra tooltip-content');
});
test('disabled action and native progress synchronization',async({page})=>{
  await fixture(page,'<a href="#activated" class="sk-button" aria-disabled="true">Disabled action</a>'+example('progress-bar'));
  await page.getByRole('link',{name:'Disabled action'}).focus();await page.keyboard.press('Enter');expect(page.url()).not.toContain('#activated');
  await page.locator('progress').evaluate(e=>{e.value=200;});expect(await page.locator('progress').evaluate(e=>e.value)).toBe(100);
});
test('reference forms search media and keyboard',async({page,browserName})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/examples/reference-compositions/index.html');expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);await page.keyboard.press(browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab');await expect(page.getByRole('link',{name:'Skip to reference content'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
  await page.getByRole('button',{name:'Validate locally'}).click();await expect(page.locator('#contact-email')).toHaveAttribute('aria-invalid','true');
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
  await page.locator('#contact-email').fill('builder@example.com');await page.getByRole('button',{name:'Validate locally'}).click();await expect(page.locator('[data-form-status]')).toHaveText('Valid locally. No data was sent.');
  await page.locator('#reference-search').fill('media-not-found');await expect(page.locator('[data-search-status]')).toHaveText('No matching records');await page.locator('#reference-search').fill('video');await page.keyboard.press('ArrowDown');await expect(page.getByRole('link',{name:'Native image and video'})).toBeFocused();
  await expect.poll(()=>page.locator('img').evaluate(e=>e.complete && e.naturalWidth > 0)).toBe(true);
  await expect(page.locator('img')).toHaveAttribute('width','640');
  expect(await page.locator('img').evaluate(e=>e.currentSrc)).toContain('/assets/diagram.svg');
  await expect.poll(()=>page.locator('video').evaluate(e=>e.readyState)).toBeGreaterThanOrEqual(1);
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
});
test('all copied examples have unique IDs and complete ARIA references',async({page})=>{
  await fixture(page,'');
  for(const slug of fs.readdirSync('components').filter(s=>fs.existsSync(`components/${s}/example.html`))) {
    const errors=await page.evaluate(({html,slug})=>{
      const host=document.createElement('div');host.innerHTML=html;
      const clone=host.cloneNode(true);SiteKit.prefixIds(host,slug+'-one');SiteKit.prefixIds(clone,slug+'-two');document.querySelector('main').replaceChildren(host,clone);SiteKit.enhance(host);SiteKit.enhance(clone);
      const ids=[...document.querySelectorAll('[id]')].map(e=>e.id), errors=[];if(ids.length!==new Set(ids).size)errors.push('duplicate IDs');
      for(const e of document.querySelectorAll('*'))for(const a of ['for','aria-controls','aria-labelledby','aria-describedby','aria-activedescendant'])for(const id of (e.getAttribute(a)||'').split(/\s+/).filter(Boolean))if(!document.getElementById(id))errors.push(a+':'+id);
      SiteKit.dispose(host);SiteKit.dispose(clone);return errors;
    },{html:example(slug),slug});
    expect(errors,slug).toEqual([]);
  }
});
for(const theme of ['kujo-light','kujo-dark','personal-dark'])test(`critical visual ${theme}`,async({page,browserName})=>{
  test.skip(browserName!=='chromium','Representative Chromium visual matrix; all engines run behavior.');
  await page.clock.setFixedTime(new Date('2026-07-09T12:00:00'));
  await fixture(page,example('button').replace('</button>','<span class="sk-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg></span></button>')+example('avatar')+example('date-picker')+example('tabs')+example('progress-bar'),768);
  await page.evaluate(t=>{document.documentElement.dataset.theme=t;document.querySelector('main').style.fontFamily='Departure Mono';},theme);
  await expect(page.locator('main')).toHaveScreenshot(`critical-${theme}.png`,{animations:'disabled',maxDiffPixelRatio:0.01});
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
});
for(const width of [320,390,768,1440])test(`independent container text zoom RTL ${width}`,async({page})=>{
  await fixture(page,`<div style="width:min(100%,390px);font-size:200%" dir="rtl">${example('bento-grid')+example('toggle')+example('table')+example('newsletter-signup')}</div>`,width);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
});

test('editor link schemes and keyboard toolbar',async({page})=>{
  await fixture(page,example('rich-text-editor'));
  const select=async()=>page.locator('[contenteditable]').evaluate(e=>{e.focus();let r=document.createRange();r.selectNodeContents(e);getSelection().removeAllRanges();getSelection().addRange(r);});
  await select();page.once('dialog',d=>d.accept('javascript:alert(1)'));await page.getByRole('button',{name:'Insert link'}).click();await expect(page.locator('[contenteditable] a')).toHaveCount(0);
  await select();await page.getByRole('button',{name:'Insert link'}).focus();page.once('dialog',d=>d.accept('https://example.com/reference'));await page.keyboard.press('Enter');await expect(page.locator('[contenteditable] a')).toHaveAttribute('href','https://example.com/reference');
});
test('carousel boundaries, dismissal and clipboard failure',async({page})=>{
  await fixture(page,example('carousel')+example('promo-banner')+example('code-block'));
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('[data-carousel-prev]')).toBeDisabled();await page.locator('[data-carousel-next]').click();await expect.poll(()=>page.locator('.sk-carousel__track').evaluate(e=>e.scrollLeft)).toBeGreaterThan(0);
  await page.getByRole('button',{name:'Dismiss announcement'}).click();await expect(page.locator('.sk-promo-banner')).toBeHidden();
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw Error('denied');}}}));await page.getByRole('button',{name:'Copy',exact:true}).focus();await page.keyboard.press('Enter');await expect(page.locator('.sk-code-block [role=status]')).toContainText('Copy unavailable');await expect(page.getByRole('button',{name:'Copy',exact:true})).toBeFocused();
});

for(const slug of fs.readdirSync('components').filter(s=>fs.existsSync(`components/${s}/example.html`))) {
 const schema=JSON.parse(fs.readFileSync(`components/${slug}/${slug}.schema.json`));
 for(const variant of Object.values(schema.variantContracts).filter(v=>v.example)) {
  const record=schema.examples.find(e=>e.id===variant.example);
  test(`variant contract ${record.id}`,async({page,browserName})=>{
    test.skip(browserName!=='chromium','Representative variant matrix; interaction families run all engines.');
    await fixture(page,fs.readFileSync(`components/${slug}/${record.htmlFile}`,'utf8'),1100);
    if(variant.kind==='implemented')await expect(page.locator(variant.binding).first()).toBeAttached();
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
  });
 }
}

test('floating panels stay within viewport edges',async({page})=>{
  await fixture(page,`<div style="position:fixed;right:0;bottom:0">${example('popover')+example('tooltip')}</div>`,320);
  await page.locator('.sk-popover button').first().click();
  for(const selector of ['.sk-popover [role=dialog]','.sk-tooltip [role=tooltip]']){
    if(selector.includes('tooltip'))await page.locator('.sk-tooltip button').focus();
    const box=await page.locator(selector).boundingBox();expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(321);expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y+box.height).toBeLessThanOrEqual(901);
  }
});

test('reference composition visual',async({page,browserName})=>{
  test.skip(browserName!=='chromium','Representative composition visual; behavior runs all engines.');
  await page.setViewportSize({width:390,height:844});await page.goto('/examples/reference-compositions/index.html');await page.evaluate(async()=>{document.querySelector('main').style.fontFamily='Departure Mono';await document.fonts.ready;});
  await expect(page.locator('main')).toHaveScreenshot(`reference-composition-${process.platform}.png`,{animations:'disabled',mask:[page.locator('video')],maxDiffPixelRatio:0.01});
});

for(const width of [320,390,768,1440])test(`navigation tables forms text stress ${width}`,async({page})=>{
  for(const slug of ['header','footer','table','pricing-table','form','form-field']){
    await fixture(page,example(slug),width);
    await page.evaluate(()=>{document.documentElement.style.fontSize='200%';document.querySelectorAll('p,a,td,th').forEach(e=>{e.append(document.createTextNode(' Additional descriptive content for a narrow reusable layout.'));});});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth),slug).toBeLessThanOrEqual(width+1);
  }
});
test('bounded dates, disabled options and loading geometry',async({page})=>{
  await page.clock.setFixedTime(new Date('2026-07-10T12:00:00'));
  await fixture(page,example('date-picker')+example('combobox')+'<button class="sk-button" aria-busy="false"><span class="sk-button__label">Save changes</span><span class="sk-button__status">Saving…</span></button>');
  await expect(page.locator('[data-date="2026-07-09"]')).not.toHaveAttribute('aria-current','date');await expect(page.locator('[data-date="2026-07-10"]')).toHaveAttribute('aria-current','date');
  await page.locator('input[type=date]').evaluate(e=>{e.min='2026-07-09';e.max='2026-07-10';e.dispatchEvent(new Event('change',{bubbles:true}));});
  await expect(page.locator('[data-date="2026-07-08"]')).toBeDisabled();await expect(page.locator('[data-date="2026-07-11"]')).toBeDisabled();await page.locator('[data-date="2026-07-09"]').focus();await page.keyboard.press('ArrowLeft');await expect(page.locator('[data-date="2026-07-09"]')).toBeFocused();
  await page.locator('[role=option]').filter({hasText:'Card'}).evaluate(e=>e.setAttribute('aria-disabled','true'));await page.getByRole('combobox').fill('Ca');await page.keyboard.press('ArrowDown');await expect(page.getByRole('combobox')).not.toHaveAttribute('aria-activedescendant',/.+/);
  const loading=page.locator('button[aria-busy]');const before=await loading.boundingBox();await loading.evaluate(e=>{e.setAttribute('aria-busy','true');e.disabled=true;});expect((await loading.boundingBox()).width).toBe(before.width);await expect(loading).toBeDisabled();
});

test('editor mixed selection state and relinking',async({page})=>{
  await fixture(page,example('rich-text-editor'));
  await page.locator('[contenteditable]').evaluate(e=>{e.innerHTML='<strong>Bold</strong> plain';e.focus();let r=document.createRange();r.selectNodeContents(e);getSelection().removeAllRanges();getSelection().addRange(r);});
  await expect(page.getByRole('button',{name:'Bold',exact:true})).toHaveAttribute('aria-pressed','mixed');await page.getByRole('button',{name:'Bold',exact:true}).click();await expect(page.getByRole('button',{name:'Bold',exact:true})).toHaveAttribute('aria-pressed','true');
  page.once('dialog',d=>d.accept('https://example.com/first'));await page.getByRole('button',{name:'Insert link'}).click();page.once('dialog',d=>d.accept('https://example.com/second'));await page.getByRole('button',{name:'Insert link'}).click();await expect(page.locator('[contenteditable] a')).toHaveCount(1);await expect(page.locator('[contenteditable] a')).toHaveAttribute('href','https://example.com/second');
});
