import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { db } from '.';

export const expenses = sqliteTable('expenses', {
	id: text()
		.$defaultFn(() => createId())
		.primaryKey()
		.notNull(),
	amount: real('amount').notNull(),
	description: text('description'),
	date: text('date').notNull(),
	createdAt: text('created_at')
		.$defaultFn(() => new Date().toISOString())
		.notNull()
});

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
