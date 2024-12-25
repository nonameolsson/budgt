import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '.';
import { expenses, expensesInsertSchema } from './schema';

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;

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
