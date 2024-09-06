import {
  ResponseBodyDTO_CreateOrder,
  ResponseBodyDTO_Order,
} from 'src/apps/order/order.dto';
import { PersistedEntity } from 'src/domains/entities/base';
import { Order } from 'src/domains/entities/order';

export class PersistedOrder extends Order implements PersistedEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    cashierId: string,
    menuId: string,
    toppingId: string,
    fillingId: string,
    customerName: string,
    quantity: number,
    totalAmount: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(
      id,
      cashierId,
      menuId,
      toppingId,
      fillingId,
      customerName,
      quantity,
      totalAmount,
      createdAt,
      updatedAt,
    );
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export abstract class RepOrder {
  abstract persist(order: Order): Promise<PersistedOrder>;

  abstract getOrderById(id: string): Promise<any>;

  abstract listOrder(query: any): Promise<ResponseBodyDTO_Order[]>;

  abstract getCashierId(userId: string): Promise<string>;

  abstract create(
    menuId: string,
    customerName: string,
    quantity: number,
    toppingId?: string,
    fillingId?: string,
  ): Promise<ResponseBodyDTO_CreateOrder>;

  abstract update(
    id: string,
    menuId: string,
    customerName: string,
    quantity: number,
    toppingId?: string,
    fillingId?: string,
  ): Promise<ResponseBodyDTO_CreateOrder>;
}
