import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '.';
import { accounts, selectAccountSchema } from './schema/accounts';
import { expenses, expensesInsertSchema, type InsertExpense } from './schema/expenses';

export async function getExpenses() {
	return await db.query.expenses.findMany();
}

export async function createExpense(data: InsertExpense) {
	const parsed = Value.Parse(expensesInsertSchema, data);
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
}

export async function deleteExpense(id: string) {
	// Get expense
	const expense = await db.query.expenses.findFirst({
		where: eq(expenses.id, id)
	});
	const parsedExpense = Value.Parse(expensesInsertSchema, expense);

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
}
