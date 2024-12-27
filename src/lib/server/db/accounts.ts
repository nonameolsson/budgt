import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '.';
import { accountInsertSchema, accounts, type InsertAccount } from './schema';
import { expenses } from './schema';

export async function createAccount(data: InsertAccount) {
	const parsed = Value.Parse(accountInsertSchema, data);

	return await db.insert(accounts).values(parsed);
}

export async function getAccounts() {
	return await db.query.accounts.findMany();
}

export async function deleteAccount(id: string) {
	await db.delete(expenses).where(eq(expenses.accountId, id));
	return await db.delete(accounts).where(eq(accounts.id, id));
}
