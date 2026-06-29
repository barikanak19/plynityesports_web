# Plynity Esports

Plynity Esports is a Vite + React tournament registration site for BGMI and Free Fire Max events.

## Payment Gateway

Payments are handled through Cashfree Web Checkout. Configure the following environment variables before running the app:

- VITE_CASHFREE_APP_ID
- VITE_CASHFREE_ENV=sandbox
- VITE_CASHFREE_SESSION_URL

The registration flow creates a Cashfree payment session, opens the checkout, and only saves the registration after payment succeeds.
