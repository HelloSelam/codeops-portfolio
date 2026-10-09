# Addis Eats — Rendering Strategy

## Overview

Addis Eats is a food-ordering application built with Next.js App Router.
Rendering strategies are selected based on the purpose of each route.

## Route Strategy

| Route | Strategy | Reason |
|---|---|---|
| `/` | Static | The landing page contains general content that can be generated at build time. |
| `/menu` | ISR | The menu is fetched on the server and revalidated every hour using `revalidate = 3600`. |
| `/menu/[id]` | Static generation | `generateStaticParams()` generates pages for known dish IDs at build time. |
| `/cart` | Client-side interaction | The cart uses Zustand to manage browser-side state and calculate totals. |
| `/checkout` | Dynamic | The route is explicitly configured with `force-dynamic` because checkout is intended to be request-specific. |

## Data Fetching

- Menu data is retrieved through the server-side database helper.
- Dish detail pages retrieve their dish by ID on the server.
- `generateStaticParams()` supplies known dish IDs for static generation.
- The cart uses client-side state for adding and removing dishes.
- The checkout Server Action validates submitted data before creating orders.

## Error Handling

- `notFound()` handles unknown dish IDs.
- `loading.js` provides a menu loading UI.
- `error.js` provides a menu error boundary with a retry option.
- The order API returns appropriate HTTP status codes for invalid requests and successful creation.

## Important Limitations

The current database is an in-memory mock database. Data is not persistent across server restarts.

The application demonstrates the intended rendering and data-flow patterns but does not yet use a production database or a real authentication provider.