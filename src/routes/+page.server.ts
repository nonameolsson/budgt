import { db } from '$lib/server/db';

import { getAccounts, getCategories, getExpenses } from '$lib/server/db/queries';
import {
	accounts,
	categories,
	expenses,
	type InsertAccount,
	type InsertCategory,
	type InsertExpense
} from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const expenses = await getExpenses();
	const accounts = await getAccounts();
	const categories = await getCategories();

	return {
		expenses,
		accounts,
		categories
	};
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

		const userId = data.get('userId');
		if (userId === null) return;

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
	},
	createAccount: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		if (name === null) return;

		const balance = data.get('balance');
		if (balance === null) return;

		const newAccount: InsertAccount = {
			name: name.toString(),
			balance: Number(balance)
		};

		await db.insert(accounts).values(newAccount);
	},
	deleteAccount: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await db.delete(accounts).where(eq(accounts.id, Number(id)));
	},
	createCategory: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name');
		if (name === null) return;

		const newCategory: InsertCategory = {
			name: name.toString()
		};

		await db.insert(categories).values(newCategory);
	},
	deleteCategory: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await db.delete(categories).where(eq(categories.id, Number(id)));
	}
};
