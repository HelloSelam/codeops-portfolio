const AREAS = [
  "Bole",
  "Kazanchis",
  "Piassa",
  "Megenagna"
] as const;

type Area = (typeof AREAS)[number];

type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

type Dish = {
  name: string;
  priceSantim: number;
};

type Order = {
  readonly id: number;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  telebirrPhone?: string;
  totalSantim: number;
};

function deliveryFee(order: Order): number {
  if (order.totalSantim > 50000) {
    return 0;
  }

  if (order.area === "Bole") {
    return 4000;
  }

  return 6000;
}

function statusMessage(status: OrderStatus): string {
  switch (status) {
    case "PENDING":
      return "Waiting for restaurant confirmation";

    case "PREPARING":
      return "Your food is being prepared";

    case "ON_THE_WAY":
      return "Your order is on the way";

    case "DELIVERED":
      return "Your order has been delivered";

    case "CANCELLED":
      return "Your order has been cancelled";

    default:
      const unreachable: never = status;
      return unreachable;
  }
}

function formatEtb(santim: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB"
  }).format(santim / 100);
}

function receipt(order: Order): string {
  const fee = deliveryFee(order);
  const grandTotal = order.totalSantim + fee;

  const dishList = order.dishes
    .map((dish) => `${dish.name}: ${formatEtb(dish.priceSantim)}`)
    .join("\n");

  return `
    Addis Eats - Order #${order.id}
    Customer: ${order.customerName}
    Area: ${order.area}
    Status: ${statusMessage(order.status)}
    TeleBirr: ${order.telebirrPhone ?? "Not provided"}

    Items:
    ${dishList}

    Subtotal: ${formatEtb(order.totalSantim)}
    Delivery Fee: ${formatEtb(fee)}
    Total: ${formatEtb(grandTotal)}
  `;
}

/*test code*/
const sampleOrder: Order = {
  id: 4821,
  customerName: "Almaz Bekele",
  area: "Bole",
  status: "PREPARING",
  dishes: [
    { name: "Doro Wat", priceSantim: 32000 },
    { name: "Shiro", priceSantim: 18000 }
  ],
  telebirrPhone: "0912345678",
  totalSantim: 50000
};

console.log(receipt(sampleOrder));