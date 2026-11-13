import {
  Order,
  OrderStatus,
  InMemoryOrderRepository,
  OrderService,
  PaymentDeclinedError
} from "./orders";

const orders: Order[] = [
  {
    id: 101,
    customerName: "Abebe",
    area: "Bole",
    status: "PENDING",
    dishes: [
      { name: "Doro Wat", priceSantim: 32000 },
      { name: "Injera", priceSantim: 5000 }
    ],
    telebirrPhone: "0912345678",
    totalSantim: 37000
  },
  {
    id: 102,
    customerName: "Hana",
    area: "Piassa",
    status: "PREPARING",
    dishes: [
      { name: "Siga Wat", priceSantim: 29000 }
    ],
    totalSantim: 29000
  }
];

const repository = new InMemoryOrderRepository(orders);

const service = new OrderService(repository);

console.log("All orders:", repository.all());

console.log("Find order:", service.find(101));

console.log("Delivery fees:", service.feesByArea());

console.log("Customer names:", service.summarise("customerName"));

console.log("Order totals:", service.summarise("totalSantim"));

console.log("Dish lists:", service.summarise("dishes"));

try {
  service.find(999);
} catch (err) {
  if (err instanceof Error) {
    console.log("Error:", err.message);
  }
}

const paymentError = new PaymentDeclinedError(
  "0912345678",
  "Insufficient balance"
);

console.log(paymentError.message);