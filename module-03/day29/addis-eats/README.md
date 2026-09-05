# Addis Eats — Interactive React Menu

An interactive Addis Eats food ordering menu built with React and Vite as part of the React in-class exercises.

## Features

* Built with React and Vite
* Component-based structure
* Reusable `Header` component
* Reusable `Dish` component using props
* Reusable `Card` component
* Menu data loaded from a local JSON file using `fetch()`
* Menu items rendered dynamically using `.map()`
* Unique `key` assigned to each dish
* Category filtering using React state
* Category buttons generated dynamically from menu data
* Active category highlighted
* Individual dish quantity tracked using `useState`
* "Add" button for adding dishes to the order
* Running order total displayed in ETB
* Controlled delivery form using a single state object
* TeleBirr phone number validation
* Place Order button disabled until the TeleBirr number is valid
* Loading state displayed while menu data is being fetched
* Error state for failed menu requests
* HTTP response validation using `res.ok`
* Previous fetch request cancelled using `AbortController`
* Search field automatically focused using `useRef`
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

This exercise builds on the previous interactive menu by introducing data fetching, side effects, cleanup, and refs.

### State

React's `useState` is used to manage:

* The fetched menu dishes
* The selected menu category
* The quantity of each dish
* The running order total
* Loading and error states
* Search input
* Delivery form input values

### Data Fetching

The menu is loaded from `menu.json` using the Fetch API inside `useEffect`.

The response is checked using `res.ok`, and a clear error message is displayed if the request fails.

### useEffect

`useEffect` is used to:

* Fetch menu data when the component loads
* Refetch the menu when the selected category changes
* Automatically focus the search field after the menu has loaded

### Cleanup and AbortController

An `AbortController` is used to cancel the previous fetch request when the effect runs again, preventing outdated requests from continuing after the category changes.

### useRef

`useRef` is used to access the search input and automatically focus it once the menu has finished loading.

### Conditional Rendering

Early returns are used to display:

* A loading message while the menu is being fetched
* An error message if the request fails
* A message when no dishes match the selected category or search

### Props

Data and functions are passed between components using props, allowing the `Dish` component to remain reusable.

### Array Methods

`.map()` is used to render dishes and category buttons, while `.filter()` is used for category and search filtering.

### Controlled Form

The delivery form is controlled by React state, with the name, TeleBirr number, and delivery area stored in one state object.

## How to Run

### 1. Clone the bootcamp repository

### 2. Navigate to the Addis Eats React project

```bash
cd codeops-portfolio/module-03/day29/addis-eats
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
