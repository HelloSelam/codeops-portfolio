# ---------- Book Class ----------

class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        print(f'"{self.title}" by {self.author} - {self.pages} pages')


book1 = Book("Atomic Habits", "James Clear", 320)
book2 = Book("The Alchemist", "Paulo Coelho", 208)

book1.describe()
book2.describe()


print()


# ---------- Product Class ----------

class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    @quantity.setter
    def quantity(self, value):
        if value < 0:
            print("Quantity cannot be negative.")
        else:
            self.__quantity = value

    def restock(self, n):
        if n > 0:
            self.__quantity += n
            print(f"Restocked {n} {self.name}(s).")
        else:
            print("Restock amount must be positive.")

    def sell(self, n):
        if n <= 0:
            print("Sale amount must be positive.")
        elif n > self.__quantity:
            print(f"Not enough {self.name} in stock.")
        else:
            self.__quantity -= n
            print(f"Sold {n} {self.name}(s).")


# Create products
product1 = Product("Notebook", 150, 20)
product2 = Product("Pen", 25, 50)
product3 = Product("Backpack", 1200, 10)

print("Initial quantities:")
print(product1.name, product1.quantity)
print(product2.name, product2.quantity)
print(product3.name, product3.quantity)

print()

product1.sell(5)
product1.restock(10)

print()

print("Final quantities:")
print(product1.name, product1.quantity)
print(product2.name, product2.quantity)
print(product3.name, product3.quantity)