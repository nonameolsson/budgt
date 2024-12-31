import { accountService } from '$lib/server/services/accountsService';
import { Type } from '@sinclair/typebox';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const FormSchema = Type.Object({
	id: Type.String()
});

export const load: PageServerLoad = async () => {
	const accounts = await accountService.getAccounts();

	return { accounts };
};

export const actions: Actions = {
	deleteAccount: async ({ request }) => {
		const form = await superValidate(request, typebox(FormSchema));

		await accountService.deleteAccount(form.data.id);
		redirect(303, '/accounts');
	}
} satisfies Actions;
