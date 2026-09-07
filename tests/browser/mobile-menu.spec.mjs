import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
const example=fs.readFileSync('components/mobile-menu/example.html','utf8');
async function fixture(page){await page.goto('/health');await page.setContent(`<!doctype html><html lang="en"><head><title>Mobile menu</title><link rel="stylesheet" href="/dist/sitekit.css"></head><body><main><h1>Navigation fixture</h1>${example}<a href="#outside" id="outside">Outside</a></main></body></html>`);await page.addScriptTag({url:'/dist/sitekit.js'});await page.evaluate(()=>document.fonts.ready);}
test('mobile menu fills viewport, contains focus, closes and restores scroll',async({page})=>{
 await fixture(page);const trigger=page.getByRole('button',{name:'Menu',exact:true});const dialog=page.getByRole('dialog');
 for(const width of [320,390,768])for(const theme of ['kujo-light','kujo-dark','personal-dark']){
  await page.setViewportSize({width,height:844});await page.locator('html').evaluate((el,t)=>el.dataset.theme=t,theme);await trigger.click();await expect(dialog).toBeVisible();await expect(trigger).toHaveAttribute('aria-expanded','true');await expect(page.getByRole('button',{name:'Close menu'})).toBeFocused();
  expect(await dialog.evaluate(el=>({width:Math.round(el.getBoundingClientRect().width),height:Math.round(el.getBoundingClientRect().height)}))).toEqual({width,height:844});expect(await page.locator('html').evaluate(el=>getComputedStyle(el).overflow)).toBe('hidden');
  await page.keyboard.press('Shift+Tab');await expect(dialog.getByRole('link').last()).toBeFocused();await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Close menu'})).toBeFocused();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(trigger).toBeFocused();await expect(trigger).toHaveAttribute('aria-expanded','false');expect(await page.locator('html').evaluate(el=>getComputedStyle(el).overflow)).not.toBe('hidden');
 }
});
test('navigation dismissal, reduced motion and dispose release modal state',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await fixture(page);const trigger=page.getByRole('button',{name:'Menu',exact:true});await trigger.click();expect(await page.getByRole('dialog').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');await page.getByRole('link',{name:'Components',exact:true}).click();await expect(page.getByRole('dialog')).not.toBeVisible();await trigger.click();await page.evaluate(()=>SiteKit.dispose(document.querySelector('dialog')));await expect(page.getByRole('dialog')).not.toBeVisible();expect(await page.locator('html').evaluate(el=>getComputedStyle(el).overflow)).not.toBe('hidden');await page.evaluate(()=>SiteKit.enhance(document.querySelector('dialog')));await trigger.click();await expect(page.getByRole('dialog')).toBeVisible();
});
