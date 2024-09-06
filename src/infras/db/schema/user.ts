import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id').primaryKey().notNull(),
  email: varchar('email', { length: 246 }).notNull(),
  password: text('password'),
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

export const accessTokens = pgTable('access_tokens', {
  id: varchar('id').primaryKey().notNull(),
  sub: varchar('sub').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const refreshTokens = pgTable('refresh_tokens', {
  id: varchar('id').primaryKey().notNull(),
  accessTokenId: varchar('access_token_id').references(() => accessTokens.id),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});
