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

# Binary Search

def binary_search(numbers, target):
    left = 0
    right = len(numbers) - 1

    while left <= right:
        middle = (left + right) // 2

        if numbers[middle] == target:
            return middle

        elif numbers[middle] < target:
            left = middle + 1

        else:
            right = middle - 1

    return -1

# Account Registry

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
            account.history.append(("deposit", amount))
            account.history.append(("withdrawal", amount))

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

    def top_by_balance(self, n=5):
        accounts = sorted(
            self.by_number.values(),
            key=lambda account: account.balance,
            reverse=True
        )
        return accounts[:n]

    def find_by_number(self, number):
        numbers = sorted(self.by_number)
        index = binary_search(numbers, number)
        if index >= 0:
            return self.by_number[numbers[index]]
        return None

    def total_transactions(self, number):
        account = self.find(number)
        if account is None:
            return 0
        return self._total(account.history)

    def _total(self, history):
        if len(history) == 0:
            return 0
        amount = history[0][1]
        return amount + self._total(history[1:])

class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_branch(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):
        total = sum(account.balance for account in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total

def bfs(transfers, start):
    visited = []
    queue = [start]

    while queue:
        current = queue.pop(0)
        if current not in visited:
            visited.append(current)
            for neighbor in transfers.get(current, []):
                if neighbor not in visited:
                    queue.append(neighbor)

    return visited

# ----- Testing -----

# Create observers
sms = SMSAlert()
audit = AuditLog()

# Create accounts
account1 = AccountFactory.create("account", "Selamawit", "1001", 1000)
account2 = AccountFactory.create("savings", "Abel", "1002", 500)
account3 = AccountFactory.create("current", "Mimi", "1003", 300)

# Create registry
registry = AccountRegistry()

registry.add(account1)
registry.add(account2)
registry.add(account3)

# Make some transactions
registry.deposit("1001", 200)
registry.withdrawal("1001", 100)
registry.deposit("1002", 300)
registry.withdrawal("1003", 200)

# Undo the last transaction
print("\nUndo last transaction")
registry.undo_last("1003")

# Top balances
print("\nTop 2 Accounts")
top_accounts = registry.top_by_balance(2)
for account in top_accounts:
    account.statement()

# Binary Search
print("\nFind Account Using Binary Search")
found = registry.find_by_number("1002")
if found:
    found.statement()
else:
    print("Account not found.")

# Recursive Total
print("\nTotal Transactions for Account 1001")
print(registry.total_transactions("1001"))

# Branch Tree
head = Branch("Head Office")
north = Branch("North Region")
south = Branch("South Region")
branch_a = Branch("Branch A")
branch_b = Branch("Branch B")

head.add_branch(north)   # Build the tree (3 levels)
head.add_branch(south)
north.add_branch(branch_a)
south.add_branch(branch_b)

head.add_account(account1)   # Add accounts to branches
north.add_account(account2)
branch_a.add_account(account3)

print("\nTotal Balance of All Branches")
print(f"ETB {head.total_balance():.2f}")

# Transfers graph
transfers = {
    "1001": ["1002", "1003"],
    "1002": ["1003"],
    "1003": ["1001"]
}

print("\nAccounts Reachable from 1001")
print(bfs(transfers, "1001"))