import chokidar from 'chokidar';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve(__dirname, 'src');
const functionsPath = path.resolve(__dirname, 'functions');

const watcher = chokidar.watch([`${srcPath}/**/*`, `${functionsPath}/**/*`], {
  ignoreInitial: false,
  usePolling: true,      // activo el modo polling
  interval: 100,         // cada 100 ms hace un "poll"
  awaitWriteFinish: true // espera a que se complete la escritura
});

watcher.on('all', (event, filePath) => {
  console.log(`[${event}] ${filePath}`);
});
