import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const types = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
  if (pathname === '/health') { response.writeHead(200).end('ok'); return; }
  const relative = pathname.replace(/^\/+/, '') || 'README.md';
  let file = path.resolve(root, relative);
  if (!file.startsWith(`${root}${path.sep}`) || !fs.existsSync(file)) { response.writeHead(404).end('not found'); return; }
  if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { response.writeHead(404).end('not found'); return; }
  response.writeHead(200, { 'content-type': types.get(path.extname(file)) || 'application/octet-stream' });
  fs.createReadStream(file).pipe(response);
});

server.listen(4173, '127.0.0.1', () => console.log('SiteKit browser fixture listening on http://127.0.0.1:4173'));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
