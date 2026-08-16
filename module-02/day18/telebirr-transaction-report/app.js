import { transactions } from "./transactions.js";
import { totalByType, makeReceipts } from "./report.js";


const totalCredits = totalByType(transactions, "credit");
const totalDebits = totalByType(transactions, "debit");
const receipts = makeReceipts(transactions);

const correctedTransaction = {
  ...transactions[1],
  amount: 650
};


console.log("=== TeleBirr Transaction Report ===");
console.log(`Total Credits: ${totalCredits} ETB`);
console.log(`Total Debits: ${totalDebits} ETB`);
console.log("\nReceipts:");

receipts.forEach(receipt => {
  console.log(receipt);
});

console.log("\nCorrected Transaction:");
console.log(correctedTransaction);

console.log("\nOriginal Transaction:");
console.log(transactions[1]);