import type { Order } from "./order.types.js";

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
  save(order: Order): Order;
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders: Map<number, Order>;

  constructor(initialOrders: Order[] = []) {
    this.orders = new Map(
      initialOrders.map(order => [order.id, order])
    );
  }

  byId(id: number): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return Array.from(this.orders.values());
  }

  save(order: Order): Order {
    this.orders.set(order.id, order);
    return order;
  }
}