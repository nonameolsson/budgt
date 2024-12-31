import { db } from '$lib/server/db';
import { createExpense } from '$lib/server/services/expensesService';
import type { InsertExpense } from '$lib/server/db/schema/expenses';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const accounts = await db.query.accounts.findMany();
	const categories = await db.query.categories.findMany();
	return { accounts, categories };
};

export const actions: Actions = {
	createExpense: async ({ request }) => {
		// TODO: Use superforms
		const data = await request.formData();

		const amount = data.get('amount');
		if (amount === null) return;

		const description = data.get('description');
		if (description === null) return;

		const date = data.get('date');
		if (date === null) return;

		const accountId = data.get('accountId');
		if (accountId === null) return;

		const categoryId = data.get('categoryId');
		if (categoryId === null) return;

		const newExpense: InsertExpense = {
			amount: Number(amount),
			description: description.toString(),
			date: date.toString(),
			accountId: accountId.toString(),
			categoryId: categoryId.toString()
		};

		await createExpense(newExpense);
		redirect(303, '/expenses');
	}
};
