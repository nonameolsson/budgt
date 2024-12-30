import { createId } from '@paralleldrive/cuid2';
import type { Static } from '@sinclair/typebox';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-typebox';

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
export type InsertCategorySchema = Static<typeof insertCategorySchema>;

export const selectCategorySchema = createInsertSchema(categories);
export type SelectCategorySchema = Static<typeof selectCategorySchema>;

export const updateCategorySchema = createInsertSchema(categories);
export type UpdateCategorySchema = Static<typeof updateCategorySchema>;
