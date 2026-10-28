# Data Flow and Ownership — Addis Eats

## 1. Application Data

The application currently uses mock dish data and in-memory order storage.

Dish information includes fields such as an ID and name. Orders contain order information, status, ownership, and creation timestamps.

The external menu API has not yet been integrated into this Day 45 version.

## 2. Data Flow

### Menu

1. The menu page requests dish data.
2. The server retrieves data from the current data source.
3. Next.js caching is used where configured.
4. The menu is rendered for the user.

### Authentication

1. The user submits the sign-in form.
2. The server validates the mock account credentials.
3. The server creates a signed session token.
4. The token is stored in an HTTP-only cookie.
5. Protected server code verifies the session before accessing private data.

### Orders

1. An authenticated user creates or views an order.
2. The server obtains the user's ID from the verified session.
3. The order is associated with that user.
4. Queries filter orders by both the order ID and the authenticated user's ID.

### Live Order Status

The order detail page receives initial data from the server. SWR uses this initial data and periodically requests updated status from the order API.

## 3. Ownership Enforcement

Order access must be scoped to the authenticated user.

For example:

```js
return mockOrders.find(
  (order) => order.id === id && order.userId === userId
) || null;
```

This prevents an authenticated user from accessing another user's order simply by guessing or changing an order ID.

Server actions must perform their own authentication and authorization checks rather than relying only on middleware or hidden UI controls.

## 4. Data Validation

Server-side validation checks submitted data before processing it.

Validation should cover required fields, accepted values, and valid identifiers. Authentication and ownership checks are separate requirements and must also be enforced.

## 5. Current Limitations

* Dish data is mocked.
* Orders are stored in memory.
* In-memory data may be lost when the server restarts.
* The application is not yet backed by persistent production storage.

A production implementation should use a persistent database and enforce authorization in every relevant query and mutation.