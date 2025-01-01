import { createId } from '@paralleldrive/cuid2';
import type { Static } from '@sinclair/typebox';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox';

export const users = sqliteTable('users', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	username: text('username').notNull(),
	currency: text('currency').notNull(),
	createdAt: text('created_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString()),
	updatedAt: text('updated_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString())
});

export const insertUserSchema = createInsertSchema(users);
export type InsertUser = Static<typeof insertUserSchema>;

export const selectUserSchema = createSelectSchema(users);
export type SelectUser = Static<typeof selectUserSchema>;

export const updateUserSchema = createUpdateSchema(users);
export type UpdateUser = Static<typeof updateUserSchema>;
