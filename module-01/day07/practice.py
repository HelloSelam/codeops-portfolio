
# Exercise 1 - Big-O

numbers = [10, 20, 30, 40, 50]

# O(1)
# Getting an item by index takes the same time no matter the list size.
print(numbers[2])

# O(n)
# We visit every item in the list once.
for number in numbers:
    print(number)

# O(n²)
# The inner loop runs for every outer loop iteration.
for first in numbers:
    for second in numbers:
        print(first, second)

accounts = {
    "1001": "Selam",
    "1002": "Abel",
    "1003": "Sara"
}

# O(1)
# Dictionary lookup is usually constant time.
print(accounts["1002"])

# O(log n)
# Binary search keeps dividing the search area in half each time.

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

sorted_numbers = [1, 3, 5, 7, 9, 11, 13]

index = binary_search(sorted_numbers, 9)
print("Found at index:", index)



# Exercise 2 - List vs Dict Lookup

import time

account_list = []
account_dict = {}

for i in range(100000):
    number = f"ACC{i}"
    account_list.append(number)
    account_dict[number] = i

target = "ACC99999"
start = time.perf_counter()
found = target in account_list
end = time.perf_counter()

print("List lookup:", end - start)


start = time.perf_counter()
found = target in account_dict
end = time.perf_counter()

print("Dict lookup:", end - start)


# Exercise 3 - Stack

class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.items:
            return self.items.pop()

    def peek(self):
        if self.items:
            return self.items[-1]

stack = Stack()
names = ["Selam", "Abel", "Sara", "John"]

for name in names:
    stack.push(name)

reversed_names = []

while stack.peek() is not None:
    reversed_names.append(stack.pop())

print(reversed_names)


# Exercise 4 - Queue

from collections import deque

queue = deque()

queue.append("Selam")
queue.append("Abel")
queue.append("Sara")
queue.append("John")
queue.append("Liya")

while queue:
    customer = queue.popleft()
    print(customer, "has been served")


# Exercise 5 - Singly Linked List

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        current = self.head

        while current:
            print(current.data)
            current = current.next

my_list = LinkedList()

my_list.push_front("John")
my_list.push_front("Sara")
my_list.push_front("Abel")
my_list.push_front("Selam")

my_list.print_all()