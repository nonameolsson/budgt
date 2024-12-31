import { db } from '$lib/server/db';
import { insertExpenseSchema, type InsertExpense } from '$lib/server/db/schema/expenses';
import { categoriesService } from '$lib/server/services/categoriesService';
import { expensesService } from '$lib/server/services/expensesService';
import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const accounts = await db.query.accounts.findMany();
	const categories = await categoriesService.getCategories();
	const form = await superValidate(typebox(insertExpenseSchema), {
		defaults: {
			amount: 0,
			description: '',
			date: new Date().toISOString().split('T')[0],
			accountId: accounts.find((account) => account.is_primary)?.id ?? accounts[0]?.id ?? '',
			categoryId: categories[0]?.id ?? ''
		}
	});

	return { accounts, categories, form };
};

export const actions: Actions = {
	createExpense: async ({ request }) => {
		const form = await superValidate(request, typebox(insertExpenseSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const newExpense: InsertExpense = {
			amount: form.data.amount,
			description: form.data.description,
			date: form.data.date,
			accountId: form.data.accountId,
			categoryId: form.data.categoryId
		};

		await expensesService.createExpense(newExpense);
		redirect(303, '/expenses');
	}
};
