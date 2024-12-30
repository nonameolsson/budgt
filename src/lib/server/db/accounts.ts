import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '.';
import {
	accounts,
	insertAccountSchema,
	type InsertAccountSchema,
	type UpdateAccountSchema
} from './schema/accounts';
import { expenses } from './schema/expenses';

export async function createAccount(data: InsertAccountSchema) {
	const parsed = Value.Parse(insertAccountSchema, data);

	return await db.insert(accounts).values(parsed);
}

export async function getAccounts() {
	return await db.query.accounts.findMany();
}

export async function getAccount(id: string) {
	return await db.query.accounts.findFirst({ where: eq(accounts.id, id) });
}

export async function deleteAccount(id: string) {
	await db.delete(expenses).where(eq(expenses.accountId, id));
	return await db.delete(accounts).where(eq(accounts.id, id));
}

export async function updateAccount(id: string, data: UpdateAccountSchema) {
	return await db.update(accounts).set(data).where(eq(accounts.id, id));
}
