import { createId } from '@paralleldrive/cuid2';
import type { Static } from '@sinclair/typebox';
import { relations } from 'drizzle-orm';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox';
import { accounts } from './accounts';
import { categories } from './categories';

export const income = sqliteTable('income', {
	id: text()
		.$defaultFn(() => createId())
		.primaryKey()
		.notNull(),
	amount: real('amount').notNull(),
	description: text('description'),
	date: text('date').notNull().default(new Date().toISOString()),
	createdAt: text('created_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString()),
	updatedAt: text('updated_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString()),
	accountId: text('account_id').notNull(),
	categoryId: text('category_id').notNull()
});

export const insertIncomeSchema = createInsertSchema(income);
export type InsertIncome = Static<typeof insertIncomeSchema>;

export const selectIncomeSchema = createSelectSchema(income);
export type SelectIncome = Static<typeof selectIncomeSchema>;

export const updateIncomeSchema = createUpdateSchema(income);
export type UpdateIncome = Static<typeof updateIncomeSchema>;

export const incomeRelations = relations(income, ({ one }) => ({
	account: one(accounts, {
		fields: [income.accountId],
		references: [accounts.id]
	}),
	category: one(categories, {
		fields: [income.categoryId],
		references: [categories.id]
	})
}));
