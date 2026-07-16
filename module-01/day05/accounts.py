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

    def statement(self):
        print(
            f"Account | Owner: {self.owner} | "
            f"Balance: ETB {self.balance:.2f}"
        )


class SavingAccount(Account):
    def __init__(self, owner, account_number, balance=0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)
        print(f"Interest added: ETB {interest:.2f}")

    def statement(self):
        print(
            f"Saving Account | Owner: {self.owner} | "
            f"Balance: ETB {self.balance:.2f}"
        )


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft=0):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    def withdrawal(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self.balance + self.overdraft:
            print("Overdraft limit exceeded.")
        else:
            # Accessing parent's private variable
            self._Account__balance -= amount
            print(f"Withdrew ETB {amount:.2f}")

    def statement(self):
        print(
            f"Current Account | Owner: {self.owner} | "
            f"Balance: ETB {self.balance:.2f} | "
            f"Overdraft: ETB {self.overdraft:.2f}"
        )


# Create different account types

account1 = Account("Selamawit", "1001", 1000)
account2 = SavingAccount("Abel", "1002", 500, 0.05)
account3 = CurrentAccount("Mimi", "1003", 300, 1000)


# Transactions

account1.deposit(200)

account2.deposit(500)
account2.add_interest()

account3.withdrawal(800)


# Polymorphic loop

accounts = [
    account1,
    account2,
    account3
]

print("\nAccount Statements:")

for account in accounts:
    account.statement()