bill_total = 2000
number_of_people = 4

names = ["Almaz", "Hanna", "Samuel", "Dawit"]

def split_bill(total, people, tip_rate=0.10):
    tip = total * tip_rate
    total_with_tip = total + tip
    share = total_with_tip / people
    return share

share = split_bill(bill_total, number_of_people)

for name in names:
    print(f"{name} should pay {share} ETB")