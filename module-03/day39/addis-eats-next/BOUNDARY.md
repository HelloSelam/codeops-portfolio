# Server and Client Component Boundary

## Server Components

### app/menu/page.js
Server component because it fetches menu data with `await getMenu()`.

### app/menu/DishList.jsx
Server component because it receives server-fetched dishes and renders them.

### app/menu/[id]/page.js
Server component because it fetches menu data and renders dish details.

### app/layout.js
Server component because it provides the root HTML structure.

## Client Components

### app/menu/CategoryBar.jsx
Client component because it contains interactive category buttons.

### app/providers.jsx
Client component because it wraps the application with the cart provider.

### Cart components/context
Client component because the cart contains browser-side interactive state.

## Boundary Strategy

Data fetching stays on the server.

Interactive components are pushed down to the smallest possible client boundary.

The server DishList is passed through the client CategoryBar using `children` rather than importing the server component into the client component.