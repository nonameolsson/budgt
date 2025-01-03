import { insertAccountSchema } from '$lib/server/db/schema';
import { initiateSeed, resetDatabase } from '$lib/server/db/seed';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const actions: Actions = {
	seed: async () => {
		await initiateSeed();
	},
	reset: async () => {
		await resetDatabase();
	},
	setUser: async ({ request }) => {
		const form = await superValidate(request, typebox(insertAccountSchema));
		console.log(form.data);
		// request.locals.user = user;
	}
} satisfies Actions;
