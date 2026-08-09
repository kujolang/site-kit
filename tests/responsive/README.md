# Responsive tests

`npm run browser:test` checks representative pages at 1440×900, 768×1024, and 390×844 in light and dark themes across Chromium, Firefox, and WebKit. It rejects document-level horizontal overflow and includes a 200% text-scaling case. Component-level horizontal scrolling remains allowed where documented, such as wide tables and carousels.
