import { eq } from 'drizzle-orm';
import { db } from '../db';
import { categories, type InsertCategory } from '../db/schema/categories';
import { expenses } from '../db/schema/expenses';
import { logger } from '../logger';

export async function createCategory(data: InsertCategory) {
	try {
		return await db.insert(categories).values(data);
	} catch (error) {
		logger.error('Error creating category:', error);
		throw error;
	}
}

export async function getCategories() {
	try {
		return await db.query.categories.findMany();
	} catch (error) {
		logger.error('Error getting categories:', error);
		throw error;
	}
}

export async function deleteCategory(id: string) {
	try {
		await db.delete(expenses).where(eq(expenses.categoryId, id));
		return await db.delete(categories).where(eq(categories.id, id));
	} catch (error) {
		logger.error('Error deleting category:', error);
		throw error;
	}
}
