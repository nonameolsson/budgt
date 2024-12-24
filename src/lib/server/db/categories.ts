import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { db } from '.';

export const categories = sqliteTable('categories', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	name: text('name').notNull()
});

export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;

export async function createCategory(data: InsertCategory) {
	return await db.insert(categories).values(data);
}

export async function getCategories() {
	console.log(' get categories');
	const data = await db.query.categories.findMany();
	console.log('data', data);
	return data;
}

export async function deleteCategory(id: string) {
	return await db.delete(categories).where(eq(categories.id, id));
}
