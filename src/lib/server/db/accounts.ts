import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { db } from '.';

export const accounts = sqliteTable('accounts', {
	id: text()
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	name: text('name').notNull(),
	balance: real('balance').notNull()
});

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
