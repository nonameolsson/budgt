import { eq } from 'drizzle-orm';
import { db } from '.';
import { expenses, users, type InsertExpense, type InsertUser } from './schema';

export async function createUser(data: InsertUser) {
	await db.insert(users).values(data);
}

export async function createExpense(data: InsertExpense) {
	await db.insert(expenses).values(data);
}

export async function getExpensesWithUserNames() {
	const result = await db
		.select({
			id: expenses.id,
			amount: expenses.amount,
			description: expenses.description,
			date: expenses.date,
			userName: users.name
		})
		.from(expenses)
		.innerJoin(users, eq(users.id, expenses.id));

	return result;
}

export async function getUsersWithTotalExpenses() {
	const result = await db
		.select({
			id: users.id,
			name: users.name,
			age: users.age,
			email: users.email
		})
		.from(users)
		.leftJoin(expenses, eq(expenses.userId, users.id))
		.groupBy(users.id);

	return result;
}
