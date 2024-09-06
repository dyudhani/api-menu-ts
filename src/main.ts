import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './apps/apps.module';
import { HttpExceptionFilter } from './nest-extensions/exception-filters';
import { ValidationPipe } from './nest-extensions/pipe';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.enableCors();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3333);
}
bootstrap();
