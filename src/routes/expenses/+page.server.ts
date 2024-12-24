import { db } from '$lib/server/db';
import { expenses, type InsertExpense } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const expenses = await db.query.expenses.findMany();
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

		const newExpense: InsertExpense = {
			amount: Number(amount),
			description: description.toString(),
			date: date.toString()
		};

		await db.insert(expenses).values(newExpense);
	},
	deleteExpense: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await db.delete(expenses).where(eq(expenses.id, Number(id)));
	}
};
