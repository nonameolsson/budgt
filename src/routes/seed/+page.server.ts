import { initiateSeed, resetDatabase } from '$lib/server/db/seed';
import type { Actions } from './$types';

export const actions: Actions = {
	seed: async () => {
		await initiateSeed();
	},
	reset: async () => {
		await resetDatabase();
	}
} satisfies Actions;
