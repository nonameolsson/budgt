import { categoriesService } from '$lib/server/services/categoriesService';
import { expensesService } from '$lib/server/services/expensesService';
import { incomeService } from '$lib/server/services/incomeService';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const expenses = await expensesService.getExpenses();
	const incomes = await incomeService.getIncomes();
	const categories = await categoriesService.getCategories();

	return { expenses, incomes, categories };
};

export const actions: Actions = {
	deleteExpense: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await expensesService.deleteExpense(String(id));
	},
	deleteIncome: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await incomeService.deleteIncome(String(id));
	}
};
