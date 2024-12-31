import { accountService } from '$lib/server/services/accountsService';
import { Type } from '@sinclair/typebox';
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
		console.log(form);
		await accountService.deleteAccount(form.data.id);
	}
} satisfies Actions;
