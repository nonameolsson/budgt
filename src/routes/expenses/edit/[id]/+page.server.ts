import { db } from '$lib/server/db';
import { updateExpenseSchema, type UpdateExpense } from '$lib/server/db/schema/expenses';
import { categoriesService } from '$lib/server/services/categoriesService';
import { expensesService } from '$lib/server/services/expensesService';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const expense = await expensesService.getExpense(params.id);
	const accounts = await db.query.accounts.findMany();
	const categories = await categoriesService.getCategories();

	const form = await superValidate(typebox(updateExpenseSchema), {
		defaults: {
			amount: expense?.amount ?? 0,
			description: expense?.description ?? '',
			date: expense?.date ?? new Date().toISOString().split('T')[0],
			accountId:
				expense?.accountId ??
				accounts.find((account) => account.is_primary)?.id ??
				accounts[0]?.id ??
				'',
			categoryId: expense?.categoryId ?? categories[0]?.id ?? ''
		}
	});

	return { accounts, categories, form, expense };
};

export const actions: Actions = {
	editExpense: async ({ request, params }) => {
		const form = await superValidate(request, typebox(updateExpenseSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const updatedExpense: UpdateExpense = {
			amount: form.data.amount,
			description: form.data.description,
			date: form.data.date,
			accountId: form.data.accountId,
			categoryId: form.data.categoryId
		};

		await expensesService.updateExpense(params.id, updatedExpense);
		redirect(303, '/expenses');
	}
};
