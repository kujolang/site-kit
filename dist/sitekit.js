(function (window, document) {
  'use strict';

  var focusableSelector = 'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
  var idCounter = 0;
  var enhancedDropdowns = new WeakSet();
  var enhancedPopovers = new WeakSet();
  var enhancedTooltips = new WeakSet();
  var enhancedModals = new WeakSet();
  var enhancedDrawers = new WeakSet();
  var enhancedThemeControls = new WeakSet();
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
      return !element.matches(':disabled') && !element.closest('[hidden], [inert], [aria-hidden="true"]') && style.display !== 'none' && style.visibility !== 'hidden';
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
    document.querySelectorAll('.sk-dropdown-menu').forEach(function (container) {
      if (enhancedDropdowns.has(container)) return;
      var trigger = container.querySelector('[aria-haspopup="menu"]');
      var menu = container.querySelector('[role="menu"], ul');
      if (!trigger || !menu) return;
      enhancedDropdowns.add(container);
      menu.setAttribute('role', 'menu');
      if (!menu.id) menu.id = nextId('sk-menu');
      trigger.setAttribute('aria-controls', menu.id);
      var items = function () { return Array.prototype.slice.call(menu.querySelectorAll('[role="menuitem"]')); };
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
      trigger.addEventListener('click', function () {
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        if (expanded) close(false); else open(null);
      });
      trigger.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open('first');
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          open('last');
        }
      });
      menu.addEventListener('keydown', function (event) {
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
      document.addEventListener('click', function (event) { closeOnOutside(container, event, function () { close(false); }); });
      container.addEventListener('focusout', function () {
        window.setTimeout(function () {
          if (!container.contains(document.activeElement)) close(false);
        }, 0);
      });
    });
  }

  function enhancePopovers() {
    document.querySelectorAll('.sk-popover').forEach(function (container) {
      if (enhancedPopovers.has(container)) return;
      var trigger = container.querySelector('button, [aria-expanded]');
      var panel = container.querySelector('[role="dialog"], [data-sk-popover-panel]');
      if (!trigger || !panel) return;
      enhancedPopovers.add(container);
      if (!panel.id) panel.id = nextId('sk-popover');
      trigger.setAttribute('aria-controls', panel.id);
      var close = function (restore) { setExpanded(trigger, false, panel); if (restore) trigger.focus(); };
      trigger.addEventListener('click', function () { var expanded = trigger.getAttribute('aria-expanded') === 'true'; if (expanded) close(false); else setExpanded(trigger, true, panel); });
      trigger.addEventListener('keydown', function (event) { if (event.key === 'Escape') { event.preventDefault(); close(true); } });
      panel.addEventListener('keydown', function (event) { if (event.key === 'Escape') { event.preventDefault(); close(true); } });
      document.addEventListener('click', function (event) { closeOnOutside(container, event, function () { close(false); }); });
    });
  }

  function enhanceTooltips() {
    document.querySelectorAll('.sk-tooltip').forEach(function (container) {
      if (enhancedTooltips.has(container)) return;
      var trigger = container.querySelector('button, [aria-describedby]');
      var tip = container.querySelector('[role="tooltip"]');
      if (!trigger || !tip) return;
      enhancedTooltips.add(container);
      if (!tip.id) tip.id = nextId('sk-tooltip');
      trigger.setAttribute('aria-describedby', tip.id);
      var focused = false;
      var hovered = false;
      var update = function () { tip.hidden = !(focused || hovered); };
      trigger.addEventListener('focus', function () { focused = true; update(); });
      trigger.addEventListener('blur', function () { focused = false; update(); });
      trigger.addEventListener('mouseenter', function () { hovered = true; update(); });
      trigger.addEventListener('mouseleave', function () { hovered = false; update(); });
      trigger.addEventListener('keydown', function (event) { if (event.key === 'Escape') tip.hidden = true; });
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
    enhancedModals.add(modal);
    var openers = modal.id ? controlsTargeting('data-sk-modal-open', modal.id) : [];
    var closeButtons = modal.querySelectorAll('[data-sk-modal-close], [data-sk-modal-dismiss]');
    var previous = null;
    var close = function () {
      if (typeof modal.close === 'function') modal.close(); else modal.hidden = true;
    };
    openers.forEach(function (opener) {
      opener.addEventListener('click', function () { previous = opener; if (typeof modal.showModal === 'function') modal.showModal(); else modal.hidden = false; });
    });
    closeButtons.forEach(function (button) { button.addEventListener('click', close); });
    modal.addEventListener('cancel', function (event) { event.preventDefault(); close(); });
    modal.addEventListener('close', function () { var restore = previous; var hiddenAncestor = restore && restore.closest ? restore.closest('[hidden]') : null; if (hiddenAncestor) restore = hiddenAncestor.parentElement.querySelector('[aria-haspopup="menu"]') || restore; if (restore && typeof restore.focus === 'function') window.setTimeout(function () { restore.focus(); }, 0); });
    modal.addEventListener('keydown', function (event) { if (event.key === 'Escape') close(); else trapFocus(modal, event); });
  }

  function enhanceDrawers() {
    document.querySelectorAll('[data-sk-drawer]').forEach(function (drawer) {
      if (enhancedDrawers.has(drawer)) return;
      enhancedDrawers.add(drawer);
      var id = drawer.id || nextId('sk-drawer');
      drawer.id = id;
      var openers = controlsTargeting('data-sk-drawer-open', id);
      var closeButtons = drawer.querySelectorAll('[data-sk-drawer-close], [data-sk-drawer-dismiss]');
      var previous = null;
      var shell = drawer.closest('.sk-drawer-shell');
      var scrim = shell ? shell.querySelector('.sk-drawer-scrim, [data-sk-drawer-scrim]') : null;
      if (!scrim) scrim = controlsTargeting('data-sk-drawer-scrim', id)[0] || null;
      if (!scrim && document.querySelectorAll('[data-sk-drawer]').length === 1) scrim = document.querySelector('[data-sk-drawer-scrim]');
      var close = function () { drawer.hidden = true; drawer.setAttribute('aria-hidden', 'true'); if (scrim) scrim.hidden = true; if (previous) previous.focus(); };
      var open = function (opener) { previous = opener || document.activeElement; drawer.hidden = false; drawer.setAttribute('aria-hidden', 'false'); if (scrim) scrim.hidden = false; var first = focusable(drawer)[0]; if (first) first.focus(); };
      openers.forEach(function (opener) { opener.addEventListener('click', function () { open(opener); }); });
      closeButtons.forEach(function (button) { button.addEventListener('click', close); });
      drawer.addEventListener('keydown', function (event) { if (event.key === 'Escape') { event.preventDefault(); close(); } else trapFocus(drawer, event); });
      if (scrim) scrim.addEventListener('click', close);
    });
  }

  function enhanceTheme() {
    var root = document.documentElement;
    var selects = Array.prototype.slice.call(document.querySelectorAll('[data-sk-theme-select]'));
    var toggles = Array.prototype.slice.call(document.querySelectorAll('[data-sk-theme-toggle]'));
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
    try { storedTheme = window.localStorage.getItem('sk-theme'); } catch (error) {}
    if (supportedThemes.includes(storedTheme)) root.dataset.theme = storedTheme;
    selects.forEach(function (select) {
      if (enhancedThemeControls.has(select)) return;
      enhancedThemeControls.add(select);
      select.addEventListener('change', function () { applyTheme(select.value, true); });
    });
    toggles.forEach(function (button) {
      if (enhancedThemeControls.has(button)) return;
      enhancedThemeControls.add(button);
      button.addEventListener('click', function () {
        var dark = root.dataset.theme === 'kujo-dark' || root.dataset.theme === 'personal-dark';
        applyTheme(dark ? 'kujo-light' : 'kujo-dark', true);
      });
    });
    updateControls();
  }

  function enhance() {
    enhanceDropdowns();
    enhancePopovers();
    enhanceTooltips();
    document.querySelectorAll('dialog[data-sk-modal], dialog.sk-modal').forEach(enhanceModal);
    enhanceDrawers();
    enhanceTheme();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance); else enhance();
  window.SiteKit = window.SiteKit || {};
  window.SiteKit.enhance = enhance;
})(window, document);
