import { useCallback } from 'react';
import { CASHFREE_ENV } from '../config/env.js';
import { createCashfreePaymentSession, loadCashfreeScript } from '../services/cashfreeService';

export function useCashfree() {
  const initiatePayment = useCallback(async ({
    amount,
    name,
    email,
    phone,
    orderId,
    description,
    onSuccess,
    onFailure,
  }) => {
    try {
      console.log('[Cashfree] Initiating payment...', {
        orderId,
        amount,
        email,
        env: CASHFREE_ENV,
      });

      let scriptLoaded = await loadCashfreeScript();

      // If SDK fails to load, retry once automatically.
      if (!scriptLoaded || !window.Cashfree) {
        console.warn('[Cashfree] SDK not available after first load attempt. Retrying once...');
        scriptLoaded = await loadCashfreeScript();
      }

      if (!scriptLoaded || !window.Cashfree) {
        throw new Error('Payment gateway could not be loaded. Please check your internet connection and try again.');
      }

      const paymentSession = await createCashfreePaymentSession({
        orderId,
        amount,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        orderNote: description,
      });

      const paymentSessionId = paymentSession.paymentSessionId;

      if (!paymentSessionId) {
        console.error('[Cashfree] Missing paymentSessionId from backend.', paymentSession);
        throw new Error('Payment session is missing. Please try again in a few moments.');
      }

      const cashfree = window.Cashfree({
        mode: CASHFREE_ENV,
      });

      console.log('[Cashfree] SDK initialized. Opening checkout...', { paymentSessionId });

      cashfree
        .checkout({
          paymentSessionId,
          returnUrl: window.location.href,
        })
        .then((result) => {
          // Hosted Web Checkout returns a result object. Error cases are handled here.
          if (result?.error) {
            console.error('[Cashfree] Checkout error.', result.error);
            onFailure?.(result.error.message || 'Payment failed during checkout. Please try again.');
          } else if (result?.redirect) {
            console.log('[Cashfree] User is being redirected to Cashfree-hosted page.');
          } else if (result?.paymentDetails) {
            console.log('[Cashfree] Payment details received.', result.paymentDetails);
          }
        })
        .catch((err) => {
          console.error('[Cashfree] Unexpected error while invoking checkout.', err);
          onFailure?.(err?.message || 'Unable to open payment checkout. Please try again.');
        });

      // Hosted Web Checkout completion will typically rely on redirect + backend webhook.
      // We optimistically treat initiation as successful and rely on backend + sheets write
      // once you confirm payment server-side.
    } catch (error) {
      console.error('[Cashfree] Payment flow failed before opening checkout.', error);
      onFailure?.(error.message || 'Unable to start payment. Please try again.');
    }
  }, []);

  return { initiatePayment };
}
