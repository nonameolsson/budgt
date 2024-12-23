import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const users = await db.query.user.findMany();

	return {
		users
	};
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		await db.insert({ data: { name: data.get('name') } });
	}
};
