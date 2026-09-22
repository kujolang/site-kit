import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { createStaticServer } from '../helpers/static-server.mjs';

test('fixture server rejects malformed and escaped paths without losing availability', async () => {
  const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'sitekit-server-'));
  const root = path.join(temporary, 'public');
  let server;
  try {
    await fs.mkdir(root);
    await fs.writeFile(path.join(root, 'index.html'), '<h1>Fixture</h1>');
    await fs.writeFile(path.join(temporary, 'outside.txt'), 'outside');
    await fs.writeFile(path.join(root, '.private'), 'hidden');
    await fs.symlink(path.join(temporary, 'outside.txt'), path.join(root, 'escape'));
    await fs.symlink(path.join(root, '.private'), path.join(root, 'hidden-link'));
    await fs.mkdir(path.join(root, 'nested'));
    await fs.symlink(path.join(temporary, 'outside.txt'), path.join(root, 'nested/index.html'));
    server = await createStaticServer(root);
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const request = (url, method = 'GET') => new Promise((resolve, reject) => {
      http.request({ host: '127.0.0.1', port: server.address().port, path: url, method }, response => {
        let body = ''; response.setEncoding('utf8'); response.on('data', chunk => { body += chunk; });
        response.on('end', () => resolve({ status: response.statusCode, body, type: response.headers['content-type'] }));
      }).on('error', reject).end();
    });
    for (const url of ['/%', '/%FF', '/%00']) assert.equal((await request(url)).status, 400, url);
    for (const url of ['/..%2Foutside.txt', '/escape', '/hidden-link', '/.private', '/nested/', '/missing', '/index.html/child']) assert.equal((await request(url)).status, 404, url);
    assert.equal((await request('/', 'POST')).status, 405);
    assert.deepEqual(await request('/'), { status: 200, body: '<h1>Fixture</h1>', type: 'text/html; charset=utf-8' });
    assert.equal((await request('/', 'HEAD')).body, '');
    assert.equal((await request('/health')).body, 'ok');
  } finally {
    if (server) await new Promise(resolve => server.close(resolve));
    await fs.rm(temporary, { recursive: true, force: true });
  }
});
