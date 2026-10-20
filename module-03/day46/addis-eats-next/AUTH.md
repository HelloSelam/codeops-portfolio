# Authentication and Security — Addis Eats

## 1. Authentication

Addis Eats uses a signed session token stored in an HTTP-only cookie.

The session implementation uses the `jose` library to sign and verify tokens.

The session cookie is configured with:

* `httpOnly` to prevent direct JavaScript access.
* `secure` in production to require HTTPS.
* `sameSite: "lax"` to help mitigate cross-site request risks.
* A seven-day expiration.

The session secret is stored in an environment variable and must not be committed to GitHub.

## 2. Sign In and Sign Out

The sign-in action validates the submitted email against the application's mock user.

On successful sign-in, a signed session is created and the user is redirected to the orders page.

The sign-out action deletes the session cookie and redirects the user to the sign-in page.

This is a demonstration authentication flow, not a complete production identity system.

## 3. Route Protection

Middleware checks for a session cookie before allowing access to selected protected routes.

Server-side authentication checks verify the session token and redirect unauthenticated users to the sign-in page.

Middleware cookie-presence checks alone do not establish that a session is valid.

## 4. Authorization and Ownership

Protected server actions and API routes must verify the authenticated user.

Order queries must be scoped to the current user's ID so that users cannot access or modify another user's orders by changing an order ID.

Staff-only operations must verify the user's role on the server.

## 5. Security Verification

The following cases should be tested:

* Accessing protected pages without signing in.
* Requesting an order API endpoint without a valid session.
* Attempting to access another user's order.
* Attempting unauthorized order cancellation or staff operations.

## 6. Limitations

The application uses mock authentication and in-memory order storage.

A production implementation would require a persistent database, a complete identity system, robust session management, and appropriate protection against unauthorized or forged requests.