/**
 * Environment variables for Vite.
 *
 * IMPORTANT: Use static `import.meta.env.VITE_*` references only.
 * Dynamic access like `import.meta.env[key]` is not reliably inlined
 * and breaks in production builds (e.g. Vercel) when env vars are missing.
 */

export const CASHFREE_APP_ID = import.meta.env.VITE_CASHFREE_APP_ID ?? '';
export const CASHFREE_ENV = import.meta.env.VITE_CASHFREE_ENV || 'production';

export const GOOGLE_SHEET_URLS = {
  BGMI_SOLO_FRIDAY: import.meta.env.VITE_BGMI_SOLO_FRIDAY ?? '',
  BGMI_DUO_FRIDAY: import.meta.env.VITE_BGMI_DUO_FRIDAY ?? '',
  BGMI_SOLO_SATURDAY: import.meta.env.VITE_BGMI_SOLO_SATURDAY ?? '',
  BGMI_SQUAD_SATURDAY: import.meta.env.VITE_BGMI_SQUAD_SATURDAY ?? '',
  BGMI_SOLO_SUNDAY: import.meta.env.VITE_BGMI_SOLO_SUNDAY ?? '',
  BGMI_SQUAD_SUNDAY: import.meta.env.VITE_BGMI_SQUAD_SUNDAY ?? '',
  FF_SOLO_FRIDAY: import.meta.env.VITE_FF_SOLO_FRIDAY ?? '',
  FF_DUO_FRIDAY: import.meta.env.VITE_FF_DUO_FRIDAY ?? '',
  FF_SOLO_SATURDAY: import.meta.env.VITE_FF_SOLO_SATURDAY ?? '',
  FF_SQUAD_SATURDAY: import.meta.env.VITE_FF_SQUAD_SATURDAY ?? '',
  FF_SOLO_SUNDAY: import.meta.env.VITE_FF_SOLO_SUNDAY ?? '',
  FF_SQUAD_SUNDAY: import.meta.env.VITE_FF_SQUAD_SUNDAY ?? '',
};

// Temporary debug logs — remove after confirming env loads in dev + Vercel
const maskedAppId = CASHFREE_APP_ID
  ? `${CASHFREE_APP_ID.slice(0, 6)}...${CASHFREE_APP_ID.slice(-4)}`
  : '(not set)';

console.log('[Cashfree] import.meta.env.VITE_CASHFREE_APP_ID:', maskedAppId);
console.log('[Cashfree] import.meta.env.VITE_CASHFREE_ENV:', CASHFREE_ENV);
console.log('[Cashfree] resolved CASHFREE_APP_ID length:', CASHFREE_APP_ID.length);

if (!CASHFREE_APP_ID) {
  console.error(
    '[Cashfree] VITE_CASHFREE_APP_ID is undefined or empty. ' +
      'Local: add it to the root .env file and restart `npm run dev`. ' +
      'Vercel: set VITE_CASHFREE_APP_ID in Project Settings → Environment Variables, then redeploy.',
  );
}
