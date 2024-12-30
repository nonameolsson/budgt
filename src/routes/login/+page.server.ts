import { fail, redirect } from '@sveltejs/kit';
import { getUserByUsername } from '$lib/server/db/users';
import bcrypt from 'bcrypt';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    if (!username || !password) {
      return fail(400, { message: 'Username and password are required' });
    }

    const user = await getUserByUsername(username.toString());

    if (!user) {
      return fail(400, { message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password.toString(), user.password);

    if (!passwordMatch) {
      return fail(400, { message: 'Invalid username or password' });
    }

    // Set session
    locals.user = {
      id: user.id,
      username: user.username
    };

    throw redirect(303, '/');
  }
};
