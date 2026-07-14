# Exercise 1: Unique cities

cities = ["Addis Ababa", "Adama", "Bahir Dar", "Addis Ababa", "Adama", "Hawassa"]

unique_cities = set(cities)

print("Unique cities:")
print(unique_cities)

print("Number of unique cities:", len(unique_cities))


# Exercise 2: Price report

grocery_prices = {
    "Bread": 80,
    "Milk": 120,
    "Sugar": 150,
    "Rice": 250,
    "Eggs": 180
}

print("Price Report")

for item, price in grocery_prices.items():
    print(item, "-", price, "ETB")


# Exercise 3: Tax comprehension

prices = [100, 250, 400, 80]

prices_with_tax = [price * 1.15 for price in prices]

print(prices_with_tax)


# Exercise 4: Cheap items

prices = [100, 250, 400, 80]

cheap_prices = [price for price in prices if price < 200]

print(cheap_prices)


# Exercise 5: Write & read

with open("names.txt", "w") as file:
    file.write("Abel\n")
    file.write("Sara\n")
    file.write("John\n")

with open("names.txt", "r") as file:
    for name in file:
        print(name.strip())

    
# Exercise 6: Safe division

try:
    number = float(input("Enter a number: "))

    result = 1000 / number

    print("Result:", result)

except ValueError:
    print("Please enter a valid number.")

except ZeroDivisionError:
    print("You cannot divide by zero.")