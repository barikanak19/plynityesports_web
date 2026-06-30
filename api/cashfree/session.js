import { createCashfreeOrder } from '../_lib/cashfree.js';
import { readJsonBody, sendJson, setCorsHeaders } from '../_lib/http.js';

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = await readJsonBody(req);
    const {
      orderId,
      amount,
      customerName,
      customerEmail,
      customerPhone,
      orderNote,
      returnUrl,
    } = body || {};

    if (!orderId || !amount) {
      return sendJson(res, 400, { error: 'orderId and amount are required.' });
    }

    if (!customerName || !customerEmail || !customerPhone) {
      return sendJson(res, 400, { error: 'Customer name, email, and phone are required.' });
    }

    const result = await createCashfreeOrder({
      orderId,
      amount,
      customerName,
      customerEmail,
      customerPhone,
      orderNote,
      returnUrl,
    });

    return sendJson(res, 200, {
      paymentSessionId: result.paymentSessionId,
      payment_session_id: result.paymentSessionId,
      orderId: result.orderId,
    });
  } catch (error) {
    console.error('[Cashfree API] Session creation failed.', error);
    return sendJson(res, error.status || 500, {
      error: error.message || 'Unable to create Cashfree payment session.',
      details: error.details || null,
    });
  }
}
