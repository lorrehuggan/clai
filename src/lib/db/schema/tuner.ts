import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const tunerEnum = pgEnum('tuner', [
  'idea',
  'tone',
  'summary',
  'concept',
  'language',
  'brainstorm',
  'reference',
  'mindmap',
  'citation',
  'connection',
  'mood',
  'voice',
  'culture',
  'data',
  'creativewriting',
]);

export const tuner = pgTable('tuner', {
  id: text('id').notNull().primaryKey(),
  name: tunerEnum('tuner').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull(),
});

export const insertTunerSchema = createInsertSchema(tuner);
export const selectTunerSchema = createSelectSchema(tuner);
export type Tuner = z.infer<typeof insertTunerSchema>;

export const tunerAttribute = pgTable('tuner_attribute', {
  id: text('id').notNull().primaryKey(),
  tunerId: text('tuner_id')
    .notNull()
    .references(() => tuner.id),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull(),
});

export const insertTunerAttributesSchema = createInsertSchema(tunerAttribute);
export const selectTunerAttributesSchema = createSelectSchema(tunerAttribute);
export type TunerAttributes = z.infer<typeof insertTunerAttributesSchema>;
