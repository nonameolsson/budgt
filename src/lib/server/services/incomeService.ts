import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { desc, eq } from 'drizzle-orm';
import { db } from '../db';
import { accounts, selectAccountSchema } from '../db/schema/accounts';
import {
	income,
	insertIncomeSchema,
	updateIncomeSchema,
	type InsertIncome,
	type UpdateIncome
} from '../db/schema/income';
import { logger } from '../logger';

class IncomeService {
	async createIncome(data: InsertIncome) {
		try {
			const parsed = Value.Parse(insertIncomeSchema, data);

			await db.insert(income).values(parsed);

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
			const newBalance = parsedCurrentBalance.balance + parsed.amount;
			await db
				.update(accounts)
				.set({ balance: newBalance })
				.where(eq(accounts.id, parsed.accountId));
		} catch (error) {
			logger.error('Error creating income:', error);
			throw new Error('Error creating income');
		}
	}

	async getIncomes(limit?: number) {
		try {
			return await db.query.income.findMany({
				with: {
					account: true,
					category: true
				},
				orderBy: desc(income.date),
				limit
			});
		} catch (error) {
			logger.error('Error fetching incomes:', error);
			throw new Error('Error fetching incomes');
		}
	}

	async getIncome(id: string) {
		try {
			return await db.query.income.findFirst({ where: eq(income.id, id) });
		} catch (error) {
			logger.error('Error getting income:', error);
			throw new Error('Error getting income');
		}
	}

	async deleteIncome(id: string) {
		try {
			const incomeRecord = await db.query.income.findFirst({ where: eq(income.id, id) });
			const parsedIncome = Value.Parse(insertIncomeSchema, incomeRecord);

			const incomeAccount = await db.query.accounts.findFirst({
				where: eq(accounts.id, parsedIncome.accountId)
			});
			const parsedIncomeAccount = Value.Parse(selectAccountSchema, incomeAccount);
			const newBalance = parsedIncomeAccount.balance - parsedIncome.amount;

			await db.delete(income).where(eq(income.id, id));
			await db
				.update(accounts)
				.set({ balance: newBalance })
				.where(eq(accounts.id, parsedIncome.accountId));
		} catch (error) {
			logger.error('Error deleting income:', error);
			throw new Error('Error deleting income');
		}
	}

	async updateIncome(id: string, data: UpdateIncome) {
		try {
			const parsed = Value.Parse(updateIncomeSchema, data);

			await db.update(income).set(parsed).where(eq(income.id, id));
		} catch (error) {
			logger.error('Error updating income:', error);
			throw new Error('Error updating income');
		}
	}
}

export const incomeService = new IncomeService();
