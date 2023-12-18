import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '~/lib/env/server';
import * as auth from './schema/auth';

const connectionString = env.DB_URL;

export const client = postgres(connectionString, {
  max: 1,
});

const db = drizzle(client, {
  schema: {
    auth,
  },
});

export default db;
