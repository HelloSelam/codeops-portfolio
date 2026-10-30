# Addis Eats

Addis Eats is an Ethiopian food ordering application built with Next.js. Customers can browse dishes, filter the menu, add dishes to a cart, place orders, and review their order history. Staff can access a management dashboard with order and revenue summaries.

## Live Application

**Vercel URL:** https://addis-eats-capstone-six.vercel.app

Replace this placeholder with the production URL after deployment.

## Features

* Responsive menu with category filtering and dish details
* Shopping cart and checkout flow
* Server-side order validation and price calculation
* Customer sign-in and order history
* Staff-only management dashboard
* Order status display and cancellation
* Revenue-by-area and orders-over-time charts
* Metadata and responsive page layouts

## Tech Stack

* **Next.js App Router** – application framework and routing
* **React** – user interface components
* **JavaScript** – application logic
* **CSS** – styling
* **Zustand** – shared cart state management
* **Zod** – server-side input validation
* **jose** – signed session tokens
* **Recharts** – dashboard charts

## Run Locally

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Open the project directory:

   ```bash
   cd YOUR_PROJECT_DIRECTORY
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and add the required environment variables listed below.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000` in your browser.

To verify a production build locally:

```bash
npm run build
npm start
```

## Environment Variables

Set these variables in `.env.local` for local development and in Vercel Project Settings → Environment Variables for deployment.

| Variable                 | Purpose                                                                |
| ------------------------ | ---------------------------------------------------------------------- |
| `SESSION_SECRET`         | Secret used to sign and verify session JWTs. Use a long, random value. |
| `DEMO_CUSTOMER_EMAIL`    | Demo customer sign-in email.                                           |
| `DEMO_CUSTOMER_PASSWORD` | Demo customer sign-in password.                                        |
| `DEMO_STAFF_EMAIL`       | Demo staff sign-in email.                                              |
| `DEMO_STAFF_PASSWORD`    | Demo staff sign-in password.                                           |

Do not commit `.env.local` or expose secret values in source code. Make sure the required variables are configured for the Vercel Production environment before deploying.

If the project uses an additional public site URL variable for metadata or canonical URLs, configure it using the exact variable name referenced in the source code.

## Demo Authentication

The current project uses environment-configured demo credentials and predefined demo users.

It does not include a production user-registration system or a persistent user database. Use the demo credentials configured by the project owner.

## Data Limitation

Orders are stored in an in-memory mock data store. This is suitable for demonstrating application flows, authorization, and data presentation, but new orders are not persistent across server restarts or independent server instances.

## Repository Structure

* `app/` — App Router pages, layouts, route handlers, and server actions
* `components/` — reusable interface components
* `lib/` — session, authentication, menu, and client-state utilities
* `db.js` — mock data access and order helper functions
* `schema.js` — validation schemas

## Security Note

This is a learning/demo application, not a production-ready food ordering platform.

See [AUTH.md](./AUTH.md) for the authentication flow, authorization checks, and security test cases.
