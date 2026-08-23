// Regular function with a default parameter
function vat(amount, rate = 0.15) {
    return amount * rate;
}

console.log(vat(1000));
console.log(vat(1000, 0.20));


// Arrow function with an implicit return
const vatArrow = (amount, rate = 0.15) => amount * rate;

console.log(vatArrow(1000));
console.log(vatArrow(1000, 0.20)); 