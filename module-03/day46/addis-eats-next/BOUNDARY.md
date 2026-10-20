# Addis Eats — Server and Client Boundaries

## Principle

Components remain Server Components by default. Client Components are used
where browser interaction or client-side state is required.

## Server Components

### `app/layout.js`
- Defines the root HTML structure and metadata.
- Renders the shared navigation and page content.
- Remains a Server Component.

### `app/page.js`
- Renders the landing page.

### `app/menu/page.js`
- Fetches the menu using the database helper.
- Passes the fetched dishes to the interactive dish grid.
- Uses ISR with hourly revalidation.

### `app/menu/[id]/page.js`
- Fetches an individual dish.
- Generates known dish routes with `generateStaticParams()`.
- Calls `notFound()` when a dish does not exist.

### `app/checkout/page.js`
- Defines the checkout route.
- Renders the interactive checkout form.
- Uses the intended dynamic rendering strategy.

## Client Components

### `components/Navbar.js`
- Reads the Zustand cart store.
- Displays the current number of items in the cart.

### `components/DishGrid.js`
- Filters dishes by category.
- Renders menu cards and their add-to-cart controls.

### `components/AddToCartButton.js`
- Adds a dish to the cart through the Zustand store.
- Displays immediate interaction feedback.

### `app/cart/page.js`
- Reads the cart.
- Calculates the total.
- Allows items to be removed.

### `components/CheckoutForm.js`
- Displays cart items and the order total.
- Collects customer details.
- Submits the form to the Server Action.
- Displays validation errors and the order result.

### `components/Providers.js`
- Provides a client boundary for the application shell.

## Server-Side Validation

The checkout Server Action:
1. Checks the session helper.
2. Validates customer information with the shared Zod schema.
3. Validates the submitted cart structure.
4. Looks up each dish on the server.
5. Checks dish availability.
6. Uses server-side dish data rather than trusting client-submitted prices.
7. Creates the order records.

The order API endpoint also validates requests on the server and returns
appropriate HTTP status codes.

## Security Limitations

The session implementation is a mock, not production authentication.
The in-memory database is not persistent.
Production use would require real authentication, a persistent database,
and additional order-processing safeguards.