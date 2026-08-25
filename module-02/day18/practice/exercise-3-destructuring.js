const customer = {
    name: "Abebe",
    city: "Addis Ababa",
    balance: 2500
};

// Destructure name and city
const { name, city } = customer;

console.log(name);
console.log(city);


// Parameter destructuring
function greet({ name }) {
    console.log(`Hello, ${name}!`);
}

greet(customer);