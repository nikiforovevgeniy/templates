import { defineRelations } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';

if (!process.env.NUXT_DATABASE_URL) {
  throw new Error('NUXT_DATABASE_URL не задан');
}

export const db = drizzle(process.env.NUXT_DATABASE_URL, {
  relations: defineRelations(schema),
});
