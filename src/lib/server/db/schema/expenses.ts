import { createId } from '@paralleldrive/cuid2';
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

export const expensesInsertSchema = createInsertSchema(expenses);

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;

export const expensesRelations = relations(expenses, ({ one }) => ({
	account: one(accounts, {
		fields: [expenses.accountId],
		references: [accounts.id]
	})
}));
