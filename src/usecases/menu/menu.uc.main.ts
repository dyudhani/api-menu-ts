import { Injectable, Module } from '@nestjs/common';
import { PersistedEntity } from 'src/domains/entities/base';
import { Cashier } from 'src/domains/entities/cashier';
import { Menu } from 'src/domains/entities/menu';
import { RepMenu } from 'src/services/repositories/rep.menu';
import { ServicesModule } from 'src/services/services.module';
import { MenuNotFound } from './menu.uc.errors';

@Injectable()
export class UCMenu {
  constructor(private repMenu: RepMenu) {}

  async listMenu(): Promise<Array<Menu>> {
    const listMenu = await this.repMenu.listMenu();
    if (listMenu.length === 0) {
      throw new MenuNotFound('Menu is empty');
    }

    return listMenu;
  }

  async getMenu(id: string): Promise<Menu> {
    const response = await this.repMenu.getMenuById(id);
    if (!response) {
      throw new MenuNotFound('Menu not found');
    }
    return response;
  }

  async createMenu(
    cashier: Cashier & PersistedEntity,
    newData: {
      name: string;
      price: number;
      stock: number;
      description: string;
    },
  ): Promise<Cashier & PersistedEntity> {
    const user = await this.repMenu.findCashier(cashier.userId);
    if (!user) {
      throw new Error('Cashier not found');
    }

    const response = await this.repMenu.create(
      newData.name,
      newData.price,
      newData.stock,
      newData.description,
    );

    return response[0];
  }

  async updateMenu(
    id: string,
    name: string,
    price: number,
    stock: number,
    description: string,
  ): Promise<any> {
    const response = await this.repMenu.update(
      id,
      name,
      price,
      stock,
      description,
    );

    return response;
  }
}

@Module({
  imports: [ServicesModule],
  providers: [UCMenu],
  exports: [UCMenu],
})
export class UCMenuModule {}
