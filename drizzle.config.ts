import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { env } from '~/lib/env/server';

export default {
  schema: './src/lib/db/schema/*',
  out: './src/lib/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DB_URL,
  },
} satisfies Config;
