import { useCallback } from 'react';
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
      const scriptLoaded = await loadCashfreeScript();
      if (!scriptLoaded || !window.Cashfree) {
        throw new Error('Unable to load Cashfree Checkout.');
      }

      const paymentSession = await createCashfreePaymentSession({
        orderId,
        amount,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        orderNote: description,
      });

      const cashfree = new window.Cashfree({
        mode: import.meta.env.VITE_CASHFREE_ENV || 'sandbox',
      });

      cashfree.on('payment', (event) => {
        if (event?.payment?.status === 'SUCCESS') {
          onSuccess?.({ paymentId: event.payment.orderId || event.payment.referenceId || orderId });
          return;
        }

        onFailure?.(event?.payment?.message || 'Payment was not completed.');
      });

      cashfree.on('cancel', () => {
        onFailure?.('Payment cancelled by user.');
      });

      cashfree.on('error', (event) => {
        onFailure?.(event?.message || 'Payment failed. Please try again.');
      });

      cashfree.checkout({
        paymentSessionId: paymentSession.paymentSessionId,
        returnUrl: window.location.href,
      });
    } catch (error) {
      onFailure?.(error.message || 'Unable to start payment. Please try again.');
    }
  }, []);

  return { initiatePayment };
}
