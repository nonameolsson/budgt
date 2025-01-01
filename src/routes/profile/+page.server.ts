import { logger } from '$lib/server/logger';
import { usersService } from '$lib/server/services/usersService';
import { Type } from '@sinclair/typebox';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const FormSchema = Type.Object({
	currency: Type.String({ minLength: 3, maxLength: 3 })
});

export const load: PageServerLoad = async ({ locals }) => {
	const user = await usersService.getUser(locals.user.id);
	const form = await superValidate({ currency: user?.currency ?? '' }, typebox(FormSchema));
	return { user, form };
};

export const actions: Actions = {
	updateCurrency: async ({ request, locals }) => {
		const form = await superValidate(request, typebox(FormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await usersService.updateUserCurrency(locals.user.id, form.data.currency);
			throw redirect(303, '/profile');
		} catch (error) {
			logger.error(error);
			return fail(500, { error: 'Failed to update currency' });
		}
	}
};
