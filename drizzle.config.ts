import { Config } from 'drizzle-kit';

export default {
  schema: './src/infras/db/schema/*',
  out: './drizzle-db',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_CONNECTION_STRING,
  },
} satisfies Config;
