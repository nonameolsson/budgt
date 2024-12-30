import { deleteAccount, getAccounts, setPrimaryAccount } from '$lib/server/db/accounts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const accounts = await getAccounts();

	return { accounts };
};

export const actions: Actions = {
	deleteAccount: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await deleteAccount(String(id));
	},
	setPrimaryAccount: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await setPrimaryAccount(String(id));
	}
} satisfies Actions;
