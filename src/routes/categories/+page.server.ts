import { createCategory, deleteCategory, getCategories } from '$lib/server/db/categories';
import type { InsertCategorySchema } from '$lib/server/db/schema/categories';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = await getCategories();
	return { categories };
};

export const actions: Actions = {
	createCategory: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		if (name === null) return;

		const newCategory: InsertCategorySchema = {
			name: name.toString()
		};

		await createCategory(newCategory);
	},
	deleteCategory: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await deleteCategory(String(id));
	}
};
