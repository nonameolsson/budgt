import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox';

// USERS
export const users = sqliteTable('users', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
	createdAt: text('created_at')
		.notNull()
		.$defaultFn(() => new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString()),
	updatedAt: text('updated_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString())
});

export const userInsertSchema = createInsertSchema(users);
export const userSelectSchema = createSelectSchema(users);
export const userUpdateSchema = createUpdateSchema(users);

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
