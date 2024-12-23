import { eq } from 'drizzle-orm';
import { db } from '.';
import { categories } from './schema';

export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;

export async function createCategory(data: InsertCategory) {
	return await db.insert(categories).values(data);
}

export async function getCategories() {
	return await db.query.categories.findMany();
}

export async function deleteCategory(id: string) {
	return await db.delete(categories).where(eq(categories.id, id));
}
