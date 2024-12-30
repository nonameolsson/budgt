import { authenticateUser } from '$lib/server/db/users';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password) {
			return fail(400, { message: 'Username and password are required' });
		}

		try {
			const token = await authenticateUser(username.toString(), password.toString());
			return {
				headers: {
					'set-cookie': `jwt=${token}; Path=/; HttpOnly`
				}
			};
		} catch (error) {
			return fail(401, { message: 'Invalid username or password' });
		}
	}
};
