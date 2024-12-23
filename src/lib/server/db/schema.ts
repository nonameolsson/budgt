import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	age: integer('age').notNull(),
	email: text('email').unique().notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
	expenses: many(expenses)
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const expenses = sqliteTable('expenses', {
	id: integer('id').primaryKey(),
	amount: real('amount').notNull(),
	description: text('description'),
	date: text('date').notNull(),
	userId: integer('userId').notNull()
});

export const expensesRelations = relations(expenses, ({ one }) => ({
	user: one(users, {
		fields: [expenses.userId],
		references: [users.id]
	})
}));

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;
