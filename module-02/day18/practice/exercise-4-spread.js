const customer = {
    name: "Abebe",
    city: "Addis Ababa",
    balance: 2500
};

const updatedCustomer = {
    ...customer,
    city: "Bahir Dar",
    phone: "0912345678"
};

console.log("Original customer:");
console.log(customer);

console.log("Updated customer:");
console.log(updatedCustomer);