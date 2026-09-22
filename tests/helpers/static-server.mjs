import { realpath, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pipeline } from 'node:stream';

const types = new Map([
  ['.css', 'text/css; charset=utf-8'], ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'], ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'], ['.webm', 'video/webm'], ['.vtt', 'text/vtt; charset=utf-8'],
  ['.woff', 'font/woff'], ['.woff2', 'font/woff2'],
]);

// Local fixture hosting only. The checkout must not be mutated by an untrusted writer.
export async function createStaticServer(directory, { index = 'index.html' } = {}) {
  const root = await realpath(directory);
  const inside = file => file === root || file.startsWith(root + path.sep);
  const hidden = file => path.relative(root, file).split(path.sep).some(part => part.startsWith('.'));
  return http.createServer(async (request, response) => {
    const reply = (code, message) => response.writeHead(code).end(message);
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.setHeader('allow', 'GET, HEAD'); reply(405, 'method not allowed'); return;
    }
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
      if (pathname.includes('\0')) throw new URIError('NUL path');
    } catch { reply(400, 'bad request'); return; }
    if (pathname === '/health') { reply(200, 'ok'); return; }
    try {
      let file = path.resolve(root, pathname.replace(/^\/+/, '') || index);
      if (!inside(file) || hidden(file)) { reply(404, 'not found'); return; }
      file = await realpath(file);
      if (!inside(file) || hidden(file)) { reply(404, 'not found'); return; }
      if ((await stat(file)).isDirectory()) file = await realpath(path.join(file, 'index.html'));
      if (!inside(file) || hidden(file) || !(await stat(file)).isFile()) { reply(404, 'not found'); return; }
      response.setHeader('content-type', types.get(path.extname(file)) || 'application/octet-stream');
      if (request.method === 'HEAD') { response.end(); return; }
      const stream = createReadStream(file);
      stream.once('open', () => {
        // pipeline closes the file on client disconnect and handles stream errors.
        pipeline(stream, response, error => {
          if (error && error.code !== 'ERR_STREAM_PREMATURE_CLOSE') console.error('SiteKit fixture stream failed:', error.code || error.name);
        });
      });
      stream.once('error', () => {
        if (!response.headersSent && !response.destroyed) reply(500, 'read failed');
      });
    } catch (error) {
      reply(['ENOENT', 'ENOTDIR', 'EACCES', 'ELOOP'].includes(error.code) ? 404 : 500, 'file unavailable');
    }
  });
}
