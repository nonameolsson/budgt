import { currenciesService } from '$lib/server/services/currenciesService';
import { usersService } from '$lib/server/services/usersService';
import { Type } from '@sinclair/typebox';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const FormSchema = Type.Object({
	username: Type.String(),
	currency: Type.String()
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(typebox(FormSchema));
	const currencies = await currenciesService.getCurrencies();

	return { currencies, form };
};

export const actions: Actions = {
	createUser: async ({ request }) => {
		const form = await superValidate(request, typebox(FormSchema));

		if (!form.valid) {
			return { form };
		}

		await usersService.createUser(form.data);
		return { form };
	}
};
