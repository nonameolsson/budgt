import {
	createAccount,
	deleteAccount,
	getAccounts,
	type InsertAccount
} from '$lib/server/db/accounts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const accounts = await getAccounts();

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

		await createAccount(newAccount);
	},
	deleteAccount: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await deleteAccount(String(id));
	}
};
