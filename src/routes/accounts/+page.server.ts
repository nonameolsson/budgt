import { deleteAccount, getAccounts } from '$lib/server/services/accountsService';
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
	}
} satisfies Actions;
