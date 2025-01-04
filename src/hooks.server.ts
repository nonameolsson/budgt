import { logger } from '$lib/server/logger';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import pinoHTTP from 'pino-http';
pinoHTTP({ logger, genReqId: () => Math.random().toString(36).slice(2) });
const customHandle: Handle = async ({ event, resolve }) => {
	console.log('1️⃣');
	pinoHTTP({ logger, genReqId: () => Math.random().toString(36).slice(2) });

	console.log('2️⃣');

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
