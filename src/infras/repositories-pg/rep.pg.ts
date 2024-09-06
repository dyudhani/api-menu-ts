import { Injectable } from '@nestjs/common';
import {
  PostgresJsDatabase,
  PostgresJsTransaction,
} from 'drizzle-orm/postgres-js';
import { DBService, Schema, SchemaWithRelations } from '../db/db.service';

@Injectable()
export class RepPG {
  constructor(private dbService: DBService) {}

  getDBContext():
    | PostgresJsDatabase<Schema>
    | PostgresJsTransaction<Schema, SchemaWithRelations> {
    if (this.dbService.tx) {
      return this.dbService.tx;
    }
    return this.dbService.db;
  }
}
