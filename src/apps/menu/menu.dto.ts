import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class ResponseBodyDTO_Menu {
  @IsString()
  id: string;
  name: string;

  @IsInt()
  price: number;

  @IsString()
  description: string;

  @IsDate()
  createdAt: Date;
  updatedAt: Date;
}

export class ResponseBodyDTO_MenuList {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.menus.id;
    this.name = data.menus.name;
    this.price = data.menus.price;
    this.stock = data.menus.stock;
    this.description = data.menus.description;
    this.createdAt = data.menus.createdAt;
    this.updatedAt = data.menus.updatedAt;
  }
}

export class RequestBodyDTO_CreateMenu {
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsInt()
  stock: number;

  @IsString()
  description: string;
}

export class RequestBodyDTO_UpdateMenu {
  @IsOptional()
  @IsString()
  name: string;
  price: number;

  @IsOptional()
  @IsInt()
  stock: number;

  @IsOptional()
  @IsString()
  description: string;
}
