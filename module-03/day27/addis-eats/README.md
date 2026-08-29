# Addis Eats — React Static Menu

A static Addis Eats food menu built with React and Vite as part of the React in-class exercises.

## Features

- Built with React and Vite
- Component-based structure
- Reusable `Header` component
- Reusable `Dish` component using props
- Menu data stored in a JavaScript array
- Menu items rendered dynamically using `.map()`
- Unique `key` assigned to each dish
- Responsive grid layout for menu cards
- Styled food menu with reusable components

## Project Structure

```bash
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
            └── Dish.css
            └── Card.jsx
```

## How to Run

### 1. Clone the bootcamp repository.
### 2. Navigate to the Addis Eats React project:

```bash
cd codeops-portfolio/module-03/day27/addis-eats
```

### 3. Install the dependencies:

```bash
npm install
```

### 4. Start the development server:

```bash
npm run dev
```

### 5. Open the local URL provided by Vite in your browser.