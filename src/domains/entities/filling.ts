export class Filling {
  id: string;
  menuId: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    menuId: string,
    name: string,
    price: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.menuId = menuId;
    this.name = name;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
