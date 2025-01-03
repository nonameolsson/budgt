import { insertUserSchema } from '$lib/server/db/schema';
import { currenciesService } from '$lib/server/services/currenciesService';
import { usersService } from '$lib/server/services/usersService';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(typebox(insertUserSchema));
	const currencies = await currenciesService.getCurrencies();

	return { currencies, form };
};

export const actions: Actions = {
	createUser: async ({ request }) => {
		const form = await superValidate(request, typebox(insertUserSchema));

		if (!form.valid) {
			return { form };
		}

		await usersService.createUser(form.data);
		return { form };
	}
};
