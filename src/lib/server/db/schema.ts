import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox';

// ACCOUNTS
export const accounts = sqliteTable('accounts', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	name: text('name').notNull(),
	balance: real('balance').notNull(),
	createdAt: text('created_at')
		.notNull()
		.$defaultFn(() => new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString()),
	updatedAt: text('updated_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString())
});

export const accountInsertSchema = createInsertSchema(accounts);
export const accountSelectSchema = createSelectSchema(accounts);
export const accountUpdateSchema = createUpdateSchema(accounts);

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
	name: text('name').notNull(),
	createdAt: text('created_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString()),
	updatedAt: text('updated_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString())
});

export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;

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
