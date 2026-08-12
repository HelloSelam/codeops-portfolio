import { withVat, format } from "./pricing.js";

const orders = [
    {
    id: 1,
    customer: "Abebe",
    items: [
        { name: "Injera", price: 80, qty: 2 },
        { name: "Shiro", price: 150, qty: 1 }
    ]
    },
    {
    id: 2,
    customer: "Hana",
    items: [
        { name: "Coffee", price: 120, qty: 2 },
        { name: "Cake", price: 180, qty: 2 }
    ]
    },
    {
    id: 3,
    customer: "Dawit",
    items: [
        { name: "Tibs", price: 300, qty: 2 },
        { name: "Juice", price: 100, qty: 1 }
    ]
    }
];

const ordersWithTotals = orders.map((order) => {
    const total = order.items.reduce((sum, { price, qty }) => {
    return sum + price * qty;
    }, 0);

    return {
    ...order,
    total: withVat(total)
    };
});

const largeOrders = ordersWithTotals.filter((order) => {
    return order.total > 500;
});

const grandTotal = ordersWithTotals.reduce((sum, order) => {
    return sum + order.total;
}, 0);

console.log("=== Addis Market Order Summary ===");

ordersWithTotals.forEach(({ id, customer, total }) => {
    console.log(`${id}. ${customer}: ${format(total)}`);
});

console.log("\nOrders over 500 ETB:");

largeOrders.forEach(({ customer, total }) => {
    console.log(`- ${customer}: ${format(total)}`);
});

console.log(`\nGrand Total: ${format(grandTotal)}`);