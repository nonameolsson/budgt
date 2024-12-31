import { createCategory } from '$lib/server/services/categoriesService';
import type { InsertCategory } from '$lib/server/db/schema/categories';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	createCategory: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		if (name === null) return;

		const newCategory: InsertCategory = {
			name: name.toString()
		};

		await createCategory(newCategory);
		redirect(303, '/categories');
	}
};
