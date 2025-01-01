import { usersService } from '$lib/server/services/usersService';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import { Type } from '@sinclair/typebox';

const FormSchema = Type.Object({
	name: Type.String({ minLength: 1 }),
	email: Type.String({ format: 'email' }),
	currency: Type.String({ minLength: 3, maxLength: 3 })
});

export const load = async () => {
	const form = await superValidate(typebox(FormSchema));
	return { form };
};

export const actions = {
	createUser: async ({ request }) => {
		const form = await superValidate(request, typebox(FormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await usersService.createUser(form.data);
			throw redirect(303, '/users');
		} catch (error) {
			return fail(500, { error: 'Failed to create user' });
		}
	}
};
