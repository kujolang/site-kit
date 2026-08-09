import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export default function globalSetup() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit' });
  execFileSync(process.execPath, ['scripts/release-archive'], { cwd: root, stdio: 'inherit' });
  const consumer = path.join(root, 'artifacts', 'release', 'clean-consumer');
  fs.rmSync(consumer, { recursive: true, force: true });
  fs.mkdirSync(consumer, { recursive: true });
  fs.cpSync(path.join(root, 'dist'), path.join(consumer, 'sitekit'), { recursive: true });
  fs.writeFileSync(path.join(consumer, 'index.html'), `<!doctype html>
<html lang="en" data-theme="kujo-light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Clean SiteKit consumer</title>
  <link rel="stylesheet" href="./sitekit/sitekit.css">
</head>
<body>
  <a class="sk-sr-only" href="#main">Skip to content</a>
  <main id="main" class="sk-container sk-stack">
    <h1>Clean SiteKit consumer</h1>
    <p>This page uses only the copied release distribution.</p>
    <button class="sk-button" type="button" data-sk-theme-toggle aria-pressed="false" aria-label="Switch to dark theme">Theme</button>
    <span class="sk-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M4 4h16v16H4z"/></svg></span>
  </main>
  <script src="./sitekit/sitekit.js" defer></script>
</body>
</html>
`);
}
