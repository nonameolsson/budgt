import { logger } from '$lib/server/logger';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const customHandle: Handle = async ({ event, resolve }) => {
	return await resolve(event);
};

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	logger.fatal(
		{
			status,
			event,
			error: JSON.stringify(error)
		},
		message
	);

	return {
		message: 'Whoops!'
	};
};

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(customHandle);
