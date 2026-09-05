# Addis Eats — Interactive React Menu

An interactive Addis Eats food ordering menu built with React and Vite as part of the React in-class exercises.

## Features

* Built with React and Vite

* Component-based structure

* Reusable `Header` component

* Reusable `Dish` component using props

* Reusable `Card` component

* Menu data loaded from a local JSON file using `fetch()`

* Custom `useFetch` hook for handling API requests

* Menu items rendered dynamically using `.map()`

* Unique `key` assigned to each dish

* Category filtering using React state

* Category buttons generated dynamically from menu data

* Active category highlighted

* Search functionality for filtering dishes

* Shopping cart managed with `useReducer`

* Cart state shared across components using Context API

* Add, remove, and clear cart functionality

* Individual dish quantities tracked in the cart

* Cart item count displayed in the header

* Running order total displayed in ETB

* Controlled delivery form using a single state object

* TeleBirr phone number validation

* Place Order button disabled until the TeleBirr number is valid

* Loading state displayed while menu data is being fetched

* Error state for failed menu requests

* HTTP response validation using `res.ok`

* Previous fetch request cancelled using `AbortController`

* Search field automatically focused using `useRef`

* `useMemo` used to memoize filtered dish calculations

* Responsive grid layout for menu cards

* Styled food menu with reusable components

## Project Structure

```bash
public/
└── menu.json

src/
├── App.jsx
├── App.css
│
├── hooks/
│   └── useFetch.js
│
├── reducers/
│   └── cartReducer.js
│
├── context/
│   └── CartContext.jsx
│
└── components/
    ├── Header/
    │   ├── Header.jsx
    │   └── Header.css
    │
    └── Main/
        ├── Main.jsx
        ├── Main.css
        │
        └── Product/
            ├── Product.jsx
            ├── Product.css
            ├── Dish.jsx
            ├── Dish.css
            └── Card.jsx
```

## React Concepts Practiced

This exercise builds on the previous interactive menu by introducing custom hooks, shared state, reducers, Context API, memoization, and more advanced state management.

### State

React state is used to manage:

* The selected menu category

* Search input

* Delivery form input values

* Fetched menu data through the `useFetch` custom hook

* Loading and error states through the `useFetch` custom hook

* Cart items through `useReducer`

### Data Fetching

The menu is loaded from `menu.json` using the Fetch API inside the custom `useFetch` hook.

The response is checked using `res.ok`, and a clear error message is displayed if the request fails.

### Custom Hook — useFetch

The `useFetch` custom hook extracts the data-fetching logic from the `Product` component.

It manages:

* Fetching menu data

* Loading state

* Error state

* Request cleanup

* Cancelling previous requests with `AbortController`

### useEffect

`useEffect` is used inside the `useFetch` hook to fetch menu data and handle the request lifecycle.

It is also used to automatically focus the search field after the menu has finished loading.

### Cleanup and AbortController

An `AbortController` is used to cancel the previous fetch request when the effect runs again. This prevents outdated requests from continuing after the selected category changes.

### useRef

`useRef` is used to access the search input and automatically focus it once the menu has finished loading.

### useReducer

`useReducer` is used to manage cart state and centralize cart transitions.

The `cartReducer` handles:

* `ADD` — adds a dish or increases its quantity

* `REMOVE` — removes a dish from the cart

* `CLEAR` — clears the entire cart

This keeps the cart state logic separate from the UI components.

### Context API

React Context is used to make the cart state available across components without passing it through multiple levels of props.

The `CartProvider` provides:

* `items`

* `dispatch`

* `total`

The `Header`, `Dish`, and checkout section can access the shared cart state using `useContext`.

### useMemo

`useMemo` is used to memoize calculated values.

It is used to:

* Memoize the Context provider value

* Memoize filtered dish calculations

This prevents unnecessary recalculation when the relevant dependencies have not changed.

### Conditional Rendering

Conditional rendering is used to display:

* A loading message while the menu is being fetched

* An error message if the request fails

* A message when no dishes match the selected category or search

* An empty-cart message when there are no items in the cart

* The Clear Cart button only when the cart contains items

### Props

Data is passed between components using props, allowing components such as `Dish` and `Card` to remain reusable.

### Array Methods

`.map()` is used to render dishes, category buttons, and cart items.

`.filter()` is used for category and search filtering.

`.reduce()` is used to calculate the total number of cart items and the running order total.

### Controlled Form

The delivery form is controlled by React state, with the name, TeleBirr number, and delivery area stored in one state object.

## How to Run

### 1. Clone the bootcamp repository

### 2. Navigate to the Addis Eats React project

```bash
cd codeops-portfolio/module-03/day30/addis-eats
```

### 3. Install the dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the local URL provided by Vite in your browser.