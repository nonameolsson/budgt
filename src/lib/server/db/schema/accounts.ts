import { createId } from '@paralleldrive/cuid2';
import type { Static } from '@sinclair/typebox';
import { relations } from 'drizzle-orm';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox';
import { expenses } from './expenses';

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

export const insertAccountSchema = createInsertSchema(accounts);
export type InsertAccountSchema = Static<typeof insertAccountSchema>;
export const selectAccountSchema = createSelectSchema(accounts);
export type SelectAccountSchema = Static<typeof selectAccountSchema>;
export const updateAccountSchema = createUpdateSchema(accounts);
export type UpdateAccountSchema = Static<typeof updateAccountSchema>;

export const accountsRelations = relations(accounts, ({ many }) => ({
	expenses: many(expenses)
}));
