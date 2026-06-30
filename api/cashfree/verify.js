import { fetchCashfreeOrder } from '../_lib/cashfree.js';
import { sendJson, setCorsHeaders } from '../_lib/http.js';

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const orderId = req.query?.order_id || req.query?.orderId;

    if (!orderId) {
      return sendJson(res, 400, { error: 'order_id query parameter is required.' });
    }

    const result = await fetchCashfreeOrder(orderId);

    return sendJson(res, 200, {
      orderId: result.orderId,
      orderStatus: result.orderStatus,
      paymentStatus: result.paymentStatus,
      isPaid: result.isPaid,
    });
  } catch (error) {
    console.error('[Cashfree API] Order verification failed.', error);
    return sendJson(res, error.status || 500, {
      error: error.message || 'Unable to verify Cashfree payment.',
      details: error.details || null,
    });
  }
}
