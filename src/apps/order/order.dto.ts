import { IsInt, IsOptional, IsString } from 'class-validator';

export class ResponseBodyDTO_Order {
  id: string;
  cashierId: string;
  menuId: string;
  toppingId: string;
  fillingId: string;
  customerName: string;
  quantity: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.orders.id;
    this.cashierId = data.orders.cashierId;
    this.menuId = data.orders.menuId;
    this.toppingId = data.orders.toppingId;
    this.fillingId = data.orders.fillingId;
    this.customerName = data.orders.customerName;
    this.quantity = data.orders.quantity;
    this.totalAmount = data.orders.totalAmount;
    this.createdAt = data.orders.createdAt;
    this.updatedAt = data.orders.updatedAt;
  }
}

export class RequestBodyDTO_CreateOrder {
  cashierId: string;
  menuId: string;

  @IsOptional()
  toppingId: string;
  fillingId: string;

  customerName: string;
  quantity: number;

  constructor(data: any) {
    this.cashierId = data.orders.cashierId;
    this.menuId = data.orders.menuId;
    this.toppingId = data.orders.toppingId;
    this.fillingId = data.orders.fillingId;
    this.customerName = data.orders.customerName;
    this.quantity = data.orders.quantity;
  }
}

export class ResponseBodyDTO_CreateOrder {
  @IsString()
  menuId: string;

  @IsOptional()
  @IsString()
  toppingId: string;
  fillingId: string;
  customerName: string;

  @IsInt()
  quantity: number;
}
