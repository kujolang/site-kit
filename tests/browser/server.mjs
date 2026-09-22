import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStaticServer } from '../helpers/static-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const server = await createStaticServer(root, { index: 'README.md' });
server.listen(4173, '127.0.0.1', () => console.log('SiteKit browser fixture listening on http://127.0.0.1:4173'));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
