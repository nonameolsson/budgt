import { eq } from 'drizzle-orm';
import { db } from '.';
import { categoriesTable, type InsertCategory } from './schema/categories';
import { expensesTable } from './schema/expenses';

export async function createCategory(data: InsertCategory) {
	return await db.insert(categoriesTable).values(data);
}

export async function getCategories() {
	return await db.query.categories.findMany();
}

export async function deleteCategory(id: string) {
	await db.delete(expensesTable).where(eq(expensesTable.categoryId, id));
	return await db.delete(categoriesTable).where(eq(categoriesTable.id, id));
}
