/**
 * cashfreeService — creates Cashfree payment sessions and loads the web checkout SDK.
 */

const getEnvVar = (key) => {
  const value = import.meta.env[key];
  return value || '';
};

export const CASHFREE_APP_ID = getEnvVar('VITE_CASHFREE_APP_ID');
export const CASHFREE_ENV = getEnvVar('VITE_CASHFREE_ENV') || 'sandbox';
export const CASHFREE_SESSION_URL = getEnvVar('VITE_CASHFREE_SESSION_URL') || getEnvVar('VITE_CASHFREE_SESSION_ENDPOINT') || '';

const CASHFREE_SCRIPT_URL = 'https://sdk.cashfree.com/js/checkout.js';

export function loadCashfreeScript() {
  return new Promise((resolve) => {
    if (window.Cashfree) return resolve(true);

    const script = document.createElement('script');
    script.src = CASHFREE_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function createCashfreePaymentSession({
  orderId,
  amount,
  customerName,
  customerEmail,
  customerPhone,
  orderNote,
}) {
  if (!CASHFREE_SESSION_URL) {
    throw new Error('Cashfree session endpoint is not configured. Please set VITE_CASHFREE_SESSION_URL.');
  }

  const response = await fetch(CASHFREE_SESSION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId,
      amount,
      currency: 'INR',
      customerName,
      customerEmail,
      customerPhone,
      orderNote,
      appId: CASHFREE_APP_ID,
      mode: CASHFREE_ENV,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Unable to create Cashfree payment session.');
  }

  const data = await response.json().catch(() => ({}));

  if (!data?.paymentSessionId) {
    throw new Error('Cashfree payment session could not be generated.');
  }

  return data;
}
