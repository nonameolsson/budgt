import { getExpenses } from '$lib/server/services/expensesService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const expenses = await getExpenses(10);

	return { expenses };
};
