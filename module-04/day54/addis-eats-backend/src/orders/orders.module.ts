import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller.js";
import { OrdersService, ORDER_REPOSITORY } from "./orders.service.js";
import { InMemoryOrderRepository } from "./order.repository.js";

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: ORDER_REPOSITORY,
      useFactory: () =>
        new InMemoryOrderRepository([
          {
            id: 101,
            customerName: "Abebe",
            area: "Bole",
            status: "PENDING",
            dishes: [
              { name: "Doro Wat", priceSantim: 30000 },
              { name: "Injera", priceSantim: 7000 },
            ],
            telebirrPhone: "0912345678",
            totalSantim: 37000,
          },
          {
            id: 102,
            customerName: "Hana",
            area: "Piassa",
            status: "PREPARING",
            dishes: [
              { name: "Siga Wat", priceSantim: 29000 },
            ],
            totalSantim: 29000,
          },
        ]),
    },
  ],
})
export class OrdersModule {}