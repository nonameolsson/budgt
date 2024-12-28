import { createAccount } from '$lib/server/db/accounts';
import { accountInsertSchema, type InsertAccount } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const load = async () => {
	const form = await superValidate(typebox(accountInsertSchema), { errors: true });

	return form;
};

export const actions: Actions = {
	createAccount: async ({ request }) => {
		const form = await superValidate(request, typebox(accountInsertSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const newAccount: InsertAccount = {
			name: form.data.name,
			balance: form.data.balance
		};

		await createAccount(newAccount);

		redirect(303, '/accounts');
	}
};
