import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { UCAuthModule } from 'src/usecases/auth/auth.uc.main';
import { ErrorHandler } from '../error-handler';
import { AuthController } from './auth.controller';
import { AuthErrorHandler } from './auth.error-handler';

@Module({
  imports: [ServicesModule, UCAuthModule],
  providers: [
    UCAuthModule,
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler,
    },
  ],
  controllers: [AuthController],
})
export class AppAuthModule {}
