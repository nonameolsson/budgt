import { expensesService } from '$lib/server/services/expensesService';
import { usersService } from '$lib/server/services/usersService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const expenses = await expensesService.getExpenses(10);
	const user = await usersService.getUser('fjds83kslsjs0vlks9dl3kaa3');

	return { expenses, currency: user?.currency };
};
