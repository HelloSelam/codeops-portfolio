import heapq

# Exercise 1 - Binary Search Tree

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root

def inorder(node):
    if node is None:
        return

    inorder(node.left)
    print(node.value, end=" ")
    inorder(node.right)

balances = [500, 300, 700, 200, 400, 600, 800]
root = None

for balance in balances:
    root = insert(root, balance)

print("In-order Traversal:")
inorder(root)
print()


# Exercise 2 - Tree Height

def height(node):
    if node is None:
        return 0

    left_height = height(node.left)
    right_height = height(node.right)
    return 1 + max(left_height, right_height)

print("\nTree Height:")
print(height(root))


# Exercise 3 - Breadth First Search

def bfs(graph, start):
    visited = set()
    queue = [start]

    while queue:
        current = queue.pop(0)
        if current not in visited:
            visited.add(current)
            for neighbor in graph.get(current, []):
                if neighbor not in visited:
                    queue.append(neighbor)
    return visited

graph = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["F"],
    "D": [],
    "E": ["F"],
    "F": []
}

print("\nBFS:")
print(bfs(graph, "A"))


# Exercise 4 - Depth First Search

def dfs(graph, start, visited=None):
    if visited is None:
        visited = []
    visited.append(start)

    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited

print("\nDFS:")
print(dfs(graph, "A"))


# Exercise 5 - Priority Queue (Heap)

tasks = []

heapq.heappush(tasks, (3, "Wash Clothes"))
heapq.heappush(tasks, (1, "Study Python"))
heapq.heappush(tasks, (5, "Watch Movie"))
heapq.heappush(tasks, (2, "Complete Assignment"))
heapq.heappush(tasks, (4, "Go Shopping"))

print("\nPriority Queue:")

while tasks:
    priority, task = heapq.heappop(tasks)
    print(priority, "-", task)