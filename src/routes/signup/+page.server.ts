import { fail, redirect } from '@sveltejs/kit';
import { createUser } from '$lib/server/db/users';
import bcrypt from 'bcrypt';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  signup: async ({ request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');

    if (!username || !email || !password) {
      return fail(400, { message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    await createUser({
      username: username.toString(),
      email: email.toString(),
      password: hashedPassword
    });

    throw redirect(303, '/login');
  }
};
