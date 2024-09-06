import { Injectable, Module } from '@nestjs/common';
import { QueryParam_Topping } from 'src/apps/topping/topping.query.params';
import { Topping } from 'src/domains/entities/topping';
import { RepTopping } from 'src/services/repositories/rep.topping';
import { ServicesModule } from 'src/services/services.module';
import { ToppingNotFound } from './topping.uc.errors';

@Injectable()
export class UCTopping {
  constructor(private repTopping: RepTopping) {}

  async getTopping(id: string): Promise<Topping> {
    const data = await this.repTopping.getToppingById(id);
    if (!data) {
      throw new ToppingNotFound('Topping Not Found');
    }

    return data;
  }

  async listTopping(query: QueryParam_Topping): Promise<Array<Topping>> {
    const listTopping = await this.repTopping.listTopping(query);
    if (listTopping.length === 0) {
      throw new ToppingNotFound('Topping is empty');
    }

    return listTopping;
  }
}

@Module({
  imports: [ServicesModule],
  providers: [UCTopping],
  exports: [UCTopping],
})
export class UCToppingModule {}
