function makeCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log(counter()); // 4

// count stays private because it is declared inside makeCounter.
// Code outside makeCounter cannot directly access the count variable.
// The returned function remembers and can still use count because of closure.