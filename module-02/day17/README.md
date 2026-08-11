LOYALTY POINTS MODULE

1. Closure
   let points = 0;
   → keeps balance private

2. Getter
   balance()
   → allows controlled access to private state

3. Mutation through methods
   earn() / redeem()
   → only exposed operations can change points

4. Higher-order function
   createLoyalty(earnRule)
   → accepts a function as an argument

5. Default parameter
   earnRule = defaultEarnRule
   → uses normal rule if none is supplied

6. Pure calculation
   etb => Math.floor(etb / 10)
   → same input = same output

7. Math.max()
   → prevents points from becoming negative