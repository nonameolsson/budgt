import { createId } from '@paralleldrive/cuid2';
import type { Static } from '@sinclair/typebox';
import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox';
import { expensesTable } from './expenses';

export const accountsTable = sqliteTable('accounts', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	name: text('name').notNull(), // TODO: Make unique
	balance: real('balance').notNull(),
	createdAt: text('created_at')
		.notNull()
		.$defaultFn(() => new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString()),
	updatedAt: text('updated_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString()),
	is_primary: integer({ mode: 'boolean' }).notNull().default(false)
});

export const insertAccountSchema = createInsertSchema(accountsTable);
export type InsertAccount = Static<typeof insertAccountSchema>;

export const selectAccountSchema = createSelectSchema(accountsTable);
export type SelectAccount = Static<typeof selectAccountSchema>;

export const updateAccountSchema = createUpdateSchema(accountsTable);
export type UpdateAccount = Static<typeof updateAccountSchema>;

export const accountsRelations = relations(accountsTable, ({ many }) => ({
	expenses: many(expensesTable)
}));
