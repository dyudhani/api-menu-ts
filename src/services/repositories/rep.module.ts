import { Module } from '@nestjs/common';
import { DBModule } from 'src/infras/db/db.service';
import { RepPGAuth } from 'src/infras/repositories-pg/rep.pg.auth';
import { RepPGFilling } from 'src/infras/repositories-pg/rep.pg.filling';
import { RepPGMenu } from 'src/infras/repositories-pg/rep.pg.menu';
import { RepPGOrder } from 'src/infras/repositories-pg/rep.pg.order';
import { RepPGTopping } from 'src/infras/repositories-pg/rep.pg.topping';
import { RepAuth } from './rep.auth';
import { RepFilling } from './rep.filling';
import { RepMenu } from './rep.menu';
import { RepOrder } from './rep.order';
import { RepTopping } from './rep.topping';

@Module({
  imports: [DBModule],
  providers: [
    {
      provide: RepMenu,
      useClass: RepPGMenu,
    },
    {
      provide: RepTopping,
      useClass: RepPGTopping,
    },
    {
      provide: RepFilling,
      useClass: RepPGFilling,
    },
    {
      provide: RepOrder,
      useClass: RepPGOrder,
    },
    {
      provide: RepAuth,
      useClass: RepPGAuth,
    },
  ],
  exports: [RepMenu, RepTopping, RepFilling, RepOrder, RepAuth],
})
export class RepositoryModule {}
