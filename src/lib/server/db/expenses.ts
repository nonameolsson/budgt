import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { desc, eq } from 'drizzle-orm';
import { db } from '.';
import { accountsTable, selectAccountSchema } from './schema/accounts';
import { expensesTable, insertExpenseSchema, type InsertExpense } from './schema/expenses';

export async function getExpenses(limit?: number) {
	return await db.query.expenses.findMany({
		orderBy: desc(expensesTable.date),
		limit
	});
}

export async function createExpense(data: InsertExpense) {
	const parsed = Value.Parse(insertExpenseSchema, data);
	await db.insert(expensesTable).values(parsed);

	const currentBalance = await db
		.select({ balance: accountsTable.balance })
		.from(accountsTable)
		.where(eq(accountsTable.id, parsed.accountId))
		.get();

	const parsedCurrentBalance = Value.Parse(
		Type.Object({
			balance: Type.Number()
		}),
		currentBalance
	);
	const newBalance = parsedCurrentBalance.balance - parsed.amount;
	await db
		.update(accountsTable)
		.set({ balance: newBalance })
		.where(eq(accountsTable.id, parsed.accountId));
}

export async function deleteExpense(id: string) {
	// Get expense
	const expense = await db.query.expenses.findFirst({
		where: eq(expensesTable.id, id)
	});
	const parsedExpense = Value.Parse(insertExpenseSchema, expense);

	const expenseAccount = await db.query.accounts.findFirst({
		where: eq(accountsTable.id, parsedExpense.accountId)
	});
	const parsedExpenseAccount = Value.Parse(selectAccountSchema, expenseAccount);
	const newBalance = parsedExpenseAccount.balance + parsedExpense.amount;

	// Delete expense
	await db.delete(expensesTable).where(eq(expensesTable.id, id));

	await db
		.update(accountsTable)
		.set({ balance: newBalance })
		.where(eq(accountsTable.id, parsedExpense.accountId));
}
