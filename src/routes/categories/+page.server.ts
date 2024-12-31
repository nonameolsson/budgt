import type { InsertCategory } from '$lib/server/db/schema/categories';
import { categoriesService } from '$lib/server/services/categoriesService';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = await categoriesService.getCategories();
	return { categories };
};

export const actions: Actions = {
	createCategory: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		if (name === null) return;

		const newCategory: InsertCategory = {
			name: name.toString()
		};

		await categoriesService.createCategory(newCategory);
	},
	deleteCategory: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await categoriesService.deleteCategory(String(id));
	}
};
