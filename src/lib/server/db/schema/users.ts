import { createId } from '@paralleldrive/cuid2';
import { Type, type Static } from '@sinclair/typebox';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox';

export const users = sqliteTable('users', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	username: text('username').notNull(),
	currency: text('currency').notNull(),
	createdAt: text('created_at').notNull().default(new Date().toISOString()),
	updatedAt: text('updated_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString())
});

export const insertUserSchema = createInsertSchema(users, {
	username: (schema) => Type.String({ ...schema, minLength: 5, maxLength: 20 })
});
export type InsertUser = Static<typeof insertUserSchema>;

export const selectUserSchema = createSelectSchema(users);
export type SelectUser = Static<typeof selectUserSchema>;

export const updateUserSchema = createUpdateSchema(users, {
	username: (schema) => Type.String({ ...schema, minLength: 5, maxLength: 20 })
});
export type UpdateUser = Static<typeof updateUserSchema>;
