import { eq } from 'drizzle-orm';
import { db } from '.';
import { expenses } from './schema';

export type InsertExpense = typeof expenses.$inferInsert;
export type SelectExpense = typeof expenses.$inferSelect;

export async function getExpenses() {
	return await db.query.expenses.findMany();
}

export async function createExpense(data: InsertExpense) {
	return await db.insert(expenses).values(data);
}

export async function deleteExpense(id: string) {
	return await db.delete(expenses).where(eq(expenses.id, id));
}
