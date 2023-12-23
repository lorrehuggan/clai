import {
  PgColumn,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './auth';

export const statusEnum = pgEnum('status_type', [
  'draft',
  'published',
  'archived',
]);

export const document = pgTable('document', {
  id: text('id').notNull().primaryKey(),
  title: text('title').notNull(),
  body: json('body').notNull(),
  tags: json('tags'),
  folderId: text('folder_id').references(() => folder.id),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull(),
  status: statusEnum('status').notNull().default('draft'),
  meta: json('meta'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const insertDocumentSchema = createInsertSchema(document);
export const selectDocumentSchema = createSelectSchema(document);
export type Document = z.infer<typeof insertDocumentSchema>;

export const documentReference = pgTable('document_reference', {
  id: text('id').notNull().primaryKey(),
  sourceDocumentId: text('source_document_id')
    .notNull()
    .references(() => document.id),
  targetDocumentId: text('target_document_id')
    .notNull()
    .references(() => document.id),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
});

export const insertDocumentReferenceSchema =
  createInsertSchema(documentReference);
export const selectDocumentReferenceSchema =
  createSelectSchema(documentReference);
export type DocumentReference = z.infer<typeof insertDocumentReferenceSchema>;

export const attachment = pgTable('attachment', {
  id: text('id').notNull().primaryKey(),
  documentId: text('document_id')
    .notNull()
    .references(() => document.id),
  filename: text('filename').notNull(),
  url: text('url').notNull(),
});

export const insertAttachmentSchema = createInsertSchema(attachment);
export const selectAttachmentSchema = createSelectSchema(attachment);
export type Attachment = z.infer<typeof insertAttachmentSchema>;

export const tag = pgTable('tag', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull().unique(),
  // other fields like 'createdAt', 'updatedAt' can be added as needed
});

export const insertTagSchema = createInsertSchema(tag);
export const selectTagSchema = createSelectSchema(tag);
export type Tag = z.infer<typeof insertTagSchema>;

export const documentTag = pgTable('document_tag', {
  id: text('id').notNull().primaryKey(),
  documentId: text('document_id')
    .notNull()
    .references(() => document.id),
  tagId: text('tag_id')
    .notNull()
    .references(() => tag.id),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
});

export const insertDocumentTagSchema = createInsertSchema(documentTag);
export const selectDocumentTagSchema = createSelectSchema(documentTag);
export type DocumentTag = z.infer<typeof insertDocumentTagSchema>;

export const favorites = pgTable('favorites', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  documentId: text('document_id')
    .notNull()
    .references(() => document.id),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
});

export const insertFavoritesSchema = createInsertSchema(favorites);
export const selectFavoritesSchema = createSelectSchema(favorites);
export type Favorites = z.infer<typeof insertFavoritesSchema>;

export const folder = pgTable('folders', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id), // Link to the user who owns the folder
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull(),
});

export const insertFoldersSchema = createInsertSchema(folder);
export const selectFoldersSchema = createSelectSchema(folder);
export type Folders = z.infer<typeof insertFoldersSchema>;
