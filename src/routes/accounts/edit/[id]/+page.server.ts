import {
	selectAccountSchema,
	updateAccountSchema,
	type UpdateAccount
} from '$lib/server/db/schema/accounts';
import { accountService } from '$lib/server/services/accountsService';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const account = await accountService.getAccount(params.id);
	if (!account) {
		error(404);
	}

	const form = await superValidate(account, typebox(selectAccountSchema));

	if (!form.valid) {
		error(400);
	}

	return { form };
};

export const actions: Actions = {
	updateAccount: async ({ params, request }) => {
		const form = await superValidate(request, typebox(updateAccountSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const data: UpdateAccount = {
			name: form.data.name,
			balance: form.data.balance,
			is_primary: form.data.is_primary
		};
		await accountService.updateAccount(params.id, data);

		redirect(303, '/accounts');
	}
};
