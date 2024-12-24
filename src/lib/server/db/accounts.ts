import { eq } from 'drizzle-orm';
import { db } from '.';
import { accounts } from './schema';

export type InsertAccount = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;

export async function createAccount(data: InsertAccount) {
	return await db.insert(accounts).values(data);
}

export async function getAccounts() {
	return await db.query.accounts.findMany();
}

export async function deleteAccount(id: string) {
	return await db.delete(accounts).where(eq(accounts.id, id));
}
