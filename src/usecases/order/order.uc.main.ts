import { Injectable, Module } from '@nestjs/common';
import { QueryParam_Order } from 'src/apps/order/order.query.params';
import { Order } from 'src/domains/entities/order';
import { RepOrder } from 'src/services/repositories/rep.order';
import { ServicesModule } from 'src/services/services.module';
import { OrderNotFound } from './order.uc.error';

@Injectable()
export class UCOrder {
  constructor(private repOrder: RepOrder) {}

  async getOrderById(id: string): Promise<Order> {
    const data = await this.repOrder.getOrderById(id);
    if (data.length === 0) {
      throw new OrderNotFound('Order not found');
    }

    return data;
  }

  async listOrder(query: QueryParam_Order): Promise<Array<Order>> {
    const data = await this.repOrder.listOrder(query);
    if (data.length === 0) {
      throw new OrderNotFound('Order is empty');
    }

    return data;
  }

  async createOrder(
    menuId: string,
    customerName: string,
    quantity: number,
    toppingId?: string,
    fillingId?: string,
  ): Promise<string> {
    const data = await this.repOrder.create(
      menuId,
      customerName,
      quantity,
      toppingId,
      fillingId,
    );

    return data[0];
  }

  async getCashierId(userId: string): Promise<string> {
    return this.repOrder.getCashierId(userId);
  }

  async updateOrder(
    id: string,
    menuId: string,
    customerName: string,
    quantity: number,
    toppingId?: string,
    fillingId?: string,
  ): Promise<string> {
    const data = await this.repOrder.update(
      id,
      menuId,
      customerName,
      quantity,
      toppingId,
      fillingId,
    );

    return data[0];
  }
}

@Module({
  imports: [ServicesModule],
  providers: [UCOrder],
  exports: [UCOrder],
})
export class UCOrderModule {}
