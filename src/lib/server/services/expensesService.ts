import { Value } from '@sinclair/typebox/value';
import { Type } from '@sinclair/typebox';
import { desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { accounts, selectAccountSchema } from '$lib/server/db/schema/accounts';
import { expenses, insertExpenseSchema, type InsertExpense } from '$lib/server/db/schema/expenses';
import { logger } from '$lib/server/logger';

export async function getExpenses(limit?: number) {
	try {
		return await db.query.expenses.findMany({
			with: {
				account: true,
				category: true
			},
			orderBy: desc(expenses.date),
			limit
		});
	} catch (error) {
		logger.error('Error fetching expenses:', error);
		throw new Error('Error fetching expenses');
	}
}

export async function createExpense(data: InsertExpense) {
	try {
		const parsed = Value.Parse(insertExpenseSchema, data);
		await db.insert(expenses).values(parsed);

		const currentBalance = await db
			.select({ balance: accounts.balance })
			.from(accounts)
			.where(eq(accounts.id, parsed.accountId))
			.get();

		const parsedCurrentBalance = Value.Parse(
			Type.Object({
				balance: Type.Number()
			}),
			currentBalance
		);
		const newBalance = parsedCurrentBalance.balance - parsed.amount;
		await db.update(accounts).set({ balance: newBalance }).where(eq(accounts.id, parsed.accountId));
	} catch (error) {
		logger.error('Error creating expense:', error);
		throw new Error('Error creating expense');
	}
}

export async function deleteExpense(id: string) {
	try {
		// Get expense
		const expense = await db.query.expenses.findFirst({
			where: eq(expenses.id, id)
		});
		const parsedExpense = Value.Parse(insertExpenseSchema, expense);

		const expenseAccount = await db.query.accounts.findFirst({
			where: eq(accounts.id, parsedExpense.accountId)
		});
		const parsedExpenseAccount = Value.Parse(selectAccountSchema, expenseAccount);
		const newBalance = parsedExpenseAccount.balance + parsedExpense.amount;

		// Delete expense
		await db.delete(expenses).where(eq(expenses.id, id));

		await db
			.update(accounts)
			.set({ balance: newBalance })
			.where(eq(accounts.id, parsedExpense.accountId));
	} catch (error) {
		logger.error('Error deleting expense:', error);
		throw new Error('Error deleting expense');
	}
}
