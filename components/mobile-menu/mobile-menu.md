# Mobile Menu

Full-screen navigation composed with native dialog and the optional SiteKit modal controller. Copy example.html plus the complete dist directory. The trigger targets the dialog ID with data-sk-modal-open and aria-controls; repeat instances need unique IDs (SiteKit.prefixIds updates references).

The close button receives initial focus. Escape, explicit close and a navigation link dismiss the dialog and restore the opener. Native modal behavior makes the background inert; CSS locks background scrolling, while long navigation scrolls inside the flyout. Reduced motion removes the slide-in animation. Links are ordinary anchors, not ARIA menu items.

The base component fills its viewport at every size. Your header decides the mobile breakpoint and whether opening it on desktop is useful. Keep equivalent visible links for no-JS visitors, reveal the trigger only after enhancement, and close the dialog when switching to desktop navigation. Do not use aria-hidden to hide focusable background content manually. All colors and spacing use SiteKit tokens; later visual styles can extend this base without changing the contract.

Source: mobile-menu.html, mobile-menu.css, mobile-menu.schema.json, example.html. No framework imports or runtime schema renderer.
