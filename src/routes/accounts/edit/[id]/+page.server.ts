import { getAccounts, updateAccount } from '$lib/server/db/accounts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const accounts = await getAccounts();
	const account = accounts.find((acc) => acc.id === params.id);

	if (!account) {
		return {
			status: 404,
			error: new Error('Account not found')
		};
	}

	return { account };
};

export const actions: Actions = {
	updateAccount: async ({ request, params }) => {
		const data = await request.formData();
		const name = data.get('name');
		const balance = data.get('balance');

		if (!name || !balance) {
			return {
				status: 400,
				error: new Error('Invalid input')
			};
		}

		await updateAccount(params.id, {
			name: name.toString(),
			balance: Number(balance)
		});

		return {
			status: 200
		};
	}
};
