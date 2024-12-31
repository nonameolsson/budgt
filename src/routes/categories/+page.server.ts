import { insertCategorySchema, type InsertCategory } from '$lib/server/db/schema/categories';
import { categoriesService } from '$lib/server/services/categoriesService';
import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = await categoriesService.getCategories();
	const form = await superValidate(typebox(insertCategorySchema));

	return { categories, form };
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
	},
	deleteCategory: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await categoriesService.deleteCategory(String(id));
	}
};
