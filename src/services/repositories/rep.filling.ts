import { ResponseBodyDTO_Filling } from 'src/apps/filling/filling.dto';
import { PersistedEntity } from 'src/domains/entities/base';
import { Filling } from 'src/domains/entities/filling';

export class PersistedFilling extends Filling implements PersistedEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    menuId: string,
    name: string,
    price: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, menuId, name, price, createdAt, updatedAt);
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export abstract class RepFilling {
  abstract persist(topping: Filling): Promise<PersistedFilling>;

  abstract getFillingById(id: string): Promise<ResponseBodyDTO_Filling>;

  abstract listFilling(query): Promise<ResponseBodyDTO_Filling[]>;
}
