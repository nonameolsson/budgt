import { db } from '$lib/server/db';
import { createExpense, type InsertExpense } from '$lib/server/db/expenses';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const accounts = await db.query.accounts.findMany();
	return { accounts };
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

		const newExpense: InsertExpense = {
			amount: Number(amount),
			description: description.toString(),
			date: date.toString(),
			accountId: accountId.toString()
		};

		await createExpense(newExpense);
		throw redirect(303, '/expenses');
	}
};
