import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { UCFillingModule } from 'src/usecases/filling/filling.uc.main';
import { ErrorHandler } from '../error-handler';
import { FillingController } from './filling.controller';

@Module({
  imports: [ServicesModule, UCFillingModule],
  providers: [
    UCFillingModule,
    {
      provide: ErrorHandler,
      useClass: FillingController,
    },
  ],
  controllers: [FillingController],
})
export class AppFillingModule {}
