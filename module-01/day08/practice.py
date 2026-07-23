import random

# Exercise 1 - Recursive Sum

def total(nums):
    if len(nums) == 0:
        return 0
    return nums[0] + total(nums[1:])

numbers = [10, 20, 30, 40, 50]
print("Total:", total(numbers))

def count_down(n):
    if n == 0:
        return
    print(n)
    count_down(n - 1)

print("Countdown:")
count_down(5)


# Exercise 2 - Binary Search

def binary_search(items, target):
    low = 0
    high = len(items) - 1

    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

balances = [100, 250, 400, 550, 700, 900]

print("Index:", binary_search(balances, 550))
print("Index:", binary_search(balances, 300))


# Exercise 3 - Merge Sort

def merge(left, right):
    result = []

    while len(left) > 0 and len(right) > 0:
        if left[0] < right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))

    result.extend(left)
    result.extend(right)
    return result

def merge_sort(items):
    if len(items) <= 1:
        return items

    middle = len(items) // 2
    left = merge_sort(items[:middle])
    right = merge_sort(items[middle:])
    return merge(left, right)

random_list = random.sample(range(1, 100), 10)

print("Original:", random_list)
print("Merge Sort:", merge_sort(random_list))
print("Python sorted:", sorted(random_list))


# Exercise 4 - Sort with a Key

accounts = [
    ("Abel", 900),
    ("Sara", 1500),
    ("John", 700),
    ("Liya", 1200)
]

sorted_accounts = sorted(
    accounts,
    key=lambda account: account[1],
    reverse=True
)

print(sorted_accounts)


# Exercise 5 - Two Pointers

def has_pair(nums, target):
    left = 0
    right = len(nums) - 1

    while left < right:
        total = nums[left] + nums[right]
        if total == target:
            return True
        elif total < target:
            left += 1
        else:
            right -= 1
    return False

numbers = [2, 4, 7, 10, 13, 18, 20]

print(has_pair(numbers, 17))
print(has_pair(numbers, 40))