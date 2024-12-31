import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { desc, eq } from 'drizzle-orm';
import { db } from '../db';
import { accounts, selectAccountSchema } from '../db/schema/accounts';
import {
	expenses,
	insertExpenseSchema,
	updateExpenseSchema,
	type InsertExpense,
	type UpdateExpense
} from '../db/schema/expenses';
import { logger } from '../logger';

class ExpensesService {
	async createExpense(data: InsertExpense) {
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
			await db
				.update(accounts)
				.set({ balance: newBalance })
				.where(eq(accounts.id, parsed.accountId));
		} catch (error) {
			logger.error('Error creating expense:', error);
			throw new Error('Error creating expense');
		}
	}

	async getExpenses(limit?: number) {
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

	async getExpense(id: string) {
		try {
			return await db.query.expenses.findFirst({ where: eq(expenses.id, id) });
		} catch (error) {
			logger.error('Error getting expense:', error);
			throw new Error('Error getting expense');
		}
	}

	async deleteExpense(id: string) {
		try {
			const expense = await db.query.expenses.findFirst({ where: eq(expenses.id, id) });
			const parsedExpense = Value.Parse(insertExpenseSchema, expense);

			const expenseAccount = await db.query.accounts.findFirst({
				where: eq(accounts.id, parsedExpense.accountId)
			});
			const parsedExpenseAccount = Value.Parse(selectAccountSchema, expenseAccount);
			const newBalance = parsedExpenseAccount.balance + parsedExpense.amount;

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

	async updateExpense(id: string, data: UpdateExpense) {
		try {
			const parsed = Value.Parse(updateExpenseSchema, data);
			await db.update(expenses).set(parsed).where(eq(expenses.id, id));
		} catch (error) {
			logger.error('Error updating expense:', error);
			throw new Error('Error updating expense');
		}
	}
}

export const expensesService = new ExpensesService();
