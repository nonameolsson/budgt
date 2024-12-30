import { createAccount } from '$lib/server/db/accounts';
import { insertAccountSchema, type InsertAccountSchema } from '$lib/server/db/schema/accounts';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const load = async () => {
	const form = await superValidate(typebox(insertAccountSchema));

	return form;
};

export const actions: Actions = {
	createAccount: async ({ request }) => {
		const form = await superValidate(request, typebox(insertAccountSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const newAccount: InsertAccountSchema = {
			name: form.data.name,
			balance: form.data.balance,
			is_primary: form.data.is_primary
		};

		await createAccount(newAccount);

		redirect(303, '/accounts');
	}
};
