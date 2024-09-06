import { Module } from '@nestjs/common';
import { RepositoryModule } from './repositories/rep.module';

@Module({
  imports: [RepositoryModule],
  exports: [RepositoryModule],
})
export class ServicesModule {}
