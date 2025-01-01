import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import {
	insertUserSchema,
	updateUserSchema,
	users,
	type InsertUser,
	type UpdateUser
} from '../db/schema/users';
import { logger } from '../logger';

class UsersService {
	async createUser(data: InsertUser) {
		try {
			const parsed = Value.Parse(insertUserSchema, data);
			return await db.insert(users).values(parsed);
		} catch (error) {
			logger.error('Error creating user:', error);
			throw error;
		}
	}

	async getUser(id: string) {
		try {
			return await db.query.users.findFirst({ where: eq(users.id, id) });
		} catch (error) {
			logger.error('Error getting user:', error);
			throw error;
		}
	}

	async updateUser(id: string, data: UpdateUser) {
		try {
			const parsed = Value.Parse(updateUserSchema, data);
			return await db.update(users).set(parsed).where(eq(users.id, id));
		} catch (error) {
			logger.error('Error updating user:', error);
			throw error;
		}
	}

	async updateUserCurrency(userId: string, currency: string) {
		try {
			// Validate the currency code
			if (!/^[A-Z]{3}$/.test(currency)) {
				throw new Error('Invalid currency code');
			}

			return await db.update(users).set({ currency }).where(eq(users.id, userId));
		} catch (error) {
			logger.error('Error updating user currency:', error);
			throw error;
		}
	}
}

export const usersService = new UsersService();
