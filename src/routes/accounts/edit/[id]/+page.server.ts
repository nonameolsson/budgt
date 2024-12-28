import { getAccount, updateAccount } from '$lib/server/db/accounts';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const accounts = await getAccount(params.id);
	const account = accounts.find((acc) => acc.id === params.id);

	if (!account) {
		return error(404);
	}

	return { account };
};

export const actions = {
	updateAccount: async ({ request, params }) => {
		const data = await request.formData();
		const name = data.get('name');
		const balance = data.get('balance');

		if (!name || !balance) {
			return fail(400);
		}

		if (!params.id) {
			return fail(400);
		}

		await updateAccount(params.id, {
			name: name.toString(),
			balance: Number(balance)
		});

		throw redirect(303, '/accounts');
	}
} satisfies Actions;
