# Pharmacy Inventory Tracker

stock = {}

# Read stock from file
try:
    with open("stock.txt", "r") as file:
        for line in file:
            line = line.strip()

            item, quantity = line.split(",")

            stock[item] = int(quantity)

except FileNotFoundError:
    print("No stock file yet - starting empty.")


# update stock
def adjust(item, amount):
    if item in stock:
        stock[item] = stock[item] + amount
    else:
        stock[item] = amount


# Update some items
adjust("Paracetamol", 5)
adjust("Vitamin C", -2)
adjust("ORS", -4)


# Print low-stock items
print("Low stock items:")

for item in stock:
    if stock[item] < 10:
        print(item, "-", stock[item])


# Save updated stock
with open("stock.txt", "w") as file:
    for item in stock:
        file.write(item + "," + str(stock[item]) + "\n")

print("Stock file updated.")