import {
  RequestBodyDTO_CreateMenu,
  ResponseBodyDTO_Menu,
} from 'src/apps/menu/menu.dto';
import { PersistedEntity } from 'src/domains/entities/base';
import { Menu } from 'src/domains/entities/menu';
import { User } from 'src/domains/entities/user';

export class PersistedMenu extends Menu implements PersistedEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    price: number,
    description: string,
  ) {
    super(id, name, price, description, createdAt, updatedAt);
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export abstract class RepMenu {
  abstract persist(menu: Menu): Promise<PersistedMenu>;

  abstract findCashier(id: string): Promise<User & PersistedEntity>;

  abstract getMenuById(id: string): Promise<ResponseBodyDTO_Menu>;

  abstract listMenu(): Promise<PersistedMenu[]>;

  abstract create(
    name: string,
    price: number,
    stock: number,
    description: string,
  ): Promise<RequestBodyDTO_CreateMenu>;

  abstract update(
    id: string,
    name: string,
    price: number,
    stock: number,
    description: string,
  ): Promise<any>;
}
