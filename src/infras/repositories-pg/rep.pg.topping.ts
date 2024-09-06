import { Injectable } from '@nestjs/common';
import { and, eq, SQL } from 'drizzle-orm';
import { ResponseBodyDTO_Topping } from 'src/apps/topping/topping.dto';
import { QueryParam_Topping } from 'src/apps/topping/topping.query.params';
import {
  PersistedTopping,
  RepTopping,
} from 'src/services/repositories/rep.topping';
import { menus } from '../db/schema/menu';
import { toppings } from '../db/schema/topping';
import { RepPG } from './rep.pg';

@Injectable()
export class RepPGTopping extends RepPG implements RepTopping {
  persist(): Promise<PersistedTopping> {
    throw new Error('Method not implemented.');
  }

  async getToppingById(id: string): Promise<any> {
    try {
      const data = await this.getDBContext()
        .select()
        .from(toppings)
        .where(eq(toppings.id, id))
        .limit(1);

      if (!data.length) return null;
      else return data[0];
    } catch (error) {
      throw error;
    }
  }

  async listTopping(
    query: QueryParam_Topping,
  ): Promise<ResponseBodyDTO_Topping[]> {
    const whereQuery: SQL[] = [];

    const queryFields = {
      id: toppings.id,
      menu_id: toppings.menuId,
    };

    for (const key in queryFields) {
      if (query[key]) {
        whereQuery.push(eq(queryFields[key], query[key]));
      }
    }
    console.log('line 49: ', whereQuery);

    const response = await this.getDBContext()
      .select()
      .from(toppings)
      .leftJoin(menus, eq(menus.id, toppings.menuId))
      .where(and(...whereQuery));

    const filteredResponseDTO = [];

    for (const event of response) {
      const dto = new ResponseBodyDTO_Topping(event);
      filteredResponseDTO.push(dto);
    }
    return filteredResponseDTO;
  }
}
