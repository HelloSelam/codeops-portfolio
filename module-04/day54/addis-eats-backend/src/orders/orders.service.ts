import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Order, Area } from "./order.types.js";
import type { OrderRepository } from "./order.repository.js";

export const ORDER_REPOSITORY = "ORDER_REPOSITORY";

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
  ) {}

  findAll(): Order[] {
    return this.repo.all();
  }

  find(id: number): Order {
    const order = this.repo.byId(id);

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  create(data: Omit<Order, "id">): Order {
    const orders = this.repo.all();

    const id = orders.length
      ? Math.max(...orders.map(order => order.id)) + 1
      : 1;

    return this.repo.save({ ...data, id });
  }
}