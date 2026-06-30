# Plynity Esports

Plynity Esports is a Vite + React tournament registration site for BGMI and Free Fire Max events.

## Payment Gateway

Payments are handled through Cashfree Web Checkout. Configure the following environment variables before running the app:

### Frontend (Vite)
- `VITE_CASHFREE_APP_ID`
- `VITE_CASHFREE_ENV=production` (or `sandbox`)

### Backend (Vercel Functions — `/api/cashfree/*`)
- `CASHFREE_APP_ID` (same public App ID)
- `CASHFREE_SECRET_KEY` (server-only, never use `VITE_` prefix)
- `CASHFREE_ENV=production` (or `sandbox`)

The registration flow calls `/api/cashfree/session` to create a Cashfree order and receive `payment_session_id`, opens checkout, verifies payment on return via `/api/cashfree/verify`, and only saves the registration after payment succeeds. The frontend never stores or exposes the Cashfree Secret Key.

On Vercel: add the backend variables under **Project Settings → Environment Variables**, then redeploy.
