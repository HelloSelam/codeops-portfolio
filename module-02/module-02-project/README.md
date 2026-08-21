# 🍽️ Addis Eats

Addis Eats is a responsive Ethiopian food-ordering single-page application built as the Module 2 capstone project.

The app allows users to browse an Ethiopian food menu loaded from JSON data, search and filter dishes, build a shopping cart, calculate live ETB totals, and complete a validated checkout form.

## Features

### Menu
- Menu data is loaded dynamically from a JSON file using `fetch()`.
- Dishes are rendered dynamically with JavaScript.
- Displays dish name, category, price, and spicy status.

### Search & Filtering
- Search dishes by name.
- Filter dishes by category.
- Displays a friendly message when no dishes match the search.

### Shopping Cart
- Add dishes to the cart.
- Increase or decrease item quantities.
- Remove items from the cart.
- Displays the number of items in the cart.
- Calculates the subtotal dynamically.
- Adds a delivery fee and calculates the final ETB total.

### Persistent State
- Cart data is stored in `localStorage`.
- The cart is restored when the page is reloaded.

### Checkout
- Checkout form uses semantic HTML form controls.
- Required fields are validated before submission.
- Users cannot place an order with an empty cart.
- Successful checkout clears the cart and resets the totals.

### Responsive & Accessible Design
- Responsive layout for desktop, tablet, and mobile screens.
- Uses semantic HTML elements such as `header`, `nav`, `main`, `section`, `article`, `aside`, and `form`.
- Form controls have associated labels.
- Buttons include accessible labels where needed.

## Technologies

- HTML5
- CSS3
- JavaScript
- JSON
- Fetch API
- DOM Manipulation
- Events & Event Delegation
- localStorage

## Project Structure

```text
addis-eats/
│
├── index.html
├── styles.css
├── app.js
│
└── data/
    └── menu.json