import { insertCategorySchema, type InsertCategory } from '$lib/server/db/schema/categories';
import { categoriesService } from '$lib/server/services/categoriesService';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const load = async () => {
	const form = await superValidate(typebox(insertCategorySchema));
	return form;
};

export const actions: Actions = {
	createCategory: async ({ request }) => {
		const form = await superValidate(request, typebox(insertCategorySchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const newCategory: InsertCategory = {
			name: form.data.name
		};

		await categoriesService.createCategory(newCategory);
		redirect(303, '/categories');
	}
};
