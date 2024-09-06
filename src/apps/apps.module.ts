import { Controller, Get, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from 'src/configs/config-validate';
import { DBModule } from 'src/infras/db/db.service';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { ServicesModule } from 'src/services/services.module';
import { AppAuthModule } from './auth/auth.app';
import { AppFillingModule } from './filling/filling.app';
import { AppMenuModule } from './menu/menu.app';
import { AppOrderModule } from './order/order.app';
import { AppToppingModule } from './topping/topping.app';

@Controller()
export class MainController {
  @Get()
  async check() {
    return 'server is running...';
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig,
    }),
    DBModule,
    ServicesModule,
    AppMenuModule,
    AppToppingModule,
    AppFillingModule,
    AppOrderModule,
    AppAuthModule,
  ],
  providers: [
    DBModule,
    ServicesModule,
    AppMenuModule,
    AppToppingModule,
    AppFillingModule,
    AppOrderModule,
    AppAuthModule,
  ],
  controllers: [MainController],
})
export class ApplicationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
