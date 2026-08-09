const billAmount = Number(400);
const partySize = 8;
const paymentMethod = "Telebirr";

let tipRate;

if (billAmount >= 300) {
    tipRate = 0.10;
} else {
    tipRate = 0.05;
}

const tip = billAmount * tipRate;
const totalAmount = billAmount + tip;

let serviceFee;

switch (paymentMethod) {
    case "TeleBirr":
    serviceFee = 2;
    break;

    case "CBE Birr":
    serviceFee = 1;
    break;

    default:
    serviceFee = 0;
}

const finalTotal = totalAmount + serviceFee;
const perPerson = finalTotal / partySize;

console.log(`Bill: ${billAmount} ETB`);
console.log(`Tip: ${tip} ETB`);
console.log(`Service fee: ${serviceFee} ETB`);
console.log(`Total: ${finalTotal} ETB`);
console.log(`Amount per person: ${perPerson} ETB`);
