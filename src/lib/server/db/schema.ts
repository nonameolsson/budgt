import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const expenses = sqliteTable('expenses', {
	id: integer('id').primaryKey(),
	amount: real('amount').notNull(),
	description: text('description'),
	date: text('date').notNull()
});

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;

export const accounts = sqliteTable('accounts', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	balance: real('balance').notNull()
});

export type InsertAccount = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;

export const categories = sqliteTable('categories', {
	id: integer('id').primaryKey(),
	name: text('name').notNull()
});
export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;
