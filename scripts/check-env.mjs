import { loadEnv } from 'vite';
import { cwd } from 'node:process';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const env = loadEnv(mode, cwd(), '');

const appId = env.VITE_CASHFREE_APP_ID?.trim();
const cashfreeEnv = env.VITE_CASHFREE_ENV?.trim() || 'production';

if (!appId) {
  console.error('\n[build] VITE_CASHFREE_APP_ID is missing or empty.\n');
  console.error('Local fix:  create/update .env in the project root, then restart the dev server.');
  console.error('Vercel fix:  Project Settings → Environment Variables → add VITE_CASHFREE_APP_ID, then redeploy.');
  console.error('Or commit .env.production with the public App ID (already included in this repo).\n');
  process.exit(1);
}

console.log(`[build] Cashfree App ID detected (${appId.slice(0, 6)}...${appId.slice(-4)})`);
console.log(`[build] Cashfree environment: ${cashfreeEnv}`);

const secretKey = env.CASHFREE_SECRET_KEY?.trim();
if (!secretKey) {
  console.warn('[build] Warning: CASHFREE_SECRET_KEY is not set. /api/cashfree/session will fail until configured on Vercel.');
} else {
  console.log('[build] Cashfree secret key detected for server API routes.');
}
