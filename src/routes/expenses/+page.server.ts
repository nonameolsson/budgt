import { createExpense, deleteExpense, getExpenses } from '$lib/server/db/expenses';
import type { InsertExpense } from '$lib/server/db/schema/expenses';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const expenses = await getExpenses();
	return { expenses };
};

export const actions: Actions = {
	createExpense: async ({ request }) => {
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
			accountId: accountId.toString(),
			date: date.toString(),
			categoryId: categoryId.toString()
		};

		await createExpense(newExpense);
	},
	deleteExpense: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await deleteExpense(String(id));
	}
};
