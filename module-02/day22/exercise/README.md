# Ethiopian Currency Converter

Ethiopian Currency Converter is a simple data-driven JavaScript application that tracks live Ethiopian Birr (ETB) exchange rates.

## Features

- Fetches live exchange rates for ETB.
- Converts an ETB amount to a selected currency.
- Displays available currencies from the API.
- Allows users to add currencies to a watchlist.
- Allows users to remove currencies from the watchlist.
- Saves the watchlist and selected currency using localStorage.
- Restores saved choices after a page reload.
- Shows loading and error messages when fetching rates.

## API

Birr Watch uses the ExchangeRate-API Open Access endpoint:

`https://open.er-api.com/v6/latest/ETB`

The API returns exchange rates with ETB as the base currency.

For example:

`500 ETB × USD rate = USD amount`

## Technologies

- HTML
- CSS
- JavaScript
- Fetch API
- Async/Await
- localStorage

## How to Run

Open `index.html` in a browser, preferably using VS Code Live Server.

## Project Structure

- `index.html` — page structure
- `styles.css` — styling and layout
- `app.js` — application logic, API fetching, conversion, watchlist, and storage

## What I Practiced

This project combines JavaScript DOM manipulation, events, arrays, objects, API requests, async/await, JSON, localStorage, and state-driven rendering.