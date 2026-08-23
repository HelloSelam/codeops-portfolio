function discountBy(rate) {
    return function (price) {
        return price - (price * rate);
    };
}

// Create two discount functions
const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

// Apply them to 1000 ETB
console.log(memberPrice(1000));
console.log(salePrice(1000));