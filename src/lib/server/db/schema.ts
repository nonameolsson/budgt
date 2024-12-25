import { createId } from '@paralleldrive/cuid2';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-typebox';

export const accounts = sqliteTable('accounts', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	name: text('name').notNull(),
	balance: real('balance').notNull()
});

export const accountInsertSchema = createInsertSchema(accounts);

export type InsertAccount = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;

export const categories = sqliteTable('categories', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	name: text('name').notNull()
});

export const expenses = sqliteTable('expenses', {
	id: text()
		.$defaultFn(() => createId())
		.primaryKey()
		.notNull(),
	amount: real('amount').notNull(),
	description: text('description'),
	date: text('date').notNull(),
	createdAt: text('created_at')
		.$defaultFn(() => new Date().toISOString())
		.notNull()
});
