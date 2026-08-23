function applyToAll(list, fn) {
    const results = [];

    for (const item of list) {
        results.push(fn(item));
    }

    return results;
}


const prices = [100, 500, 1000, 2000];

const pricesWithVAT = applyToAll(
    prices,
    price => price + vat(price)
);

console.log(pricesWithVAT);