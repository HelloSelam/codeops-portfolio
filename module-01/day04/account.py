class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
        else:
            self.__balance += amount
            print(f"Deposited ETB {amount:.2f}")

    def withdrawal(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient funds.")
        else:
            self.__balance -= amount
            print(f"Withdrew ETB {amount:.2f}")


# Create accounts
account1 = Account("Selamawit", "1001", 1000)
account2 = Account("Abel", "1002", 500)

# Transactions for account1
print(f"{account1.owner}'s balance: ETB {account1.balance:.2f}")
account1.deposit(300)
account1.withdrawal(200)
account1.withdrawal(5000)
account1.deposit(-50)
print(f"Final balance: ETB {account1.balance:.2f}")

print()

# Transactions for account2
print(f"{account2.owner}'s balance: ETB {account2.balance:.2f}")
account2.deposit(100)
account2.withdrawal(50)
print(f"Final balance: ETB {account2.balance:.2f}")