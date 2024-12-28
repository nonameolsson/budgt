import { getAccounts, updateAccount } from '$lib/server/db/accounts';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const accounts = await getAccounts();
	const account = accounts.find((acc) => acc.id === params.id);

	if (!account) {
		return fail(404);
	}

	return { account };
};

export const actions: Actions = {
	updateAccount: async ({ request, params }) => {
		const data = await request.formData();
		const name = data.get('name');
		const balance = data.get('balance');

		if (!name || !balance) {
			return fail(400);
		}

		await updateAccount(params.id, {
			name: name.toString(),
			balance: Number(balance)
		});

		redirect(303, '/accounts');
	}
};
