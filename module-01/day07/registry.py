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

        self.history = []

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

# NEW FOR DAY 7
# -----------------------------
class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []

    def add(self, acc):
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        accounts = []
        for number in self.order:
            accounts.append(self.by_number[number])
        return accounts

    def deposit(self, number, amount):
        account = self.find(number)
        if account:
            account.deposit(amount)
            if not hasattr(account, "history"):
                account.history = []
            account.history.append(("deposit", amount))

    def withdrawal(self, number, amount):
        account = self.find(number)
        if account:
            old_balance = account.balance

            account.withdrawal(amount)

            if account.balance != old_balance:
                if not hasattr(account, "history"):
                    account.history = []
                account.history.append(("withdrawal", amount))

    def undo_last(self, number):
        account = self.find(number)

        if account is None:
            print("Account not found.")
            return

        if not hasattr(account, "history") or len(account.history) == 0:
            print("No transactions to undo.")
            return

        transaction = account.history.pop()

        kind = transaction[0]
        amount = transaction[1]

        if kind == "deposit":
            account._Account__balance -= amount
            print(f"Undid deposit of ETB {amount:.2f}")

        elif kind == "withdrawal":
            account._Account__balance += amount
            print(f"Undid withdrawal of ETB {amount:.2f}")

# Testing

sms = SMSAlert()
audit = AuditLog()

account1 = AccountFactory.create("account", "Selamawit", "1001", 1000)
account2 = AccountFactory.create("savings", "Abel", "1002", 500)
account3 = AccountFactory.create("current", "Mimi", "1003", 300)

account1.subscribe(sms)
account1.subscribe(audit)
account2.subscribe(sms)
account3.subscribe(audit)

registry = AccountRegistry()

registry.add(account1)
registry.add(account2)
registry.add(account3)

print("Find account 1002:")
found = registry.find("1002")
found.statement()

print("\nDeposit ETB 200 into account 1001")
registry.deposit("1001", 200)

print("\nWithdraw ETB 100 from account 1001")
registry.withdrawal("1001", 100)

print("\nUndo last transaction")
registry.undo_last("1001")

print("\nAll Accounts:")

for account in registry.list_all():
    account.statement()