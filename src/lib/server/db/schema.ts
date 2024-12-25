import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-typebox';

// ACCOUNTS
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

export const accountsRelations = relations(accounts, ({ many }) => ({
	expenses: many(expenses)
}));

// CATEGORIES

export const categories = sqliteTable('categories', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	name: text('name').notNull()
});

// EXPENSES

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
		.notNull(),
	accountId: text('accountId').notNull()
});

export const expensesInsertSchema = createInsertSchema(expenses);

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;

export const expensesRelations = relations(expenses, ({ one }) => ({
	account: one(accounts, {
		fields: [expenses.accountId],
		references: [accounts.id]
	})
}));
