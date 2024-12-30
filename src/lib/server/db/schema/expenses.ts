import { createId } from '@paralleldrive/cuid2';
import type { Static } from '@sinclair/typebox';
import { relations } from 'drizzle-orm';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-typebox';
import { accountsTable } from './accounts';
import { categoriesTable } from './categories';

export const expensesTable = sqliteTable('expenses', {
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
	accountId: text('accountId').notNull(),
	categoryId: text('categoryId').notNull()
});

export const insertExpenseSchema = createInsertSchema(expensesTable);
export type InsertExpense = Static<typeof insertExpenseSchema>;

export const selectExpenseSchema = createInsertSchema(expensesTable);
export type SelectExpense = Static<typeof selectExpenseSchema>;

export const updateExpenseSchema = createInsertSchema(expensesTable);
export type UpdateExpense = Static<typeof updateExpenseSchema>;

export const expensesRelations = relations(expensesTable, ({ one }) => ({
	account: one(accountsTable, {
		fields: [expensesTable.accountId],
		references: [accountsTable.id]
	}),
	category: one(categoriesTable, {
		fields: [expensesTable.categoryId],
		references: [categoriesTable.id]
	})
}));
