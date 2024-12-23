import { db } from '$lib/server/db';
import { usersTable, type InsertUser } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const users = await db.query.usersTable.findMany();

	return {
		users
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

		await db.insert(usersTable).values(newUser);
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (id === null) return;

		await db.delete(usersTable).where(eq(usersTable.id, Number(id)));
	}
};
