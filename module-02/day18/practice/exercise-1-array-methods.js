const prices = [200, 500, 800, 1200, 1500];

const pricesWithVAT = prices.map(price =>
    Number((price * 1.15).toFixed(2))
);

const under1000 = pricesWithVAT.filter(price => price < 1000);

const grandTotal = under1000.reduce(
    (total, price) => total + price,
    0
);

console.log("Prices with VAT:", pricesWithVAT);
console.log("Prices under 1000 ETB:", under1000);
console.log("Grand total:", grandTotal);