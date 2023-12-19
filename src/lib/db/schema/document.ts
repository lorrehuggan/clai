import { json, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './auth';

export const document = pgTable('document', {
  id: text('id').notNull().primaryKey(),
  title: text('title').notNull(),
  body: json('body').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const insertDocumentSchema = createInsertSchema(document);
export type Document = z.infer<typeof insertDocumentSchema>;
