class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance

class SMSAlert:
    def update(self, message):
        print(f"SMS Alert: {message}")

class AuditLog:
    def update(self, message):
        print(f"Audit Log: {message}")

class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self.subscribers = []

    @property
    def balance(self):
        return self.__balance

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def _notify(self, message):
        for subscriber in self.subscribers:
            subscriber.update(message)

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
        else:
            self.__balance += amount
            print(f"Deposited ETB {amount:.2f}")
            self._notify(f"{self.owner} deposited ETB {amount:.2f}")

    def withdrawal(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self.__balance:
            print("Insufficient funds.")
        else:
            self.__balance -= amount
            print(f"Withdrew ETB {amount:.2f}")
            self._notify(f"{self.owner} withdrew ETB {amount:.2f}")

    def statement(self):
        print(
            f"Account | Owner: {self.owner} | "
            f"Balance: ETB {self.balance:.2f}"
        )

class SavingAccount(Account):
    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)
        self.rate = BankConfig().interest_rate

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
    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)
        self.overdraft = BankConfig().overdraft_limit

    def withdrawal(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
        elif amount > self.balance + self.overdraft:
            print("Overdraft limit exceeded.")
        else:
            self._Account__balance -= amount
            print(f"Withdrew ETB {amount:.2f}")
            self._notify(f"{self.owner} withdrew ETB {amount:.2f}")

    def statement(self):
        print(
            f"Current Account | Owner: {self.owner} | "
            f"Balance: ETB {self.balance:.2f} | "
            f"Overdraft: ETB {self.overdraft:.2f}"
        )

class AccountFactory:
    @staticmethod

    def create(kind, owner, number, balance=0):
        if kind == "savings":
            return SavingAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        elif kind == "account":
            return Account(owner, number, balance)
        else:
            raise ValueError("Unknown account type")

# Shared observers
sms = SMSAlert()
audit = AuditLog()

# Create accounts
account1 = AccountFactory.create("account", "Selamawit", "1001", 1000)
account2 = AccountFactory.create("savings", "Abel", "1002", 500)
account3 = AccountFactory.create("current", "Mimi", "1003", 300)

# Subscribe observers
account1.subscribe(sms)
account1.subscribe(audit)
account2.subscribe(sms)
account3.subscribe(audit)

# Transactions
account1.deposit(200)
account2.deposit(500)
account2.add_interest()
account3.withdrawal(800)

# Polymorphism
accounts = [
    account1,
    account2,
    account3
]

print("\nAccount Statements:")

for account in accounts:
    account.statement()