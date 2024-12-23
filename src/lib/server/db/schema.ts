import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	age: integer('age').notNull(),
	email: text('email').unique().notNull()
});

export const expenses = sqliteTable('expenses', {
	id: integer('id').primaryKey(),
	amount: real('amount').notNull(),
	description: text('description').notNull(),
	date: text('date').notNull()
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;
