from abc import ABC, abstractmethod


class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")

    @abstractmethod
    def wheels(self):
        pass


class Car(Vehicle):
    def wheels(self):
        return 4


class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

    def describe(self):
        print(f"{self.make} {self.model} - Capacity: {self.capacity}")

    def wheels(self):
        return 6


vehicles = [
    Car("Toyota", "Corolla"),
    Truck("Volvo", "FH16", "20 tons"),
    Car("Honda", "Civic"),
    Truck("Mercedes", "Actros", "18 tons")
]

for vehicle in vehicles:
    vehicle.describe()
    print(f"Wheels: {vehicle.wheels()}")
    print("-" * 30)