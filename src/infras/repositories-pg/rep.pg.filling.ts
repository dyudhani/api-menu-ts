import { Injectable } from '@nestjs/common';
import { and, eq, SQL } from 'drizzle-orm';
import { ResponseBodyDTO_Filling } from 'src/apps/filling/filling.dto';
import { QueryParam_Filling } from 'src/apps/filling/filling.query.params';
import {
  PersistedFilling,
  RepFilling,
} from 'src/services/repositories/rep.filling';
import { fillings } from '../db/schema/filling';
import { menus } from '../db/schema/menu';
import { RepPG } from './rep.pg';

@Injectable()
export class RepPGFilling extends RepPG implements RepFilling {
  persist(): Promise<PersistedFilling> {
    throw new Error('Method not implemented.');
  }

  async getFillingById(id: string): Promise<any> {
    try {
      const data = await this.getDBContext()
        .select()
        .from(fillings)
        .where(eq(fillings.id, id))
        .limit(1);

      if (!data.length) return null;
      else return data[0];
    } catch (error) {
      throw error;
    }
  }

  async listFilling(
    query: QueryParam_Filling,
  ): Promise<ResponseBodyDTO_Filling[]> {
    const whereQuery: SQL[] = [];

    const queryFields = {
      id: fillings.id,
      menu_id: fillings.menuId,
    };

    for (const key in queryFields) {
      if (query[key]) {
        whereQuery.push(eq(queryFields[key], query[key]));
      }
    }

    const data = await this.getDBContext()
      .select()
      .from(fillings)
      .leftJoin(menus, eq(menus.id, fillings.menuId))
      .where(and(...whereQuery));

    const filteredResponseDTO = [];

    for (const event of data) {
      const dto = new ResponseBodyDTO_Filling(event);
      filteredResponseDTO.push(dto);
    }

    if (!filteredResponseDTO) return null;

    return filteredResponseDTO;
  }
}
