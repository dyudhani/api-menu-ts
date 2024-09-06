export class Order {
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
    this.id = id;
    this.cashierId = cashierId;
    this.menuId = menuId;
    this.toppingId = toppingId;
    this.fillingId = fillingId;
    this.customerName = customerName;
    this.quantity = quantity;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
