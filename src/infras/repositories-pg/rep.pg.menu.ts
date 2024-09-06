import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PersistedEntity } from 'src/domains/entities/base';
import { User } from 'src/domains/entities/user';
import { PersistedMenu, RepMenu } from 'src/services/repositories/rep.menu';
import { generateRandomString } from 'src/utils/random-string';
import { menus } from '../db/schema/menu';
import { users } from '../db/schema/user';
import { RepPG } from './rep.pg';

@Injectable()
export class RepPGMenu extends RepPG implements RepMenu {
  persist(): Promise<PersistedMenu> {
    throw new Error('Method not implemented.');
  }

  async findCashier(id: string): Promise<User & PersistedEntity> {
    const result = await this.getDBContext()
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!result.length) return null;

    return { ...result[0], authAudience: [] };
  }

  async getMenuById(id: string): Promise<any> {
    try {
      const data = await this.getDBContext()
        .select()
        .from(menus)
        .where(eq(menus.id, id))
        .limit(1);

      if (!data.length) return null;
      else return data[0];
    } catch (error) {
      throw error;
    }
  }

  async listMenu(): Promise<any> {
    try {
      const data = this.getDBContext().select().from(menus);
      if (!(await data).length) return null;
      else return data;
    } catch (error) {
      throw error;
    }
  }

  async create(
    name: string,
    price: number,
    stock: number,
    description: string,
  ): Promise<any> {
    try {
      const uniqueId = generateRandomString(10);
      const newMenu = {
        id: uniqueId,
        name: name,
        price: price,
        stock: stock,
        description: description,
        updatedAt: new Date(),
      };

      const createMenu = await this.getDBContext()
        .insert(menus)
        .values(newMenu as any)
        .returning();

      if (!createMenu) {
        throw new HttpException(
          'Failed to create new menu :',
          HttpStatus.NOT_FOUND,
        );
      }
      return createMenu;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    name: string,
    price: number,
    stock: number,
    description: string,
  ): Promise<any> {
    try {
      const updateMenu = await this.getDBContext()
        .update(menus)
        .set({
          name: name,
          price: price,
          stock: stock,
          description: description,
          updatedAt: new Date(),
        })
        .where(eq(menus.id, id))
        .returning();

      if (!updateMenu) {
        throw new HttpException(
          'Failed to update menu :',
          HttpStatus.NOT_FOUND,
        );
      }
      return updateMenu;
    } catch (error) {
      throw error;
    }
  }
}
