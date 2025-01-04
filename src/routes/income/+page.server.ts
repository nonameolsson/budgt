import type { InsertIncome } from '$lib/server/db/schema/income';
import { categoriesService } from '$lib/server/services/categoriesService';
import { incomeService } from '$lib/server/services/incomeService';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const incomes = await incomeService.getIncomes();
	const categories = await categoriesService.getCategories();
	return { incomes, categories };
};

export const actions: Actions = {
	createIncome: async ({ request }) => {
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

		const newIncome: InsertIncome = {
			amount: Number(amount),
			description: description.toString(),
			accountId: accountId.toString(),
			date: date.toString(),
			categoryId: categoryId.toString()
		};

		await incomeService.createIncome(newIncome);
	},
	deleteIncome: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await incomeService.deleteIncome(String(id));
	}
};
