(function (window, document) {
  'use strict';

  var focusableSelector = 'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
  var idCounter = 0;

  function nextId(prefix) {
    idCounter += 1;
    return prefix + '-' + idCounter;
  }

  function focusable(container) {
    return Array.prototype.slice.call(container.querySelectorAll(focusableSelector)).filter(function (element) {
      return !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true';
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
      var trigger = container.querySelector('[aria-haspopup="menu"]');
      var menu = container.querySelector('[role="menu"], ul');
      if (!trigger || !menu) return;
      menu.setAttribute('role', 'menu');
      if (!menu.id) menu.id = nextId('sk-menu');
      trigger.setAttribute('aria-controls', menu.id);
      var items = function () { return Array.prototype.slice.call(menu.querySelectorAll('[role="menuitem"]')); };
      var close = function (restore) {
        setExpanded(trigger, false, menu);
        if (restore) trigger.focus();
      };
      var open = function (focusFirst) {
        setExpanded(trigger, true, menu);
        if (focusFirst) {
          var item = items()[0];
          if (item) item.focus();
        }
      };
      trigger.addEventListener('click', function () {
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        if (expanded) close(false); else open(false);
      });
      trigger.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open(true);
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
      var trigger = container.querySelector('button, [aria-expanded]');
      var panel = container.querySelector('[role="dialog"], [data-sk-popover-panel]');
      if (!trigger || !panel) return;
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
      var trigger = container.querySelector('button, [aria-describedby]');
      var tip = container.querySelector('[role="tooltip"]');
      if (!trigger || !tip) return;
      if (!tip.id) tip.id = nextId('sk-tooltip');
      trigger.setAttribute('aria-describedby', tip.id);
      var show = function () { tip.hidden = false; };
      var hide = function () { tip.hidden = true; };
      trigger.addEventListener('focus', show);
      trigger.addEventListener('blur', hide);
      trigger.addEventListener('mouseenter', show);
      trigger.addEventListener('mouseleave', hide);
      trigger.addEventListener('keydown', function (event) { if (event.key === 'Escape') hide(); });
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
    var opener = modal.id ? document.querySelector('[data-sk-modal-open="' + modal.id + '"]') : null;
    var closeButtons = modal.querySelectorAll('[data-sk-modal-close], [data-sk-modal-dismiss]');
    var previous = null;
    var close = function () {
      if (typeof modal.close === 'function') modal.close(); else modal.hidden = true;
      if (previous && typeof previous.focus === 'function') previous.focus();
    };
    if (opener) opener.addEventListener('click', function () { previous = opener; if (typeof modal.showModal === 'function') modal.showModal(); else modal.hidden = false; });
    closeButtons.forEach(function (button) { button.addEventListener('click', close); });
    modal.addEventListener('cancel', function (event) { event.preventDefault(); close(); });
    modal.addEventListener('close', function () { var restore = opener || previous; var hiddenAncestor = restore && restore.closest ? restore.closest('[hidden]') : null; if (hiddenAncestor) restore = hiddenAncestor.parentElement.querySelector('[aria-haspopup="menu"]') || restore; if (restore && typeof restore.focus === 'function') window.setTimeout(function () { restore.focus(); }, 0); });
    modal.addEventListener('keydown', function (event) { if (event.key === 'Escape') close(); else trapFocus(modal, event); });
  }

  function enhanceDrawers() {
    document.querySelectorAll('[data-sk-drawer]').forEach(function (drawer) {
      var id = drawer.id || nextId('sk-drawer');
      drawer.id = id;
      var opener = document.querySelector('[data-sk-drawer-open="' + id + '"]');
      var closeButtons = drawer.querySelectorAll('[data-sk-drawer-close], [data-sk-drawer-dismiss]');
      var previous = null;
      var scrim = drawer.querySelector('.sk-drawer-scrim') || document.querySelector('[data-sk-drawer-scrim]');
      var close = function () { drawer.hidden = true; drawer.setAttribute('aria-hidden', 'true'); if (scrim) scrim.hidden = true; if (previous) previous.focus(); };
      var open = function () { previous = opener || document.activeElement; drawer.hidden = false; drawer.setAttribute('aria-hidden', 'false'); if (scrim) scrim.hidden = false; var first = focusable(drawer)[0]; if (first) first.focus(); };
      if (opener) opener.addEventListener('click', open);
      closeButtons.forEach(function (button) { button.addEventListener('click', close); });
      drawer.addEventListener('keydown', function (event) { if (event.key === 'Escape') { event.preventDefault(); close(); } else trapFocus(drawer, event); });
      if (scrim) scrim.addEventListener('click', close);
    });
  }

  function enhanceTheme() {
    var root = document.documentElement;
    document.querySelectorAll('[data-sk-theme-select]').forEach(function (select) {
      select.value = root.dataset.theme || select.value;
      select.addEventListener('change', function () { root.dataset.theme = select.value; try { window.localStorage.setItem('sk-theme', select.value); } catch (error) {} });
    });
    document.querySelectorAll('[data-sk-theme-toggle]').forEach(function (button) {
      var updateThemeButton = function () {
        var dark = root.dataset.theme === 'kujo-dark';
        button.setAttribute('aria-pressed', String(dark));
        button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      };
      updateThemeButton();
      button.addEventListener('click', function () {
        root.dataset.theme = root.dataset.theme === 'kujo-dark' ? 'kujo-light' : 'kujo-dark';
        updateThemeButton();
        try { window.localStorage.setItem('sk-theme', root.dataset.theme); } catch (error) {}
      });
    });
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
