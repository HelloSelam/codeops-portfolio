# Question 1

def getOnlyEvens(numbers):
    result = []
    for i in range(len(numbers)):
        if i % 2 == 0 and numbers[i] % 2 == 0:
            result.append(numbers[i])
    print(result)

getOnlyEvens([1, 2, 3, 6, 4, 8]) 
getOnlyEvens([0, 1, 2, 3, 4])


#  Question 2

def reverseCompare(num):
    reversed_num = int(str(num)[::-1])
    if num > reversed_num:
        print("ok")
    if num < reversed_num:
        print("not ok")

reverseCompare(72)
reverseCompare(23)


# Question 3

def returnFactorial(num):
    factorial = 1
    for i in range(1, num + 1):
        factorial *= i
    return factorial

print(returnFactorial(5))
print(returnFactorial(6))
print(returnFactorial(0))

#  Question 4

def checkMeera(numbers):
    for num in numbers:
        if num * 2 in numbers:
            print("I am a Meera Array")
            return

    print("I am NOT a Meera Array")

checkMeera([10, 4, 0, 5])
checkMeera([7, 4, 9]) 
checkMeera([1, -6, 4, -3])


# Question 5

def isDual(arr):
    counts = {}
    for num in arr:
        if num in counts:
            counts[num] += 1
        else:
            counts[num] = 1
    for value in counts.values():
        if value != 2:
            return 0
    return 1

print(isDual([1, 2, 1, 3, 3, 2]))   
print(isDual([2, 5, 2, 5, 5]))      
print(isDual([3, 1, 1, 2, 2]))  

#  Question 6

def digitalClock(secs):
    secs = secs % 86400
    hrs = secs // 3600
    mins = (secs % 3600) // 60
    secs = secs % 60

    return f"{hrs:02}:{mins:02}:{secs:02}"

print(digitalClock(61201))
print(digitalClock(87000))
