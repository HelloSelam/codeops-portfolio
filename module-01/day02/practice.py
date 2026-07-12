# Exercise 1 - Temperature Label

temperature = float(input("Enter the temperature in °C: "))

if temperature < 15:
    print("cold")
elif temperature <= 28:
    print("warm")
else:
    print("hot")

print() 



# Exercise 2 - Receipt Loop

for number in range(1, 11):
    print(f"Receipt #{number}")

print()  



# Exercise 3 - Even Numbers

for number in range(1, 21):
    if number % 2 == 0:
        print(number)

print()  



# Exercise 4 - Discount Function

def apply_discount(price, percent=10):
    discount = price * (percent / 100)
    return price - discount

print(apply_discount(100))
print(apply_discount(100, 20))

print()  



# Exercise 5 - Countdown

count = 5

while count >= 1:
    print(count)
    count -= 1

print("Liftoff!")