import { selectUserSchema, updateUserSchema, type UpdateUser } from '$lib/server/db/schema';

import { currenciesService } from '$lib/server/services/currenciesService';
import { usersService } from '$lib/server/services/usersService';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const userId = 'fjds83kslsjs0vlks9dl3kaa3'; // TODO: Make this dynamic based on the user's session

export const load: PageServerLoad = async () => {
	const user = await usersService.getUser(userId);
	const currencies = await currenciesService.getCurrencies();
	const form = await superValidate(user, typebox(selectUserSchema));
	console.log(form);
	return { form, currencies };
};

export const actions: Actions = {
	updateUser: async ({ request }) => {
		const form = await superValidate(request, typebox(updateUserSchema));

		if (!form.valid) {
			return { form };
		}

		const user: UpdateUser = {
			username: form.data.username,
			currencyCode: form.data.currencyCode
		};

		await usersService.updateUser(userId, user);

		return { form };
	}
};
