import { updateCategorySchema } from '$lib/server/db/schema/categories';
import { categoriesService } from '$lib/server/services/categoriesService';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const category = await categoriesService.getCategory(params.id);
	const form = await superValidate(category, typebox(updateCategorySchema));

	return { form };
};

export const actions: Actions = {
	updateCategory: async ({ request, params }) => {
		const form = await superValidate(request, typebox(updateCategorySchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await categoriesService.updateCategory(params.id, form.data);
		redirect(303, '/categories');
	}
};
