import { createId } from '@paralleldrive/cuid2';
import type { Static } from '@sinclair/typebox';
import { relations } from 'drizzle-orm';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-typebox';
import { accounts } from './accounts';

export const expenses = sqliteTable('expenses', {
	id: text()
		.$defaultFn(() => createId())
		.primaryKey()
		.notNull(),
	amount: real('amount').notNull(),
	description: text('description'),
	date: text('date').notNull(),
	createdAt: text('created_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString()),
	updatedAt: text('updated_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString()),
	accountId: text('accountId').notNull()
});

export const insertExpenseSchema = createInsertSchema(expenses);
export type InsertExpenseSchema = Static<typeof insertExpenseSchema>;

export const selectExpenseSchema = createInsertSchema(expenses);
export type SelectExpenseSchema = Static<typeof selectExpenseSchema>;

export const updateExpenseSchema = createInsertSchema(expenses);
export type UpdateExpenseSchema = Static<typeof updateExpenseSchema>;

export const expensesRelations = relations(expenses, ({ one }) => ({
	account: one(accounts, {
		fields: [expenses.accountId],
		references: [accounts.id]
	})
}));
