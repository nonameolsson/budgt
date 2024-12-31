import { getUserFromToken } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('jwt');
	let user = null;

	if (token) {
		user = await getUserFromToken(token);
	}

	return {
		user
	};
};
