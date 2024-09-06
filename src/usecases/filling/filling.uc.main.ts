import { Injectable, Module } from '@nestjs/common';
import { QueryParam_Filling } from 'src/apps/filling/filling.query.params';
import { Filling } from 'src/domains/entities/filling';
import { RepFilling } from 'src/services/repositories/rep.filling';
import { ServicesModule } from 'src/services/services.module';
import { FillingNotFound } from './filling.uc.errors';

@Injectable()
export class UCFilling {
  constructor(private repFilling: RepFilling) {}

  async getFilling(id: string): Promise<Filling> {
    const data = await this.repFilling.getFillingById(id);
    if (!data) {
      throw new FillingNotFound('Filling Not Found');
    }

    return data;
  }

  async listFilling(query: QueryParam_Filling): Promise<Array<Filling>> {
    const listFilling = await this.repFilling.listFilling(query);

    if (listFilling.length === 0) {
      throw new FillingNotFound('Filling is empty');
    }

    if (!listFilling) {
      throw new FillingNotFound('Filling Not Found');
    }

    return listFilling;
  }
}

@Module({
  imports: [ServicesModule],
  providers: [UCFilling],
  exports: [UCFilling],
})
export class UCFillingModule {}
