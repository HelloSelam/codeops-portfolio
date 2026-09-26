# Addis Eats

Addis Eats is a React-based food ordering frontend inspired by Ethiopian cuisine. Users can browse dishes, filter and search the menu, view individual dishes, add items to a cart, and complete a checkout form.

This project was built as part of my Full Stack Software Development training at IBT College Canada.

## Features

* Home page with today's specials
* Menu fetched from JSON data
* Search dishes by name
* Filter dishes by category using URL parameters
* Individual dish detail pages
* Add and remove items from the cart
* Increase and decrease item quantities
* Cart persistence using local storage
* User sign in and sign up
* Protected checkout route
* Checkout form validation with Zod
* Order confirmation after checkout
* Loading and error states
* Error boundary for unexpected application errors
* Lazy loading for the checkout page
* Responsive design for different screen sizes

## Technologies

* React
* React Router
* Zustand
* Zod
* Vite
* JavaScript
* HTML
* CSS
* JSON

## React Concepts Practiced

* Components and props
* `useState`
* `useEffect`
* Custom hooks
* Context API
* Zustand state management
* React Router and dynamic routes
* URL search parameters
* Controlled forms
* Form validation
* Lazy loading
* Error boundaries
* Local storage
* Fetching data from JSON files

## Project Structure

```text
src/
├── auth/
├── cart/
├── checkout/
├── hooks/
├── menu/
├── styles/
├── App.jsx
├── Home.jsx
├── Layout.jsx
├── Cart.jsx
├── NotFound.jsx
├── ErrorBoundary.jsx
├── main.jsx
└── index.css

public/
├── images/
├── menu.json
└── specials.json
```

## Getting Started

Clone the repository and install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Project Notes

The project uses local JSON files for the menu and specials data. Cart data is persisted in the browser using Zustand's persistence middleware.

The images used in the project are stored in `public/images/`.

## Author

Selamawit Yeruk

Built as part of the Advanced Digital Skill Training program at IBT College Canada.