import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// @ts-ignore
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import vm from 'vm';

function devApiPlugin() {
  // Load CommonJS stocksData.js in an ESM environment via vm sandbox
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const stocksPath = path.resolve(__dirname, 'api/_data/stocksData.js');

  let stocks: any[] = [];
  try {
    const code = fs.readFileSync(stocksPath, 'utf8');
    const sandbox: any = { module: { exports: {} }, exports: {}, console };
    vm.runInNewContext(code, sandbox, { filename: stocksPath });
    const mod = sandbox.module?.exports ?? sandbox.exports;
    if (Array.isArray(mod)) {
      stocks = mod;
    } else {
      console.warn('[dev-api] stocksData.js did not export an array. Falling back to empty list.');
      stocks = [];
    }
  } catch (e) {
    console.warn('[dev-api] Failed to load stocksData.js:', e);
    stocks = [];
  }

  function delay(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }
  function mulberry32(a: number) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function randomNumberFromString(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = (req.url || '').split('?')[0];
        if (req.method !== 'GET') return next();

        if (url === '/__dev_api/api/stocks' || url === '/__dev_api/api/stocks/last-prices') {
          console.log(`[vite] DEV API ${url}`);
          await delay(Math.random() * 150);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store');
          res.end(JSON.stringify(stocks));
          return;
        }
        const match = url.match(/^\/__dev_api\/api\/stock\/history\/([^/?#]+)/);
        if (match) {
          const id = decodeURIComponent(match[1]);
          console.log(`[vite] DEV API /__dev_api/api/stock/history/${id}`);
          await delay(Math.random() * 250 + 100);
          const gen = mulberry32(randomNumberFromString(id.toLowerCase()));
          let curr = new Date();
          curr.setSeconds(0);
          const history = [...new Array(40)].map((_, i) => ({
            time: Number(curr) - 60 * 1000 * i,
            price: Number((gen() * 10).toFixed(3))
          }));
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store');
          res.end(JSON.stringify({ symbol: id, history }));
          return;
        }
        next();
      });
    }
  } as const;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const proxy = env.VITE_API_URL
    ? {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          ws: false,
          bypass: (req: any) => {
            if (req?.url?.startsWith('/api/ws')) {
              return req.url; // do not proxy WS path; let our local handler take it
            }
          }
        }
      }
    : undefined;

  return {
    plugins: [devApiPlugin(), svgr(), react(), tsconfigPaths()],
    server: {
      proxy
    }
  };
});
