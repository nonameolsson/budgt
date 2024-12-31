import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { categories, insertCategorySchema, type InsertCategory } from '../db/schema/categories';
import { expenses } from '../db/schema/expenses';
import { logger } from '../logger';

class CategoriesService {
	async createCategory(data: InsertCategory) {
		try {
			const parsed = Value.Parse(insertCategorySchema, data);
			return await db.insert(categories).values(parsed);
		} catch (error) {
			logger.error('Error creating category:', error);
			throw error;
		}
	}

	async getCategories() {
		try {
			return await db.query.categories.findMany();
		} catch (error) {
			logger.error('Error getting categories:', error);
			throw error;
		}
	}

	async deleteCategory(id: string) {
		try {
			await db.delete(expenses).where(eq(expenses.categoryId, id));
			return await db.delete(categories).where(eq(categories.id, id));
		} catch (error) {
			logger.error('Error deleting category:', error);
			throw error;
		}
	}
}

export const categoriesService = new CategoriesService();
