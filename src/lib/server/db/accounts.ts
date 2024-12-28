import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '.';
import { accountInsertSchema, accounts, type InsertAccount } from './schema/accounts';
import { expenses } from './schema/expenses';

export async function createAccount(data: InsertAccount) {
	const parsed = Value.Parse(accountInsertSchema, data);

	return await db.insert(accounts).values(parsed);
}

export async function getAccounts() {
	return await db.query.accounts.findMany();
}

export async function getAccount(id: string) {
	return await db.select().from(accounts).where(eq(accounts.id, id));
}

export async function deleteAccount(id: string) {
	await db.delete(expenses).where(eq(expenses.accountId, id));
	return await db.delete(accounts).where(eq(accounts.id, id));
}

export async function updateAccount(id: string, data: Partial<InsertAccount>) {
	return await db.update(accounts).set(data).where(eq(accounts.id, id));
}
