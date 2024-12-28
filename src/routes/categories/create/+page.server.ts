import { db } from '$lib/server/db';
import { categories, type InsertCategory } from '$lib/server/db/schema';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(typebox(categories), { errors: true });
	return { form };
};

export const actions: Actions = {
	createCategory: async ({ request }) => {
		const form = await superValidate(request, typebox(categories));

		if (!form.valid) {
			return fail(400, { form });
		}

		const newCategory: InsertCategory = {
			name: form.data.name
		};

		await db.insert(categories).values(newCategory);
		redirect(303, '/categories');
	}
};
