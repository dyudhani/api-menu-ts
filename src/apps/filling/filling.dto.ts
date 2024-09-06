export class ResponseBodyDTO_Filling {
  id: string;
  menuId: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.fillings.id;
    this.menuId = data.fillings.menuId;
    this.name = data.fillings.name;
    this.price = data.fillings.price;
    this.createdAt = data.fillings.createdAt;
    this.updatedAt = data.fillings.updatedAt;
  }
}
