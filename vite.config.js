import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import sessionHandler from './api/cashfree/session.js';
import verifyHandler from './api/cashfree/verify.js';

function createMockResponse() {
  const headers = {};
  let statusCode = 200;
  let body = '';

  return {
    statusCode,
    setHeader(key, value) {
      headers[key] = value;
    },
    status(code) {
      statusCode = code;
      this.statusCode = code;
      return this;
    },
    json(payload) {
      body = JSON.stringify(payload);
      headers['Content-Type'] = 'application/json';
      return this;
    },
    end(data) {
      if (data !== undefined) body = data;
    },
    get result() {
      return { statusCode, headers, body };
    },
  };
}

function apiDevPlugin(env) {
  Object.assign(process.env, env);

  return {
    name: 'plynity-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');

        if (!url.pathname.startsWith('/api/cashfree/')) {
          return next();
        }

        try {
          const mockRes = createMockResponse();
          req.query = Object.fromEntries(url.searchParams.entries());

          if (url.pathname === '/api/cashfree/session') {
            await sessionHandler(req, mockRes);
          } else if (url.pathname === '/api/cashfree/verify') {
            await verifyHandler(req, mockRes);
          } else {
            return next();
          }

          const { statusCode, headers, body } = mockRes.result;
          res.statusCode = statusCode;
          Object.entries(headers).forEach(([key, value]) => {
            res.setHeader(key, value);
          });
          res.end(body);
        } catch (error) {
          console.error('[Vite API] Unhandled error.', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: error.message || 'Internal server error' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), apiDevPlugin(env)],
  };
});
