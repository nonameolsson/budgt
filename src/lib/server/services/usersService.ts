import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import {
	users,
	insertUserSchema,
	updateUserSchema,
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

	async getUsers() {
		try {
			return await db.query.users.findMany();
		} catch (error) {
			logger.error('Error getting users:', error);
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

	async updateUserCurrency(id: string, currency: string) {
		try {
			const parsed = Value.Parse(updateUserSchema, { currency });
			return await db.update(users).set(parsed).where(eq(users.id, id));
		} catch (error) {
			logger.error('Error updating user currency:', error);
			throw error;
		}
	}
}

export const usersService = new UsersService();
