import { db } from '$lib/server/db';
import { categories, type InsertCategory } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = await db.query.categories.findMany();
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

		await db.insert(categories).values(newCategory);
	},
	deleteCategory: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await db.delete(categories).where(eq(categories.id, Number(id)));
	}
};
