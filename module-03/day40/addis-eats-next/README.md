# 🍽️ Addis Eats — Next.js

A food-ordering web application built with **Next.js App Router** to practice server and client components, rendering strategies, data fetching, client-side state management, and server-side validation.

Addis Eats allows users to browse Ethiopian dishes, filter the menu by category, add dishes to a cart, review their order, and submit checkout details.

## Features

* **Home page:** A landing page for Addis Eats.
* **Menu:** Browse dishes fetched through a server-side data helper.
* **Category filtering:** Filter dishes by category.
* **Dish details:** View individual dish information using dynamic routes.
* **Shopping cart:** Add and remove dishes, manage quantities, and calculate the total in ETB.
* **Checkout:** Review cart items and submit customer information.
* **Server Actions:** Process orders and validate submitted data on the server.
* **Order API:** Handle order requests with validation and appropriate HTTP status codes.
* **Error handling:** Loading states, error boundaries, and not-found handling.
* **Responsive styling:** Layouts designed for desktop and smaller screens.

## Tech Stack

* Next.js
* React
* JavaScript
* Zustand
* Zod
* CSS
* Node.js and npm

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd addis-eats-next
```

Replace `<your-github-repository-url>` with the actual URL of your GitHub repository.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 4. Build for production

```bash
npm run build
```

### 5. Run the production build

```bash
npm run start
```

## Project Structure

```text
addis-eats-next/
├── app/
│   ├── actions.js
│   ├── api/
│   │   └── orders/
│   │       └── route.js
│   ├── cart/
│   │   └── page.js
│   ├── checkout/
│   │   └── page.js
│   ├── menu/
│   │   ├── [id]/
│   │   │   └── page.js
│   │   ├── error.js
│   │   ├── layout.js
│   │   ├── loading.js
│   │   └── page.js
│   ├── globals.css
│   ├── layout.js
│   ├── not-found.js
│   └── page.js
├── components/
│   ├── AddToCartButton.js
│   ├── CheckoutForm.js
│   ├── DishGrid.js
│   ├── Navbar.js
│   └── Providers.js
├── lib/
│   └── cartStore.js
├── BOUNDARY.md
├── db.js
├── schema.js
├── STRATEGY.md
└── README.md
```

## Rendering Strategy

| Route        | Strategy                              | Purpose                                                                |
| ------------ | ------------------------------------- | ---------------------------------------------------------------------- |
| `/`          | Static                                | Pre-render the landing page.                                           |
| `/menu`      | Incremental Static Regeneration (ISR) | Revalidate menu data every hour.                                       |
| `/menu/[id]` | Static generation                     | Generate pages for known dish IDs.                                     |
| `/cart`      | Client-side interaction               | Manage cart state and calculate totals.                                |
| `/checkout`  | Dynamic rendering                     | Handle the checkout flow using the intended request-specific strategy. |

See [STRATEGY.md](./STRATEGY.md) for more details.

See [BOUNDARY.md](./BOUNDARY.md) for the Server Component and Client Component decisions.

## API Endpoint

### Create an order

```http
POST /api/orders
Content-Type: application/json
```

Example request:

```json
{
  "name": "Almaz",
  "phone": "0912345678",
  "dishId": "dish_1",
  "quantity": 1
}
```

The endpoint validates the request before creating an order.

* `201 Created` — order created successfully.
* `400 Bad Request` — malformed JSON or invalid request body.
* `401 Unauthorized` — session check failed.
* `422 Unprocessable Entity` — validation failed.

## Validation and Security

* Customer information is validated on the server using Zod.
* The Server Action checks the session helper before processing an order.
* Dish IDs are resolved against server-side dish data.
* Dish availability is checked before an order is created.
* The checkout flow does not rely on client-submitted prices.

**Current limitations:** This project uses a mock in-memory database and a mock session. Orders are not persistent across server restarts, and the session helper does not provide production authentication. A production deployment would require a persistent database, real authentication, and additional order-processing safeguards.

## Learning Objectives

This project was built to practice:

* Next.js App Router and file-based routing.
* Nested layouts and dynamic route segments.
* Static rendering, ISR, and dynamic rendering.
* Server Components and Client Components.
* Server-side data fetching.
* Zustand for client-side state management.
* Server Actions and Route Handlers.
* Zod schema validation.
* Error handling and production builds.

## Future Improvements

* Integrate a persistent database.
* Implement real authentication.
* Persist cart contents across page refreshes.
* Add order history and order-status tracking.
* Improve automated testing.
* Add payment integration.

---

**Project:** Addis Eats — Next.js
**Purpose:** Frontend and full-stack learning project.