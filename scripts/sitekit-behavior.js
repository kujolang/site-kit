(function (window, document) {
  'use strict';

  var focusableSelector = 'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
  var idCounter = 0;
  var scope = document;
  var owner = null;
  var cleanups = new WeakMap();
  function find(selector) {
    var nodes = Array.from(scope.querySelectorAll(selector));
    if (scope.matches && scope.matches(selector)) nodes.unshift(scope);
    return nodes;
  }
  function listen(target, type, callback, options) {
    var host = owner;
    var wrapped = function (event) { if (!host || host.isConnected) callback(event); };
    target.addEventListener(type, wrapped, options);
    if (host) {
      if (!cleanups.has(host)) cleanups.set(host, []);
      cleanups.get(host).push(function () { target.removeEventListener(type, wrapped, options); });
    }
  }
  function dispose(root) {
    root = root || document;
    [root].concat(Array.from(root.querySelectorAll('*'))).forEach(function (element) {
      (cleanups.get(element) || []).forEach(function (cleanup) { cleanup(); });
      cleanups.delete(element);
      refreshWidgets.delete(element);
      [enhancedDropdowns, enhancedPopovers, enhancedTooltips, enhancedModals, enhancedDrawers, enhancedThemeControls, enhancedWidgets].forEach(function (set) { set.delete(element); });
    });
  }
  var enhancedDropdowns = new WeakSet();
  var enhancedPopovers = new WeakSet();
  var enhancedTooltips = new WeakSet();
  var enhancedModals = new WeakSet();
  var enhancedDrawers = new WeakSet();
  var enhancedThemeControls = new WeakSet();
  var themeInitialized = false;
  var supportedThemes = ['kujo-light', 'kujo-dark', 'personal-dark', 'bzby'];

  function nextId(prefix) {
    var id;
    do {
      idCounter += 1;
      id = prefix + '-' + idCounter;
    } while (document.getElementById(id));
    return id;
  }

  function focusable(container) {
    return Array.prototype.slice.call(container.querySelectorAll(focusableSelector)).filter(function (element) {
      var style = window.getComputedStyle(element);
      return !element.matches(':disabled') && !element.closest('[hidden], [inert], [aria-hidden="true"]') && element.getClientRects().length > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    });
  }

  function controlsTargeting(attribute, id) {
    return Array.prototype.slice.call(document.querySelectorAll('[' + attribute + ']')).filter(function (control) {
      return control.getAttribute(attribute) === id;
    });
  }

  function setExpanded(trigger, expanded, panel) {
    trigger.setAttribute('aria-expanded', String(expanded));
    if (panel) {
      panel.hidden = !expanded;
      panel.setAttribute('aria-hidden', String(!expanded));
    }
  }

  function closeOnOutside(container, event, close) {
    if (!container.contains(event.target)) close();
  }

  function enhanceDropdowns() {
    find('.sk-dropdown-menu').forEach(function (container) {
      if (enhancedDropdowns.has(container)) return;
      var trigger = container.querySelector('[aria-haspopup="menu"]');
      var menu = container.querySelector('[role="menu"], ul');
      if (!trigger || !menu) return;
      enhancedDropdowns.add(container); owner = container;
      menu.setAttribute('role', 'menu');
      if (!menu.id) menu.id = nextId('sk-menu');
      trigger.setAttribute('aria-controls', menu.id);
      var items = function () { return focusable(menu).filter(function (e) { return e.matches('[role="menuitem"]') && e.getAttribute('aria-disabled') !== 'true'; }); };
      var close = function (restore) {
        setExpanded(trigger, false, menu);
        if (restore) trigger.focus();
      };
      var open = function (focusTarget) {
        setExpanded(trigger, true, menu);
        if (focusTarget) {
          var list = items();
          var item = list[focusTarget === 'last' ? list.length - 1 : 0];
          if (item) item.focus();
        }
      };
      listen(trigger, 'click', function () {
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        if (expanded) close(false); else open(null);
      });
      listen(trigger, 'keydown', function (event) {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open('first');
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          open('last');
        }
      });
      listen(menu, 'keydown', function (event) {
        var list = items();
        var index = list.indexOf(document.activeElement);
        if (event.key === 'Escape') { event.preventDefault(); close(true); return; }
        if (event.key === 'Tab') { close(false); return; }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          if (!list.length) return;
          var next = event.key === 'ArrowDown' ? (index + 1) % list.length : (index - 1 + list.length) % list.length;
          list[next].focus();
        }
        if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          if (list.length) list[event.key === 'Home' ? 0 : list.length - 1].focus();
        }
      });
      listen(document, 'click', function (event) { closeOnOutside(container, event, function () { close(false); }); });
      listen(container, 'focusout', function () {
        window.setTimeout(function () {
          if (!container.contains(document.activeElement)) close(false);
        }, 0);
      });
    });
  }

  function placeFloating(trigger, panel, above) {
    if (panel.hidden) return;
    panel.style.position = 'fixed'; panel.style.inset = 'auto'; panel.style.transform = 'none';
    panel.style.maxWidth = 'calc(100vw - var(--sk-space-4))';
    panel.style.maxHeight = 'calc(100vh - var(--sk-space-4))'; panel.style.overflow = 'auto';
    var anchor = trigger.getBoundingClientRect(), bounds = panel.getBoundingClientRect();
    var width = document.documentElement.clientWidth, height = document.documentElement.clientHeight;
    panel.style.left = Math.max(0, Math.min(anchor.left, width - bounds.width)) + 'px';
    var top = above && anchor.top >= bounds.height ? anchor.top - bounds.height : anchor.bottom;
    if (top + bounds.height > height) top = Math.max(0, anchor.top - bounds.height);
    panel.style.top = Math.max(0, Math.min(top, height - bounds.height)) + 'px';
  }

  function enhancePopovers() {
    find('.sk-popover').forEach(function (container) {
      if (enhancedPopovers.has(container)) return;
      var trigger = container.querySelector('button, [aria-expanded]');
      var panel = container.querySelector('[role="dialog"], [data-sk-popover-panel]');
      if (!trigger || !panel) return;
      enhancedPopovers.add(container); owner = container;
      if (!panel.id) panel.id = nextId('sk-popover');
      trigger.setAttribute('aria-controls', panel.id);
      var close = function (restore) { setExpanded(trigger, false, panel); if (restore) trigger.focus(); };
      listen(trigger, 'click', function () { var expanded = trigger.getAttribute('aria-expanded') === 'true'; if (expanded) close(false); else { setExpanded(trigger, true, panel); placeFloating(trigger, panel, false); } });
      listen(trigger, 'keydown', function (event) { if (event.key === 'Escape') { event.preventDefault(); close(true); } });
      listen(window, 'resize', function () { placeFloating(trigger, panel, false); });
      listen(document, 'scroll', function () { placeFloating(trigger, panel, false); }, true);
      listen(panel, 'keydown', function (event) { if (event.key === 'Escape') { event.preventDefault(); close(true); } });
      listen(document, 'click', function (event) { closeOnOutside(container, event, function () { close(false); }); });
    });
  }

  function enhanceTooltips() {
    find('.sk-tooltip').forEach(function (container) {
      if (enhancedTooltips.has(container)) return;
      var trigger = container.querySelector('button, [aria-describedby]');
      var tip = container.querySelector('[role="tooltip"]');
      if (!trigger || !tip) return;
      enhancedTooltips.add(container); owner = container;
      if (!tip.id) tip.id = nextId('sk-tooltip');
      trigger.setAttribute('aria-describedby', Array.from(new Set((trigger.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean).concat(tip.id))).join(' '));
      var focused = false;
      var hovered = false;
      var dismissed = false;
      var update = function () { tip.hidden = dismissed || !(focused || hovered); placeFloating(trigger, tip, true); };
      listen(window, 'resize', update);
      listen(document, 'scroll', function () { if (!tip.hidden) placeFloating(trigger, tip, true); }, true);
      listen(trigger, 'focus', function () { focused = true; dismissed = false; update(); });
      listen(trigger, 'blur', function () { focused = false; update(); });
      listen(container, 'mouseenter', function () { hovered = true; dismissed = false; update(); });
      listen(container, 'mouseleave', function () { hovered = false; window.setTimeout(update, 150); });
      listen(trigger, 'keydown', function (event) { if (event.key === 'Escape') { dismissed = true; tip.hidden = true; } });
    });
  }

  function trapFocus(container, event) {
    if (event.key !== 'Tab') return;
    var list = focusable(container);
    if (!list.length) return;
    var first = list[0];
    var last = list[list.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function enhanceModal(modal) {
    if (enhancedModals.has(modal)) return;
    enhancedModals.add(modal); owner = modal;
    var openers = modal.id ? controlsTargeting('data-sk-modal-open', modal.id) : [];
    var closeButtons = modal.querySelectorAll('[data-sk-modal-close], [data-sk-modal-dismiss]');
    var previous = null;
    var close = function () {
      if (typeof modal.close === 'function') modal.close(); else modal.hidden = true;
    };
    listen(document, 'click', function (event) {
      var opener = event.target.closest('[data-sk-modal-open]');
      if (opener && opener.getAttribute('data-sk-modal-open') === modal.id && !opener.matches(':disabled, [aria-disabled="true"]')) {
        previous = opener;
        if (!modal.open) modal.showModal();
      }
      if (modal.contains(event.target) && event.target.closest('[data-sk-modal-close], [data-sk-modal-dismiss]')) close();
    });
    listen(modal, 'cancel', function (event) { event.preventDefault(); close(); });
    listen(modal, 'close', function () { var restore = previous; var hiddenAncestor = restore && restore.closest ? restore.closest('[hidden]') : null; if (hiddenAncestor) restore = hiddenAncestor.parentElement.querySelector('[aria-haspopup="menu"]') || restore; if (restore && restore.isConnected && typeof restore.focus === 'function') window.setTimeout(function () { restore.focus(); }, 0); });
    listen(modal, 'keydown', function (event) { if (event.key === 'Escape') close(); else trapFocus(modal, event); });
  }

  function enhanceDrawers() {
    find('[data-sk-drawer]').forEach(function (drawer) {
      if (enhancedDrawers.has(drawer)) return;
      enhancedDrawers.add(drawer); owner = drawer;
      var id = drawer.id || nextId('sk-drawer');
      drawer.id = id;
      var openers = controlsTargeting('data-sk-drawer-open', id);
      var closeButtons = drawer.querySelectorAll('[data-sk-drawer-close], [data-sk-drawer-dismiss]');
      var previous = null;
      var shell = drawer.closest('.sk-drawer-shell');
      var scrim = shell ? shell.querySelector('.sk-drawer-scrim, [data-sk-drawer-scrim]') : null;
      if (!scrim) scrim = controlsTargeting('data-sk-drawer-scrim', id)[0] || null;
      if (!scrim && document.querySelectorAll('[data-sk-drawer]').length === 1) scrim = document.querySelector('[data-sk-drawer-scrim]');
      var close = function () { drawer.hidden = true; drawer.setAttribute('aria-hidden', 'true'); if (scrim) scrim.hidden = true; if (previous && previous.isConnected) previous.focus(); };
      var open = function (opener) { previous = opener || document.activeElement; drawer.hidden = false; drawer.setAttribute('aria-hidden', 'false'); if (scrim) scrim.hidden = false; var first = focusable(drawer)[0]; if (first) first.focus(); else { drawer.tabIndex = -1; drawer.focus(); } };
      listen(document, 'click', function (event) {
        var opener = event.target.closest('[data-sk-drawer-open]');
        if (opener && opener.getAttribute('data-sk-drawer-open') === id && !opener.matches(':disabled, [aria-disabled="true"]')) open(opener);
        if (drawer.contains(event.target) && event.target.closest('[data-sk-drawer-close], [data-sk-drawer-dismiss]')) close();
      });
      listen(drawer, 'keydown', function (event) { if (event.key === 'Escape') { event.preventDefault(); close(); }  });
      if (scrim) listen(scrim, 'click', close);
    });
  }

  function enhanceTheme() {
    var root = document.documentElement;
    var selects = find('[data-sk-theme-select]');
    var toggles = find('[data-sk-theme-toggle]');
    var updateControls = function () {
      document.querySelectorAll('[data-sk-theme-select]').forEach(function (select) {
        if (Array.prototype.some.call(select.options, function (option) { return option.value === root.dataset.theme; })) select.value = root.dataset.theme;
      });
      document.querySelectorAll('[data-sk-theme-toggle]').forEach(function (button) {
        var dark = root.dataset.theme === 'kujo-dark' || root.dataset.theme === 'personal-dark';
        button.setAttribute('aria-pressed', String(dark));
        button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      });
    };
    var applyTheme = function (theme, persist) {
      if (!supportedThemes.includes(theme)) return;
      root.dataset.theme = theme;
      updateControls();
      if (persist) try { window.localStorage.setItem('sk-theme', theme); } catch (error) {}
    };
    var storedTheme = null;
    if (!themeInitialized) try { storedTheme = window.localStorage.getItem('sk-theme'); } catch (error) {}
    themeInitialized = true;
    if (supportedThemes.includes(storedTheme)) root.dataset.theme = storedTheme;
    selects.forEach(function (select) {
      if (enhancedThemeControls.has(select)) return;
      enhancedThemeControls.add(select); owner = select;
      listen(select, 'change', function () { applyTheme(select.value, true); });
    });
    toggles.forEach(function (button) {
      if (enhancedThemeControls.has(button)) return;
      enhancedThemeControls.add(button); owner = button;
      listen(button, 'click', function () {
        var dark = root.dataset.theme === 'kujo-dark' || root.dataset.theme === 'personal-dark';
        applyTheme(dark ? 'kujo-light' : 'kujo-dark', true);
      });
    });
    updateControls();
  }

  var enhancedWidgets = new WeakSet();
  var refreshWidgets = new WeakMap();
  function prefixIds(root, prefix) {
    if (!root || !root.querySelectorAll || !/^[A-Za-z][\w-]*$/.test(prefix)) throw new TypeError('Expected a subtree and an instance prefix');
    var all = [root].concat(Array.from(root.querySelectorAll('*'))).filter(function (e) { return e.nodeType === 1; });
    var ids = new Map();
    all.forEach(function (e) { if (e.id) { if (ids.has(e.id)) throw new Error('Duplicate source ID: ' + e.id); ids.set(e.id, prefix + '-' + e.id); } });
    ids.forEach(function (id) { var existing = document.getElementById(id); if (existing && !all.includes(existing)) throw new Error('Instance prefix already in use'); });
    all.forEach(function (e) {
      if (e.id) e.id = ids.get(e.id);
      ['for', 'aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-activedescendant', 'aria-details', 'aria-errormessage', 'headers', 'list', 'data-sk-modal-open', 'data-sk-drawer-open', 'data-sk-drawer-scrim'].forEach(function (a) {
        if (e.hasAttribute(a)) e.setAttribute(a, e.getAttribute(a).split(/\s+/).map(function (v) { return ids.get(v) || v; }).join(' '));
      });
      ['href', 'xlink:href'].forEach(function (a) { var v = e.getAttribute(a); if (v && v[0] === '#' && ids.has(v.slice(1))) e.setAttribute(a, '#' + ids.get(v.slice(1))); });
    });
    return root;
  }
  function emit(element, type, detail) { element.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: detail })); }
  function status(root) {
    var node = root.querySelector('[data-sk-status]');
    if (!node) { node = document.createElement('span'); node.dataset.skStatus = ''; node.className = 'sk-sr-only'; node.setAttribute('role', 'status'); root.append(node); }
    return node;
  }
  function setupTabs(root) {
    var list = root.querySelector('[role="tablist"]');
    if (!list) return;
    function pairs() {
      var panels = Array.from(root.querySelectorAll('[role="tabpanel"]')).filter(function (p) { return p.closest('.sk-tabs') === root; });
      return Array.from(list.querySelectorAll('[role="tab"]')).map(function (tab, i) {
        var panel = panels.find(function (p) { return p.id && p.id === tab.getAttribute('aria-controls'); }) || panels[i];
        if (!panel) return null;
        if (!tab.id) tab.id = nextId('sk-tab');
        if (!panel.id) panel.id = nextId('sk-panel');
        tab.setAttribute('aria-controls', panel.id); panel.setAttribute('aria-labelledby', tab.id); panel.tabIndex = 0;
        return { tab: tab, panel: panel };
      }).filter(Boolean);
    }
    function select(tab, focus) {
      pairs().forEach(function (p) { var yes = p.tab === tab; p.tab.setAttribute('aria-selected', String(yes)); p.tab.tabIndex = yes ? 0 : -1; p.panel.hidden = !yes; });
      if (focus) tab.focus();
    }
    function refresh() {
      var entries = pairs();
      var selected = entries.find(function (p) { return p.tab.getAttribute('aria-selected') === 'true' && !p.tab.matches(':disabled, [aria-disabled="true"]'); }) || entries.find(function (p) { return !p.tab.matches(':disabled, [aria-disabled="true"]'); });
      if (selected) select(selected.tab, false);
    }
    refreshWidgets.set(root, refresh); refresh();
    listen(list, 'click', function (e) { var tab = e.target.closest('[role="tab"]'); if (tab && !tab.matches(':disabled, [aria-disabled="true"]')) { select(tab, false); emit(root, 'sk:change', { value: tab.id }); } });
    listen(list, 'keydown', function (e) {
      var tabs = pairs().map(function (p) { return p.tab; }).filter(function (t) { return !t.matches(':disabled, [aria-disabled="true"]'); });
      var i = tabs.indexOf(e.target); if (i < 0) return;
      var vertical = list.getAttribute('aria-orientation') === 'vertical';
      var next = vertical ? 'ArrowDown' : 'ArrowRight', prev = vertical ? 'ArrowUp' : 'ArrowLeft';
      if (e.key === next) i = (i + 1) % tabs.length;
      else if (e.key === prev) i = (i + tabs.length - 1) % tabs.length;
      else if (e.key === 'Home') i = 0;
      else if (e.key === 'End') i = tabs.length - 1;
      else return;
      e.preventDefault();
      if (root.dataset.activation === 'manual') { tabs.forEach(function (t) { t.tabIndex = t === tabs[i] ? 0 : -1; }); tabs[i].focus(); }
      else { select(tabs[i], true); emit(root, 'sk:change', { value: tabs[i].id }); }
    });
  }
  function setupCombobox(root) {
    var input = root.querySelector('input[role="combobox"]'), list = root.querySelector('[role="listbox"]');
    if (!input || !list) return;
    if (!list.id) list.id = nextId('sk-options');
    input.setAttribute('aria-controls', list.id); input.setAttribute('aria-autocomplete', 'list');
    list.setAttribute('aria-label', input.labels && input.labels[0] ? input.labels[0].textContent : 'Suggestions');
    var active = null, committed = input.value;
    var notice = status(root), value = root.querySelector('input[data-sk-value]');
    function options() { return Array.from(list.querySelectorAll('[role="option"]')); }
    options().forEach(function (o) { if (!o.id) o.id = nextId('sk-option'); o.setAttribute('aria-selected', String(o.textContent.trim() === committed)); });
    function close() { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); options().forEach(function (o) { o.removeAttribute('data-active'); }); active = null; }
    function open() {
      list.hidden = false; input.setAttribute('aria-expanded', 'true');
      var query = input.value.toLocaleLowerCase();
      options().forEach(function (o) { o.hidden = !o.textContent.toLocaleLowerCase().includes(query); });
      notice.textContent = options().some(function (o) { return !o.hidden; }) ? '' : 'No results';
    }
    function choose(o) {
      if (!o || o.getAttribute('aria-disabled') === 'true') return;
      committed = o.textContent.trim(); input.value = committed;
      if (value) { value.value = o.dataset.value || committed; value.dispatchEvent(new Event('change', { bubbles: true })); }
      options().forEach(function (p) { p.setAttribute('aria-selected', String(p === o)); }); close(); input.focus();
      input.dispatchEvent(new Event('change', { bubbles: true })); emit(root, 'sk:change', { value: o.dataset.value || committed });
    }
    close();
    listen(input, 'input', function () { close(); open(); if (!input.value) { committed = ''; if (value) value.value = ''; options().forEach(function (o) { o.setAttribute('aria-selected', 'false'); }); } });
    listen(input, 'keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); input.value = committed; close(); return; }
      if (e.key === 'Enter' && active && !list.hidden) { e.preventDefault(); choose(active); return; }
      if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
      e.preventDefault(); open(); var opts = options().filter(function (o) { return !o.hidden && o.getAttribute('aria-disabled') !== 'true'; });
      if (!opts.length) return;
      var i = opts.indexOf(active), delta = e.key === 'ArrowDown' ? 1 : -1;
      active = opts[i < 0 ? (delta > 0 ? 0 : opts.length - 1) : (i + delta + opts.length) % opts.length];
      options().forEach(function (o) { o.toggleAttribute('data-active', o === active); }); input.setAttribute('aria-activedescendant', active.id); active.scrollIntoView({ block: 'nearest' });
    });
    listen(list, 'mousedown', function (e) { e.preventDefault(); });
    listen(list, 'click', function (e) { choose(e.target.closest('[role="option"]')); });
    listen(input, 'blur', function () { input.value = committed; close(); });
  }
  function dateValue(date) { return String(date.getFullYear()).padStart(4, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'); }
  function parseDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
    var parts = value.split('-').map(Number), date = new Date(0); date.setFullYear(parts[0], parts[1] - 1, parts[2]); date.setHours(12, 0, 0, 0);
    return dateValue(date) === value ? date : null;
  }
  function setupDate(root) {
    var input = root.querySelector('input[type="date"]');
    if (!input) return;
    var header = root.querySelector('h2'), grid = root.querySelector('[role="grid"]'), controls = root.querySelectorAll('header button');
    if (!header || !grid || controls.length < 2) return;
    root.querySelector('header').hidden = false; grid.hidden = false;
    if (root.querySelector('[data-weekdays]')) root.querySelector('[data-weekdays]').hidden = false;
    var today = new Date(), cursor = parseDate(input.value) || today;
    header.setAttribute('aria-live', 'polite');
    function allowed(d) { var v = dateValue(d); return (!input.min || v >= input.min) && (!input.max || v <= input.max); }
    function render(focus) {
      var year = cursor.getFullYear(), month = cursor.getMonth();
      header.textContent = cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); grid.setAttribute('aria-label', header.textContent);
      grid.replaceChildren(); var first = new Date(year, month, 1), count = new Date(year, month + 1, 0).getDate(), row;
      for (var slot = 0; slot < Math.ceil((first.getDay() + count) / 7) * 7; slot++) {
        if (slot % 7 === 0) { row = document.createElement('div'); row.setAttribute('role', 'row'); grid.append(row); }
        var cell = document.createElement('div'); cell.setAttribute('role', 'gridcell'); row.append(cell);
        var day = slot - first.getDay() + 1; if (day < 1 || day > count) continue;
        var d = new Date(year, month, day, 12), key = dateValue(d), button = document.createElement('button');
        button.type = 'button'; button.textContent = String(day); button.dataset.date = key; button.disabled = !allowed(d);
        button.setAttribute('aria-label', d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        cell.setAttribute('aria-selected', String(input.value === key));
        if (dateValue(today) === key) button.setAttribute('aria-current', 'date');
        button.tabIndex = key === dateValue(cursor) && !button.disabled ? 0 : -1; cell.append(button);
      }
      var target = grid.querySelector('button[tabindex="0"]') || grid.querySelector('button:not([disabled])');
      if (target) { target.tabIndex = 0; if (focus) target.focus(); }
    }
    controls.forEach(function (b, i) { listen(b, 'click', function () { cursor = new Date(cursor.getFullYear(), cursor.getMonth() + (i ? 1 : -1), 1, 12); render(false); }); });
    listen(grid, 'click', function (e) { var b = e.target.closest('button[data-date]'); if (!b || b.disabled) return; input.value = b.dataset.date; cursor = parseDate(input.value); input.dispatchEvent(new Event('input', { bubbles: true })); input.dispatchEvent(new Event('change', { bubbles: true })); render(true); });
    listen(input, 'change', function () { cursor = parseDate(input.value) || today; render(false); });
    listen(grid, 'keydown', function (e) {
      var b = e.target.closest('[data-date]'); if (!b) return; var d = parseDate(b.dataset.date), delta;
      var rtl = getComputedStyle(root).direction === 'rtl';
      if (e.key === 'ArrowRight') delta = rtl ? -1 : 1;
      else if (e.key === 'ArrowLeft') delta = rtl ? 1 : -1;
      else if (e.key === 'ArrowDown') delta = 7;
      else if (e.key === 'ArrowUp') delta = -7;
      else if (e.key === 'Home') delta = -d.getDay();
      else if (e.key === 'End') delta = 6 - d.getDay();
      else if (e.key === 'PageDown' || e.key === 'PageUp') { var month = d.getMonth() + (e.key === 'PageDown' ? 1 : -1), day = d.getDate(); d.setDate(1); d.setMonth(month); d.setDate(Math.min(day, new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate())); }
      else return;
      e.preventDefault(); if (delta !== undefined) d.setDate(d.getDate() + delta); if (!allowed(d)) return; cursor = d; render(true);
    });
    render(false);
  }
  function safeLink(value) { try { var u = new URL(value); return ['https:', 'http:', 'mailto:'].includes(u.protocol) ? u.href : null; } catch (e) { return null; } }
  function cleanEditor(source) {
    var result = document.createElement('div');
    function copy(node, parent) {
      if (node.nodeType === 3) { parent.append(document.createTextNode(node.textContent)); return; }
      if (node.nodeType !== 1 || ['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'SVG', 'MATH', 'TEMPLATE'].includes(node.tagName)) return;
      var tag = { B: 'strong', I: 'em' }[node.tagName] || node.tagName.toLowerCase();
      var allowed = ['p', 'div', 'br', 'strong', 'em', 'a'].includes(tag), dest = parent;
      if (allowed) {
        dest = document.createElement(tag); if (tag === 'a') { var href = safeLink(node.getAttribute('href')); if (href) dest.setAttribute('href', href); }
        parent.append(dest);
      }
      Array.from(node.childNodes).forEach(function (child) { copy(child, dest); });
    }
    Array.from(source.childNodes).forEach(function (node) { copy(node, result); }); return result;
  }
  function serializeEditor(root) { var editor = root.matches('[contenteditable]') ? root : root.querySelector('[contenteditable]'); if (!editor) throw new TypeError('Expected an editor'); return cleanEditor(editor).innerHTML; }
  function setupEditor(root) {
    var editor = root.querySelector('[contenteditable]'), toolbar = root.querySelector('[role="toolbar"]'); if (!editor || !toolbar) return;
    if (!editor.hasAttribute('aria-label') && !editor.hasAttribute('aria-labelledby')) editor.setAttribute('aria-label', 'Content');
    toolbar.hidden = false;
    editor.replaceChildren(...cleanEditor(editor).childNodes);
    var selection = null, buttons = Array.from(toolbar.querySelectorAll('button')), names = ['bold', 'italic', 'link'];
    function save() { var s = window.getSelection(); if (s.rangeCount && editor.contains(s.anchorNode) && editor.contains(s.focusNode)) selection = s.getRangeAt(0).cloneRange(); }
    function update() {
      save(); var s = window.getSelection(), node = s.anchorNode && (s.anchorNode.nodeType === 1 ? s.anchorNode : s.anchorNode.parentElement);
      buttons.forEach(function (b, i) { b.setAttribute('aria-pressed', String(!!(node && editor.contains(node) && node.closest(i === 0 ? 'b,strong' : i === 1 ? 'i,em' : 'a')))); });
    }
    buttons.forEach(function (b, i) { b.setAttribute('aria-label', names[i] === 'link' ? 'Insert link' : names[i][0].toUpperCase() + names[i].slice(1)); b.dataset.skFormat = names[i]; });
    listen(document, 'selectionchange', update);
    listen(toolbar, 'mousedown', function (e) { if (e.target.closest('button')) e.preventDefault(); });
    listen(toolbar, 'click', function (e) {
      var b = e.target.closest('[data-sk-format]'); if (!b) return;
      var url = b.dataset.skFormat === 'link' ? window.prompt('Link URL (https, http or mailto)') : null;
      if (b.dataset.skFormat === 'link' && !safeLink(url)) { status(root).textContent = 'Link not inserted: use an https, http or mailto URL.'; return; }
      editor.focus(); var s = window.getSelection(); if (selection && editor.contains(selection.commonAncestorContainer)) { s.removeAllRanges(); s.addRange(selection); }
      if (!s.rangeCount || s.isCollapsed || !editor.contains(s.getRangeAt(0).commonAncestorContainer)) { status(root).textContent = 'Select text to format.'; return; }
      var range = s.getRangeAt(0), wrapper = document.createElement({ bold: 'strong', italic: 'em', link: 'a' }[b.dataset.skFormat]);
      var ancestor = (range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentElement).closest(wrapper.tagName.toLowerCase());
      if (ancestor && editor.contains(ancestor) && b.dataset.skFormat !== 'link') { var parent = ancestor.parentNode; while (ancestor.firstChild) parent.insertBefore(ancestor.firstChild, ancestor); ancestor.remove(); }
      else { if (url) wrapper.href = safeLink(url); wrapper.append(range.extractContents()); range.insertNode(wrapper); range.selectNodeContents(wrapper); s.removeAllRanges(); s.addRange(range); }
      update(); editor.dispatchEvent(new Event('input', { bubbles: true }));
    });
    function insertText(text) {
      editor.focus(); var s = window.getSelection(); if (!s.rangeCount || !editor.contains(s.getRangeAt(0).commonAncestorContainer)) return;
      var r = s.getRangeAt(0); r.deleteContents(); var t = document.createTextNode(text); r.insertNode(t); r.setStartAfter(t); r.collapse(true); s.removeAllRanges(); s.addRange(r); save(); editor.dispatchEvent(new Event('input', { bubbles: true }));
    }
    listen(editor, 'paste', function (e) { e.preventDefault(); insertText(e.clipboardData.getData('text/plain')); });
    listen(editor, 'drop', function (e) { e.preventDefault(); status(root).textContent = 'Paste plain text to insert content.'; });
    listen(editor, 'beforeinput', function (e) { if (['insertFromPaste', 'insertFromDrop'].includes(e.inputType)) e.preventDefault(); });
    update();
  }
  function setupStepper(root) {
    var input = root.querySelector('input[type="number"]'), buttons = root.querySelectorAll('button'); if (!input || buttons.length < 2) return;
    function sync() { buttons[0].disabled = input.disabled || input.readOnly || (input.min !== '' && input.value !== '' && input.valueAsNumber <= Number(input.min)); buttons[1].disabled = input.disabled || input.readOnly || (input.max !== '' && input.value !== '' && input.valueAsNumber >= Number(input.max)); }
    buttons.forEach(function (b, i) { b.setAttribute('aria-label', i ? 'Increase value' : 'Decrease value'); listen(b, 'click', function () {
      if (input.disabled || input.readOnly) return; var before = input.value;
      if (input.value === '' || !Number.isFinite(input.valueAsNumber)) input.value = input.min || String(input.max !== '' && Number(input.max) < 0 ? Number(input.max) : 0);
      else { try { if (i) input.stepUp(); else input.stepDown(); } catch (e) { return; } }
      sync(); if (before !== input.value) { input.dispatchEvent(new Event('input', { bubbles: true })); input.dispatchEvent(new Event('change', { bubbles: true })); }
    }); }); listen(input, 'input', sync); listen(input, 'change', sync); sync();
  }
  function enhanceWidgets() {
    find('.sk-tabs, .sk-combobox, .sk-date-picker, .sk-tree-view, .sk-rich-text-editor, .sk-stepper, .sk-segmented-control, .sk-code-block, .sk-carousel, .sk-toast, .sk-promo-banner').forEach(function (root) {
      if (enhancedWidgets.has(root)) { if (refreshWidgets.has(root)) refreshWidgets.get(root)(); return; } enhancedWidgets.add(root); owner = root;
      if (root.matches('.sk-tabs')) setupTabs(root);
      if (root.matches('.sk-combobox')) setupCombobox(root);
      if (root.matches('.sk-date-picker')) setupDate(root);
      if (root.matches('.sk-rich-text-editor')) setupEditor(root);
      if (root.matches('.sk-stepper')) setupStepper(root);
      if (root.matches('.sk-tree-view')) root.querySelectorAll('button[aria-expanded]').forEach(function (b) {
        var list = b.nextElementSibling; if (!list) return; if (!list.id) list.id = nextId('sk-branch'); b.setAttribute('aria-controls', list.id); list.hidden = b.getAttribute('aria-expanded') !== 'true';
        listen(b, 'click', function () { setExpanded(b, list.hidden, list); });
      });
      if (root.matches('.sk-segmented-control')) {
        var buttons = Array.from(root.querySelectorAll('button')), selected = buttons.find(function (b) { return b.getAttribute('aria-pressed') === 'true'; }) || buttons[0];
        function sync(b) { buttons.forEach(function (p) { p.setAttribute('aria-pressed', String(p === b)); }); }
        sync(selected); listen(root, 'click', function (e) { var b = e.target.closest('button'); if (buttons.includes(b) && !b.disabled) { sync(b); emit(root, 'sk:change', { value: b.dataset.value || b.textContent.trim() }); } });
      }
      if (root.matches('.sk-toast, .sk-promo-banner')) listen(root, 'click', function (e) { if (e.target.closest('[data-sk-dismiss], [data-toast-dismiss]')) root.hidden = true; });
      if (root.matches('.sk-code-block')) {
        var pre = root.querySelector('pre'), copy = root.querySelector('[data-copy-code]');
        function scrollable() { if (!pre) return; if (pre.scrollWidth > pre.clientWidth || pre.scrollHeight > pre.clientHeight) { pre.tabIndex = 0; pre.setAttribute('role', 'region'); pre.setAttribute('aria-label', 'Code'); } else { pre.removeAttribute('tabindex'); pre.removeAttribute('role'); pre.removeAttribute('aria-label'); } }
        scrollable(); var observer = new ResizeObserver(scrollable); if (pre) observer.observe(pre); if (!cleanups.has(root)) cleanups.set(root, []); cleanups.get(root).push(function () { observer.disconnect(); });
        if (copy) listen(copy, 'click', async function () { var code = root.querySelector('code'); if (!code) return; try { await navigator.clipboard.writeText(code.textContent); status(root).textContent = 'Code copied.'; } catch (e) { status(root).textContent = 'Copy unavailable. Focus the code, select its text and copy manually.'; pre.tabIndex = 0; } });
      }
      if (root.matches('.sk-carousel')) {
        var track = root.querySelector('.sk-carousel__track'), prev = root.querySelector('[data-carousel-prev]'), next = root.querySelector('[data-carousel-next]'); if (!track || !prev || !next) return;
        track.tabIndex = 0; track.setAttribute('role', 'region'); track.setAttribute('aria-label', 'Slides');
        function sync() { var x = Math.abs(track.scrollLeft), max = track.scrollWidth - track.clientWidth; prev.disabled = x <= 1; next.disabled = x >= max - 1; }
        [prev, next].forEach(function (b, i) { listen(b, 'click', function () { var direction = getComputedStyle(track).direction === 'rtl' ? -1 : 1; track.scrollBy({ left: (i ? 1 : -1) * direction * track.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); status(root).textContent = i ? 'Next slides' : 'Previous slides'; }); });
        listen(track, 'scroll', sync); var observer = new ResizeObserver(sync); observer.observe(track); if (!cleanups.has(root)) cleanups.set(root, []); cleanups.get(root).push(function () { observer.disconnect(); }); sync();
      }
    });
  }

  function enhance(root) {
    scope = root && root.querySelectorAll ? root : document;
    owner = null;
    enhanceDropdowns();
    enhancePopovers();
    enhanceTooltips();
    find('dialog[data-sk-modal], dialog.sk-modal').forEach(enhanceModal);
    enhanceDrawers();
    enhanceTheme();
    enhanceWidgets();
    owner = null;
    scope = document;
  }

  document.addEventListener('click', function (event) {
    if (event.target.closest('.sk-button[aria-disabled="true"]')) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);

  if (document.readyState === 'loading') listen(document, 'DOMContentLoaded', enhance); else enhance();
  window.SiteKit = window.SiteKit || {};
  window.SiteKit.enhance = enhance;
  window.SiteKit.dispose = dispose;
  window.SiteKit.prefixIds = prefixIds;
  window.SiteKit.serializeEditor = serializeEditor;
})(window, document);
