import { createId } from '@paralleldrive/cuid2';
import type { Static } from '@sinclair/typebox';
import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox';
import { expenses } from './expenses';

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

export const insertCategorySchema = createInsertSchema(categories);
export type InsertCategory = Static<typeof insertCategorySchema>;

export const selectCategorySchema = createSelectSchema(categories);
export type SelectCategory = Static<typeof selectCategorySchema>;

export const updateCategorySchema = createUpdateSchema(categories);
export type UpdateCategory = Static<typeof updateCategorySchema>;

export const categoriesRelations = relations(categories, ({ many }) => ({
	expenses: many(expenses)
}));
