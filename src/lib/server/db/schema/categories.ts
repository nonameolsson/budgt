import { createId } from '@paralleldrive/cuid2';
import type { Static } from '@sinclair/typebox';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-typebox';

export const categoriesTable = sqliteTable('categories', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	name: text('name').notNull(), // TODO: Make unique
	createdAt: text('created_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString()),
	updatedAt: text('updated_at')
		.notNull()
		.default(new Date().toISOString())
		.$onUpdateFn(() => new Date().toISOString())
});

export const insertCategorySchema = createInsertSchema(categoriesTable);
export type InsertCategory = Static<typeof insertCategorySchema>;

export const selectCategorySchema = createInsertSchema(categoriesTable);
export type SelectCategory = Static<typeof selectCategorySchema>;

export const updateCategorySchema = createInsertSchema(categoriesTable);
export type UpdateCategory = Static<typeof updateCategorySchema>;
