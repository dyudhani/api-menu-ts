import { plainToClass } from 'class-transformer';
import { IsDefined, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsDefined()
  DB_CONNECTION_STRING: string;
}

export function validateConfig(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  let index = 0;
  for (const error of errors) {
    Object.values(error.constraints).map((str) => {
      ++index;
      console.log(`Error ${index}: ${str}`);
    });
  }
  if (errors.length) {
    throw new Error('Config validation failed');
  }

  return finalConfig;
}
