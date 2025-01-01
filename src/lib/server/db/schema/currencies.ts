import type { Static } from '@sinclair/typebox';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

export const currencies = sqliteTable('currencies', {
	code: text('code').primaryKey().notNull(),
	name: text('name').notNull(),
	symbol: text('symbol').notNull()
});

export const insertCurrencySchema = createInsertSchema(currencies);
export type InsertCurrency = Static<typeof insertCurrencySchema>;

export const selectCurrencySchema = createSelectSchema(currencies);
export type SelectCurrency = Static<typeof selectCurrencySchema>;
