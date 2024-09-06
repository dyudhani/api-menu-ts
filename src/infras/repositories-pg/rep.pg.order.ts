import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { and, eq, SQL } from 'drizzle-orm';
import { ResponseBodyDTO_Order } from 'src/apps/order/order.dto';
import { QueryParam_Order } from 'src/apps/order/order.query.params';
import { PersistedOrder, RepOrder } from 'src/services/repositories/rep.order';
import { generateRandomString } from 'src/utils/random-string';
import { cashiers } from '../db/schema/cashier';
import { fillings } from '../db/schema/filling';
import { menus } from '../db/schema/menu';
import { orders } from '../db/schema/order';
import { toppings } from '../db/schema/topping';
import { RepPG } from './rep.pg';

@Injectable()
export class RepPGOrder extends RepPG implements RepOrder {
  persist(): Promise<PersistedOrder> {
    throw new Error('Method not implemented.');
  }

  async getOrderById(id: string): Promise<any> {
    const data = await this.getDBContext()
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1);

    if (!data.length) {
      throw new HttpException('Order not found', 404);
    }

    return { ...data[0] };
  }

  async listOrder(query: QueryParam_Order): Promise<ResponseBodyDTO_Order[]> {
    const whereQuery: SQL[] = [];

    const queryFields = {
      id: orders.id,
      menu_id: orders.menuId,
    };

    for (const key in queryFields) {
      if (query[key]) {
        whereQuery.push(eq(queryFields[key], query[key]));
      }
    }

    const data = await this.getDBContext()
      .select()
      .from(orders)
      .leftJoin(menus, eq(menus.id, orders.menuId))
      .where(and(...whereQuery));

    const filteredResponseDTO = [];

    for (const event of data) {
      const dto = new ResponseBodyDTO_Order(event);
      filteredResponseDTO.push(dto);
    }

    return filteredResponseDTO;
  }

  async create(
    menuId: string,
    customerName: string,
    quantity: number,
    toppingId?: string,
    fillingId?: string,
  ): Promise<any> {
    try {
      const menu = await this.getDBContext()
        .select()
        .from(menus)
        .where(eq(menus.id, menuId))
        .limit(1);
      if (!menu.length) {
        throw new HttpException('Menu not found', 404);
      }

      const firstItemPrice = Number(menu[0].price);

      const addOns = { topping: null, filling: null };
      let totalAmount = 0;

      const isNotNull = toppingId && fillingId ? true : false;
      if (isNotNull) {
        throw new HttpException('Please choose just one add-on', 400);
      }

      if (toppingId) {
        const topping = await this.getDBContext()
          .select()
          .from(toppings)
          .leftJoin(menus, eq(toppings.menuId, menus.id))
          .where(and(eq(toppings.id, toppingId), eq(menus.id, menuId)))
          .limit(1);
        if (!topping) {
          throw new HttpException('Topping not found', 404);
        }

        addOns.topping = Number(topping[0].toppings.price);
      }

      if (fillingId) {
        const filling = await this.getDBContext()
          .select()
          .from(fillings)
          .leftJoin(menus, eq(fillings.menuId, menus.id))
          .where(and(eq(fillings.id, fillingId), eq(menus.id, menuId)))
          .limit(1);
        if (!filling || filling.length === 0) {
          throw new HttpException('Filling not found', 404);
        }

        addOns.filling = Number(filling[0].fillings.price);
      }

      if (addOns.topping && typeof addOns.topping === 'number') {
        totalAmount += addOns.topping;
      }
      if (addOns.filling && typeof addOns.filling === 'number') {
        totalAmount += addOns.filling;
      }

      totalAmount += firstItemPrice;
      totalAmount *= quantity;

      const uniqueId = generateRandomString(10);

      const newOrder = {
        id: uniqueId,
        menuId,
        toppingId,
        fillingId,
        customerName,
        quantity,
        totalAmount,
        updatedAt: new Date(),
      };

      const createOrder = await this.getDBContext()
        .insert(orders)
        .values(newOrder as any)
        .returning();

      if (!createOrder) {
        throw new HttpException(
          'Failed to create new order :',
          HttpStatus.NOT_FOUND,
        );
      }

      return createOrder;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    menuId: string,
    customerName: string,
    quantity: number,
    toppingId?: string,
    fillingId?: string,
  ): Promise<any> {
    try {
      const menu = await this.getDBContext()
        .select()
        .from(menus)
        .where(eq(menus.id, menuId))
        .limit(1);
      if (!menu.length) {
        throw new HttpException('Menu not found', 404);
      }

      const firstItemPrice = Number(menu[0].price);

      const addOns = { topping: null, filling: null };
      let totalAmount = 0;

      const isNotNull = toppingId && fillingId ? true : false;
      if (isNotNull) {
        throw new HttpException('Please choose just one add-on', 400);
      }

      if (toppingId) {
        const topping = await this.getDBContext()
          .select()
          .from(toppings)
          .leftJoin(menus, eq(toppings.menuId, menus.id))
          .where(and(eq(toppings.id, toppingId), eq(menus.id, menuId)))
          .limit(1);
        if (!topping) {
          throw new HttpException('Topping not found', 404);
        }

        addOns.topping = Number(topping[0].toppings.price);
      }

      if (fillingId) {
        const filling = await this.getDBContext()
          .select()
          .from(fillings)
          .leftJoin(menus, eq(fillings.menuId, menus.id))
          .where(and(eq(fillings.id, fillingId), eq(menus.id, menuId)))
          .limit(1);
        if (!filling || filling.length === 0) {
          throw new HttpException('Filling not found', 404);
        }

        addOns.filling = Number(filling[0].fillings.price);
      }

      if (addOns.topping && typeof addOns.topping === 'number') {
        totalAmount += addOns.topping;
      }
      if (addOns.filling && typeof addOns.filling === 'number') {
        totalAmount += addOns.filling;
      }

      totalAmount += firstItemPrice;
      totalAmount *= quantity;

      const updatedOrder = {
        id,
        menuId,
        toppingId,
        fillingId,
        customerName,
        quantity,
        totalAmount,
        updatedAt: new Date(),
      };

      const updateOrder = await this.getDBContext()
        .update(orders)
        .set(updatedOrder as any)
        .where(eq(orders.id, id))
        .returning();

      if (!updateOrder) {
        throw new HttpException(
          'Failed to update order :',
          HttpStatus.NOT_FOUND,
        );
      }

      return updateOrder;
    } catch (error) {
      throw error;
    }
  }

  async getCashierId(userId: string): Promise<string> {
    try {
      const data = await this.getDBContext()
        .select()
        .from(cashiers)
        .where(eq(cashiers.userId, userId))
        .limit(1);

      if (!data.length) return null;
      else return data[0].id;
    } catch (error) {
      throw error;
    }
  }
}
