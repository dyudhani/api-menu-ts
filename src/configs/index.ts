import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { validateConfig } from './config-validate';
dotenv.config();

import * as path from 'path';

export class Configs {
  constructor(private configService: ConfigService) {}
  getEnvironment(path: string) {
    return this.configService.get(`${path}`);
  }
}

const configService = new ConfigService({
  isGlobal: true,
  validate: validateConfig,
});

const configs = new Configs(configService);

export const config = {
  DRIZZLE_MIGRATION_PATH: path.join(process.cwd(), 'drizzle-db'),
  DB_CONNECTION_STRING: configs.getEnvironment('DB_CONNECTION_STRING'),
  JWT_SECRET_KEY: configs.getEnvironment('JWT_SECRET_KEY'),
  JWT_EXPIRES: configs.getEnvironment('JWT_EXPIRES'),
};
