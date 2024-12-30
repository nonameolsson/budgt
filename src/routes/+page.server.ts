import { getExpenses } from '$lib/server/db/expenses';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const expenses = await getExpenses(10);

	return { expenses };
};
