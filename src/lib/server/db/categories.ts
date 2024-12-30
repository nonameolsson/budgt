import { eq } from 'drizzle-orm';
import { db } from '.';
import { categories, type InsertCategory } from './schema/categories';
import { expenses } from './schema/expenses';

export async function createCategory(data: InsertCategory) {
	return await db.insert(categories).values(data);
}

export async function getCategories() {
	return await db.query.categories.findMany();
}

export async function deleteCategory(id: string) {
	await db.delete(expenses).where(eq(expenses.categoryId, id));
	return await db.delete(categories).where(eq(categories.id, id));
}
