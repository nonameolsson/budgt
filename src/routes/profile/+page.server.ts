import { currencies } from '$lib/server/db/currencies';
import { usersService } from '$lib/server/services/usersService';
import { Type } from '@sinclair/typebox';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const FormSchema = Type.Object({
	currency: Type.String()
});

export const load: PageServerLoad = async ({ params }) => {
	const user = await usersService.getUser(params.id);
	const form = await superValidate(user, typebox(FormSchema));
	return { form, currencies };
};

export const actions: Actions = {
	updateCurrency: async ({ request, params }) => {
		const form = await superValidate(request, typebox(FormSchema));

		if (!form.valid) {
			return { form };
		}

		await usersService.updateUserCurrency(params.id, form.data.currency);
		return { form };
	}
};
