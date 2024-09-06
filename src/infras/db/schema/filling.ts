import { numeric, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { menus } from './menu';

export const fillings = pgTable('fillings', {
  id: varchar('id').primaryKey().notNull(),
  menuId: varchar('menu_id')
    .notNull()
    .references(() => menus.id),
  name: varchar('name').notNull(),
  price: numeric('price').notNull(),
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
