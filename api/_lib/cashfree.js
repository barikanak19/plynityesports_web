const CASHFREE_API_VERSION = '2023-08-01';

const BASE_URLS = {
  sandbox: 'https://sandbox.cashfree.com/pg',
  production: 'https://api.cashfree.com/pg',
};

export function getCashfreeConfig() {
  const clientId = process.env.CASHFREE_APP_ID || process.env.VITE_CASHFREE_APP_ID || '';
  const clientSecret = process.env.CASHFREE_SECRET_KEY || '';
  const mode = (process.env.CASHFREE_ENV || process.env.VITE_CASHFREE_ENV || 'production').toLowerCase();
  const baseUrl = BASE_URLS[mode] || BASE_URLS.production;

  return { clientId, clientSecret, mode, baseUrl, apiVersion: CASHFREE_API_VERSION };
}

function cashfreeHeaders(config) {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-version': config.apiVersion,
    'x-client-id': config.clientId,
    'x-client-secret': config.clientSecret,
  };
}

async function parseCashfreeResponse(response) {
  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error?.message ||
      (typeof data?.error === 'string' ? data.error : null) ||
      `Cashfree API error (${response.status})`;

    const error = new Error(message);
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

export async function createCashfreeOrder({
  orderId,
  amount,
  customerName,
  customerEmail,
  customerPhone,
  orderNote,
  returnUrl,
}) {
  const config = getCashfreeConfig();

  if (!config.clientId || !config.clientSecret) {
    const error = new Error('Cashfree server credentials are not configured.');
    error.status = 500;
    throw error;
  }

  const payload = {
    order_id: orderId,
    order_amount: Number(amount),
    order_currency: 'INR',
    customer_details: {
      customer_id: `cust_${orderId}`,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
    },
    order_note: orderNote || 'Plynity tournament registration',
  };

  if (returnUrl) {
    payload.order_meta = {
      return_url: returnUrl,
    };
  }

  console.log('[Cashfree API] Creating order...', {
    orderId,
    amount: payload.order_amount,
    mode: config.mode,
  });

  const response = await fetch(`${config.baseUrl}/orders`, {
    method: 'POST',
    headers: cashfreeHeaders(config),
    body: JSON.stringify(payload),
  });

  const data = await parseCashfreeResponse(response);
  const paymentSessionId = data.payment_session_id;

  if (!paymentSessionId) {
    const error = new Error('Cashfree did not return a payment_session_id.');
    error.status = 500;
    error.details = data;
    throw error;
  }

  return {
    paymentSessionId,
    orderId: data.order_id || orderId,
    orderStatus: data.order_status,
  };
}

export async function fetchCashfreeOrder(orderId) {
  const config = getCashfreeConfig();

  if (!config.clientId || !config.clientSecret) {
    const error = new Error('Cashfree server credentials are not configured.');
    error.status = 500;
    throw error;
  }

  const response = await fetch(`${config.baseUrl}/orders/${encodeURIComponent(orderId)}`, {
    method: 'GET',
    headers: cashfreeHeaders(config),
  });

  const data = await parseCashfreeResponse(response);

  return {
    orderId: data.order_id || orderId,
    orderStatus: data.order_status,
    paymentStatus: data.payment_status,
    isPaid: data.order_status === 'PAID',
  };
}
