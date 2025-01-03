import { selectUserSchema, updateUserSchema, type UpdateUser } from '$lib/server/db/schema';

import { currenciesService } from '$lib/server/services/currenciesService';
import { usersService } from '$lib/server/services/usersService';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const userId = 'joav0k5hllvot1d9pk77np3d'; // TODO: Make this dynamic based on the user's session

export const load: PageServerLoad = async () => {
	const user = await usersService.getUser(userId);
	const currencies = await currenciesService.getCurrencies();
	const form = await superValidate(user, typebox(selectUserSchema));

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
			currency: form.data.currency
		};

		await usersService.updateUser(userId, user);

		return { form };
	}
};
