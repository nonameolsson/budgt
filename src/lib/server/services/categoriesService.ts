import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import {
	categories,
	insertCategorySchema,
	updateCategorySchema,
	type InsertCategory,
	type UpdateCategory
} from '../db/schema/categories';
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

	async getCategory(id: string) {
		try {
			return await db.query.categories.findFirst({ where: eq(categories.id, id) });
		} catch (error) {
			logger.error('Error getting category:', error);
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

	async updateCategory(id: string, data: UpdateCategory) {
		try {
			const parsed = Value.Parse(updateCategorySchema, data);
			return await db.update(categories).set(parsed).where(eq(categories.id, id));
		} catch (error) {
			logger.error('Error updating category:', error);
			throw error;
		}
	}
}

export const categoriesService = new CategoriesService();
