import { db } from '$lib/server/db';
import { categories, type InsertCategory } from '$lib/server/db/categories';
import type { Actions } from './$types';

export const actions: Actions = {
	createCategory: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		if (name === null) return;

		const newCategory: InsertCategory = {
			name: name.toString()
		};

		await db.insert(categories).values(newCategory);
	}
};
