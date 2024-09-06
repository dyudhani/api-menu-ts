import {
  integer,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { fillings } from './filling';
import { menus } from './menu';
import { toppings } from './topping';

export const orders = pgTable('orders', {
  id: varchar('id').primaryKey().notNull(),
  menuId: varchar('menu_id')
    .notNull()
    .references(() => menus.id),
  toppingId: varchar('topping_id').references(() => toppings.id),
  fillingId: varchar('filling_id').references(() => fillings.id),
  customerName: varchar('customer_name').notNull(),
  quantity: integer('quantity').notNull(),
  totalAmount: numeric('total_amount').notNull(),
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
