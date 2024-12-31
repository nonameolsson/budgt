import { Value } from '@sinclair/typebox/value';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import {
	accounts,
	insertAccountSchema,
	type InsertAccount,
	type UpdateAccount
} from '../db/schema/accounts';
import { expenses } from '../db/schema/expenses';
import { logger } from '../logger';

export async function createAccount(data: InsertAccount) {
	try {
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
	} catch (error) {
		logger.error('Error creating account:', error);
		throw error;
	}
}

export async function getAccounts() {
	try {
		return await db.query.accounts.findMany();
	} catch (error) {
		logger.error('Error getting accounts:', error);
		throw error;
	}
}

export async function getAccount(id: string) {
	try {
		return await db.query.accounts.findFirst({ where: eq(accounts.id, id) });
	} catch (error) {
		logger.error('Error getting account:', error);
		throw error;
	}
}

export async function deleteAccount(id: string) {
	try {
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
	} catch (error) {
		logger.error('Error deleting account:', error);
		throw error;
	}
}

export async function updateAccount(id: string, data: UpdateAccount) {
	try {
		await db.update(accounts).set({ is_primary: false }).where(eq(accounts.is_primary, true));
		return await db.update(accounts).set(data).where(eq(accounts.id, id));
	} catch (error) {
		logger.error('Error updating account:', error);
		throw error;
	}
}
