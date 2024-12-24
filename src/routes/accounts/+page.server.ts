import { db } from '$lib/server/db';
import { accounts, type InsertAccount } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const accounts = await db.query.accounts.findMany();
	return { accounts };
};

export const actions: Actions = {
	createAccount: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		if (name === null) return;

		const balance = data.get('balance');
		if (balance === null) return;

		const newAccount: InsertAccount = {
			name: name.toString(),
			balance: Number(balance)
		};

		await db.insert(accounts).values(newAccount);
	},
	deleteAccount: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await db.delete(accounts).where(eq(accounts.id, Number(id)));
	}
};
