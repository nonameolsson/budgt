import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '.';
import { expenses, expensesInsertSchema, type InsertExpense } from './schema';

export async function getExpenses() {
	return await db.query.expenses.findMany();
}

export async function createExpense(data: InsertExpense) {
	const parsed = Value.Parse(expensesInsertSchema, data);
	return await db.insert(expenses).values(parsed);
}

export async function deleteExpense(id: string) {
	return await db.delete(expenses).where(eq(expenses.id, id));
}
