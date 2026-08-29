# Addis Eats — Interactive React Menu

An interactive Addis Eats food ordering menu built with React and Vite as part of the React in-class exercises.

## Features

* Built with React and Vite
* Component-based structure
* Reusable `Header` component
* Reusable `Dish` component using props
* Reusable `Card` component
* Menu data stored in a local `menu.json` file
* Menu items rendered dynamically using `.map()`
* Unique `key` assigned to each dish
* Category filtering using React state
* Category buttons generated dynamically from an array
* Active category highlighted
* Individual dish quantity tracked using `useState`
* "Add" button for adding dishes to the order
* Running order total displayed in ETB
* Controlled delivery form using a single state object
* TeleBirr phone number validation
* Place Order button disabled until the TeleBirr number is valid
* Responsive grid layout for menu cards
* Styled food menu with reusable components

## Project Structure

```bash
src/
├── App.jsx
├── App.css
│
├── data/
│   └── menu.json
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

This exercise focuses on managing state and making the menu interactive.

### State

React's `useState` is used to manage:

* The selected menu category
* The quantity of each dish
* The running order total
* Delivery form input values

### Props

Data and functions are passed between components using props, allowing the `Dish` component to remain reusable.

### Conditional Rendering

The menu displays a friendly message when no dishes are available for the selected category.

### Array Methods

`.map()` is used to render dishes and category buttons, while `.filter()` is used to display dishes belonging to the selected category.

### Controlled Form

The delivery form is controlled by React state, with the name, TeleBirr number, and delivery area stored in one state object.

## How to Run

### 1. Clone the bootcamp repository

### 2. Navigate to the Addis Eats React project

```bash
cd codeops-portfolio/module-03/day28/addis-eats
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
