import { ExtractTablesWithRelations } from 'drizzle-orm';
import * as cashierSchema from './schema/cashier';
import * as fillingSchema from './schema/filling';
import * as menuSchema from './schema/menu';
import * as orderSchema from './schema/order';
import * as toppingSchema from './schema/topping';
import * as userSchema from './schema/user';

import { Injectable, Module, Scope } from '@nestjs/common';
import {
  drizzle,
  PostgresJsDatabase,
  PostgresJsTransaction,
} from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
// import * as postgres from 'postgres';
import postgres from 'postgres';
import { config } from 'src/configs';

export type Schema = {
  users: typeof userSchema.users;
  cashiers: typeof cashierSchema.cashiers;
  fillings: typeof fillingSchema.fillings;
  toppings: typeof toppingSchema.toppings;
  menus: typeof menuSchema.menus;
  orders: typeof orderSchema.orders;
};

export type SchemaWithRelations = ExtractTablesWithRelations<Schema>;

@Injectable()
export class DB {
  db: PostgresJsDatabase<Schema>;

  constructor() {
    const migrationClient = postgres(config.DB_CONNECTION_STRING, {
      max: 1,
    });
    this.migrate(migrationClient);

    const queryClient = postgres(config.DB_CONNECTION_STRING);
    this.db = drizzle(queryClient, {
      schema: {
        ...userSchema,
        ...cashierSchema,
        ...fillingSchema,
        ...toppingSchema,
        ...menuSchema,
        ...orderSchema,
      },
    });
  }

  async migrate(migrationClient: postgres.Sql<Record<string, never>>) {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: './drizzle-db',
      migrationsTable: 'drizzle_api_menu_ts',
    });

    migrationClient.end();
  }
}

@Injectable({ scope: Scope.REQUEST })
export class DBService {
  db: PostgresJsDatabase<Schema>;
  public tx: PostgresJsTransaction<Schema, SchemaWithRelations> | null;

  constructor(private _db: DB) {
    this.db = _db.db;
  }
}

@Module({
  providers: [DBService, DB],
  exports: [DBService],
})
export class DBModule {}
