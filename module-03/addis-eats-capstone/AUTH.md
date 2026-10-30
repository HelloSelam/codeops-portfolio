# Authentication and Authorization

## Overview

Addis Eats uses server-side authentication with signed JSON Web Tokens (JWTs). The token is stored in an HTTP-only cookie. Protected server pages and server actions verify the session before returning private data or performing mutations.

The current implementation uses environment-configured demo credentials and predefined demo user identities. It is intended to demonstrate authentication and authorization patterns; it is not a production identity system.

## Authentication Flow

1. The sign-in server action reads the submitted email and password.
2. It compares them with the demo credentials configured in environment variables.
3. On a match, it creates a signed JWT containing the user's ID, email, and role.
4. `lib/session.js` stores the token in a cookie named `session`.
5. The cookie is HTTP-only, uses `sameSite: "lax"`, has a seven-day lifetime, and is marked secure in production.
6. `getSession()` verifies the token signature and expiry with `jwtVerify()`. Invalid or expired tokens return `null`.
7. Sign-out deletes the session cookie.

## Files and Responsibilities

| File                      | Responsibility                                                          | What it demonstrates                              |
| ------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------- |
| `lib/session.js`          | Creates, verifies, and deletes JWT sessions                             | Signed tokens and HTTP-only cookie settings       |
| `lib/auth.js`             | Exposes `requireAuth()` and `requireStaff()`                            | Server-side authentication and role authorization |
| `middleware.js`           | Redirects requests to protected paths when the session cookie is absent | Early navigation guard                            |
| `app/action.js`           | Implements sign-in, sign-out, and order cancellation                    | Server actions and protected mutations            |
| `app/actions.js`          | Validates and places customer orders                                    | Server-side validation and authenticated writes   |
| `db.js`                   | Reads and changes mock orders                                           | User-scoped order access                          |
| `app/dashboard/page.js`   | Checks staff role before reading dashboard data                         | Staff-only server page                            |
| `app/orders/page.js`      | Loads the signed-in customer's orders                                   | Authenticated, user-scoped order history          |
| `app/orders/[id]/page.js` | Loads one order using its ID and the current user ID                    | Record-level ownership enforcement                |

## Protected Routes and Data

| Route/action           | Check                                                                          | Expected behavior                                                         |
| ---------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `/checkout`            | Middleware presence check and server-side `requireAuth()` in the checkout flow | Signed-out visitors are redirected or prevented from placing an order     |
| `/orders`              | `requireAuth()` and `getOrdersFor(session.userId)`                             | Customers see only their own orders; staff are redirected to `/dashboard` |
| `/orders/[id]`         | `requireAuth()` and `getOrderFor(id, session.userId)`                          | A missing or other user's order is not returned                           |
| `/dashboard`           | `requireStaff()` before `db.order.findMany()`                                  | Only staff can read management summaries                                  |
| `cancelOrder(orderId)` | `requireAuth()` and `markCancelled(orderId, session.userId)`                   | Only the owner can cancel an order                                        |
| `placeOrder(...)`      | Session check, Zod validation, server-side dish lookup and price calculation   | Only authenticated users can place validated orders                       |

The middleware checks whether a cookie exists; it does not verify the JWT signature. The actual trust decision is made by server-side session verification and authorization functions.

Middleware is an early redirect, not the security boundary.

## Security Layers

### 1. Authentication

`lib/session.js` uses `jose` to sign and verify the session JWT.

`lib/auth.js` calls `getSession()` and redirects if no valid user ID is present.

### 2. Role Authorization

`requireStaff()` first requires a valid session and then checks `session.role`.

The dashboard calls this before reading order data.

### 3. Record Ownership

`getOrderFor(id, userId)` matches both the order ID and the user ID.

`markCancelled()` uses this scoped lookup before changing an order's status.

### 4. Input and Price Validation

`placeOrder()` validates customer fields and cart item IDs/quantities with Zod.

It retrieves each dish on the server and calculates prices from the menu data instead of trusting prices submitted by the browser.

### 5. Session Cookie Settings

The session cookie is HTTP-only, same-site lax, scoped to `/`, and secure in production.

The token has a seven-day expiry.

## Three Security Tests

Run these tests against the deployed application or a local production build using separate browser sessions.

### Attack 1: Call a Write Action While Signed Out

Attempt to invoke the order cancellation action without a valid session:

```js
await cancelOrder("ord_demo_001");
```

**Expected result:** The action does not cancel the order.

`cancelOrder()` calls `requireAuth()` before calling `markCancelled()`. The order-placement action also checks the session before creating an order.

### Attack 2: Access Another User's Order

Sign in as one customer, then try to open an order ID belonging to a different user:

```text
/orders/ANOTHER_USERS_ORDER_ID
```

**Expected result:** The order is not displayed.

The page passes both the requested ID and `session.userId` to `getOrderFor()`. The database helper returns an order only when both values match.

For a meaningful test, use two distinct user identities and an order belonging to the second identity.

### Attack 3: Supply an External Return URL

Try opening:

```text
/signin?next=https://example.com
```

Then sign in.

**Expected result:** The application uses its predefined destination (`/orders` for customers or `/dashboard` for staff).

The sign-in action does not read or redirect to the supplied `next` parameter.

## Important Limitations

* Demo credentials are stored in environment variables and compared by the sign-in action. There is no production user database, password hashing workflow, registration, password reset, or account lifecycle.
* The mock order store is in memory and is not persistent.
* `middleware.js` only checks for the presence of the session cookie. Protected pages and actions must continue to perform server-side verification.
* The `db.js` mock helper named `getSession()` returns a fixed mock user. Authentication decisions should use `lib/session.js` and `lib/auth.js`, not this mock helper.
* This implementation demonstrates security controls for a learning project; it should be replaced with a production identity provider and persistent database before handling real customer information or payments.
