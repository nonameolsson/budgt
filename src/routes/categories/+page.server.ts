import { insertCategorySchema } from '$lib/server/db/schema';
import { categoriesService } from '$lib/server/services/categoriesService';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = await categoriesService.getCategories();
	const form = await superValidate(typebox(insertCategorySchema));

	return { categories, form };
};

export const actions: Actions = {
	deleteCategory: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await categoriesService.deleteCategory(String(id));
	}
};
