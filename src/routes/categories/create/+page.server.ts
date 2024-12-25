import { db } from '$lib/server/db';
import type { InsertCategory } from '$lib/server/db/categories';
import { categories } from '$lib/server/db/schema';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	createCategory: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		if (name === null) return;

		const newCategory: InsertCategory = {
			name: name.toString()
		};

		await db.insert(categories).values(newCategory);
		throw redirect(303, '/categories');
	}
};
