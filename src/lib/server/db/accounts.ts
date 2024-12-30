import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '.';
import {
	accountsTable,
	insertAccountSchema,
	type InsertAccount,
	type UpdateAccount
} from './schema/accounts';
import { expensesTable } from './schema/expenses';

export async function createAccount(data: InsertAccount) {
	const parsed = Value.Parse(insertAccountSchema, data);

	const existingPrimaryAccount = await db.query.accounts.findFirst({
		where: eq(accountsTable.is_primary, true)
	});

	if (!existingPrimaryAccount) {
		parsed.is_primary = true;
	}

	if (parsed.is_primary) {
		await db
			.update(accountsTable)
			.set({ is_primary: false })
			.where(eq(accountsTable.is_primary, true));
	}

	return await db.insert(accountsTable).values(parsed);
}

export async function getAccounts() {
	return await db.query.accounts.findMany();
}

export async function getAccount(id: string) {
	return await db.query.accounts.findFirst({ where: eq(accountsTable.id, id) });
}

export async function deleteAccount(id: string) {
	const accountToDelete = await db.query.accounts.findFirst({ where: eq(accountsTable.id, id) });

	if (accountToDelete?.is_primary) {
		const otherAccount = await db.query.accounts.findFirst({
			where: eq(accountsTable.is_primary, false)
		});

		if (otherAccount) {
			await db
				.update(accountsTable)
				.set({ is_primary: true })
				.where(eq(accountsTable.id, otherAccount.id));
		}
	}

	await db.delete(expensesTable).where(eq(expensesTable.accountId, id));
	return await db.delete(accountsTable).where(eq(accountsTable.id, id));
}

export async function updateAccount(id: string, data: UpdateAccount) {
	await db
		.update(accountsTable)
		.set({ is_primary: false })
		.where(eq(accountsTable.is_primary, true));
	return await db.update(accountsTable).set(data).where(eq(accountsTable.id, id));
}
