import { superValidate } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { getAccount, updateAccount } from '$lib/server/db/accounts';
import { accountInsertSchema, type InsertAccount } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const account = await getAccount(params.id);
	const form = await superValidate(account[0], accountInsertSchema);

	return { form };
};

export const actions: Actions = {
	updateAccount: async ({ request, params }) => {
		const form = await superValidate(request, accountInsertSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const updatedAccount: Partial<InsertAccount> = {
			name: form.data.name,
			balance: form.data.balance
		};

		await updateAccount(params.id, updatedAccount);

		redirect(303, '/accounts');
	}
};
