# Exercise 1 - Spot the SRP violation

class ReportBuilder:
    def build(self):
        print("Building report")

class ReportSaver:
    def save(self):
        print("Saving report")

class ReportEmailer:
    def email(self):
        print("Sending report email")

builder = ReportBuilder()
saver = ReportSaver()
emailer = ReportEmailer()

builder.build()
saver.save()
emailer.email()


# Exercise 2 - Refactor to OCP

class Circle:
    def area(self):
        print("Circle area")

class Square:
    def area(self):
        print("Square area")

class Triangle:
    def area(self):
        print("Triangle area")

shapes = [
    Circle(),
    Square(),
    Triangle()
]

for shape in shapes:
    shape.area()


# Exercise 3 - Write a Singleton

class AppSettings:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance

settings1 = AppSettings()
settings2 = AppSettings()

print(settings1.currency)
print(settings1 is settings2)


# Exercise 4 - Write a Factory

class Circle:
    def draw(self):
        print("Drawing circle")

class Square:
    def draw(self):
        print("Drawing square")

class Triangle:
    def draw(self):
        print("Drawing triangle")

class ShapeFactory:
    @staticmethod
    
    def create(kind):
        if kind == "circle":
            return Circle()

        elif kind == "square":
            return Square()

        elif kind == "triangle":
            return Triangle()

        else:
            return None

 
shape1 = ShapeFactory.create("circle")
shape2 = ShapeFactory.create("square")
shape3 = ShapeFactory.create("triangle")

shape1.draw()
shape2.draw()
shape3.draw()


# Exercise 5 - Observer Pattern

class NewsAgency:

    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, news):

        for subscriber in self.subscribers:
            subscriber.update(news)

class EmailSubscriber:

    def update(self, news):
        print("Email received:", news)

class SMSSubscriber:

    def update(self, news):
        print("SMS received:", news)

news = NewsAgency()

email = EmailSubscriber()
sms = SMSSubscriber()

news.subscribe(email)
news.subscribe(sms)
news.notify("Python class starts tomorrow")