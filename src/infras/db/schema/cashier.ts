import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from './user';

export const cashiers = pgTable('cashiers', {
  id: varchar('id').primaryKey().notNull(),
  userId: varchar('user_id')
    .notNull()
    .references(() => users.id),
  firstName: varchar('first_name', { length: 246 }).notNull(),
  lastName: varchar('last_name', { length: 246 }).notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  }),
});
