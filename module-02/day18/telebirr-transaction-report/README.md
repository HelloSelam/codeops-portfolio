# TeleBirr Transaction Report

This mini-project generates a simple transaction report for a TeleBirr shop.

It uses JavaScript array methods and modern syntax including:

- filter
- reduce
- map
- destructuring
- spread
- ES modules

## Files

### transactions.js

Contains the transaction data.

Each transaction has:

- id
- customer
- amount
- type

The `type` can be either `credit` or `debit`.

### report.js

Contains reusable functions for generating the report.

`totalByType()` uses `filter()` and `reduce()` to calculate the total amount for credits or debits.

`makeReceipts()` uses `map()` and destructuring to create formatted receipt messages.

### app.js

Imports the transaction data and report functions.

It calculates and prints the transaction totals and receipts.

It also demonstrates the spread operator by creating a corrected copy of a transaction without changing the original object.

## Sample Report

Total Credits: 1050 ETB

Total Debits: 730 ETB

Receipts:

- Almaz paid 250 ETB
- Dawit paid 600 ETB
- Tigist paid 180 ETB
- Yonas paid 450 ETB
- Hana paid 300 ETB