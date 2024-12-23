import { db } from '$lib/server/db';
import { expenses, users, type InsertExpense, type InsertUser } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const users = await db.query.users.findMany();
	const expenses = await db.query.expenses.findMany();

	return {
		users,
		expenses
	};
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		const age = data.get('age');
		if (age === null) return;

		const email = data.get('email');
		if (email === null) return;

		const name = data.get('name');
		if (name === null) return;

		const newUser: InsertUser = {
			age: Number(age),
			email: email.toString(),
			name: name.toString()
		};

		await db.insert(users).values(newUser);
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await db.delete(users).where(eq(users.id, Number(id)));
	},
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
			userId: 1, // TODO: get user id from session
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
