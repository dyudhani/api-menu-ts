import {
  integer,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const menus = pgTable('menus', {
  id: varchar('id').primaryKey().notNull(),
  name: varchar('name').notNull(),
  price: real('price').notNull(),
  stock: integer('stock').notNull(),
  description: text('description'),
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
