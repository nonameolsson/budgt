import { db } from '$lib/server/db';
import { createExpense } from '$lib/server/db/expenses';
import { expenseInsertSchema, type InsertExpense } from '$lib/server/db/schema';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { typebox } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const accounts = await db.query.accounts.findMany();
	const form = await superValidate(typebox(expenseInsertSchema), { errors: true });
	return { accounts, form };
};

export const actions: Actions = {
	createExpense: async ({ request }) => {
		const form = await superValidate(request, typebox(expenseInsertSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const newExpense: InsertExpense = {
			amount: form.data.amount,
			description: form.data.description,
			date: form.data.date,
			accountId: form.data.accountId
		};

		await createExpense(newExpense);
		redirect(303, '/expenses');
	}
};
