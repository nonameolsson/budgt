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

	const existingPrimaryAccount = await db.query.accounts.findFirst({
		where: eq(accounts.is_primary, true)
	});

	if (!existingPrimaryAccount) {
		parsed.is_primary = true;
	}

	if (parsed.is_primary) {
		await db.update(accounts).set({ is_primary: false }).where(eq(accounts.is_primary, true));
	}

	return await db.insert(accounts).values(parsed);
}

export async function getAccounts() {
	return await db.query.accounts.findMany();
}

export async function getAccount(id: string) {
	return await db.query.accounts.findFirst({ where: eq(accounts.id, id) });
}

export async function deleteAccount(id: string) {
	const accountToDelete = await db.query.accounts.findFirst({ where: eq(accounts.id, id) });

	if (accountToDelete?.is_primary) {
		const otherAccount = await db.query.accounts.findFirst({
			where: eq(accounts.is_primary, false)
		});

		if (otherAccount) {
			await db.update(accounts).set({ is_primary: true }).where(eq(accounts.id, otherAccount.id));
		}
	}

	await db.delete(expenses).where(eq(expenses.accountId, id));
	return await db.delete(accounts).where(eq(accounts.id, id));
}

export async function updateAccount(id: string, data: UpdateAccountSchema) {
	await db.update(accounts).set({ is_primary: false }).where(eq(accounts.is_primary, true));
	return await db.update(accounts).set(data).where(eq(accounts.id, id));
}
