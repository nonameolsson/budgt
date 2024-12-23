import { db } from '.';
import { users, type InsertUser, expenses, type InsertExpense } from './schema';

export async function createUser(data: InsertUser) {
	await db.insert(users).values(data);
}

export async function createExpense(data: InsertExpense) {
	await db.insert(expenses).values(data);
}
