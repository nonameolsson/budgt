import { createAccount, type InsertAccount } from '$lib/server/db/accounts';
import type { Actions } from './$types';

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

		await createAccount(newAccount);
	}
};
