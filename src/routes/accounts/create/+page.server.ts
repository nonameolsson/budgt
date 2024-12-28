import { createAccount } from '$lib/server/db/accounts';
import type { InsertAccount } from '$lib/server/db/schema/accounts';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	createAccount: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		if (!name) {
			return fail(400, { name, missing: true });
		}

		const balance = data.get('balance');
		if (!balance) {
			return fail(400, { balance, missing: true });
		}

		const newAccount: InsertAccount = {
			name: name.toString(),
			balance: Number(balance)
		};

		await createAccount(newAccount);

		throw redirect(303, '/accounts');
	}
};
