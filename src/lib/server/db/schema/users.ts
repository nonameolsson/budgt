import { createId } from '@paralleldrive/cuid2';
import { Type, type Static } from '@sinclair/typebox';
import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox';
import { currencies } from './currencies';

export const users = sqliteTable('users', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	username: text('username').notNull(),
	currencyCode: text('currency_code').notNull(),
	createdAt: text('created_at').notNull().default(new Date().toISOString()),
	updatedAt: text('updated_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString())
});

export const usersRelations = relations(users, ({ one }) => ({
	currency: one(currencies, {
		fields: [users.currencyCode],
		references: [currencies.code]
	})
}));

export const insertUserSchema = createInsertSchema(users, {
	username: (schema) => Type.String({ ...schema, minLength: 5, maxLength: 20 })
});
export type InsertUser = Static<typeof insertUserSchema>;

export const selectUserSchema = createSelectSchema(users);
export type SelectUser = Static<typeof selectUserSchema>;

export const updateUserSchema = createUpdateSchema(users, {
	username: (schema) => Type.String({ ...schema, minLength: 5, maxLength: 20 })
});
export type UpdateUser = Static<typeof updateUserSchema>;
