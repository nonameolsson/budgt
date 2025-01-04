import pino from 'pino';
const token = '7Kaz7yzi9f6aPkMhTomCtWVv';

// const transport = pino.transport({
// 	target: '@logtail/pino',
// 	options: { sourceToken: token }
// });

const logger = pino({
	level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
	transport: {
		target: '@logtail/pino',
		options: { sourceToken: token }
	}
	// transport:
	// 	process.env.NODE_ENV !== 'production'
	// 		? {
	// 				target: 'pino-pretty',
	// 				options: {
	// 					colorize: true
	// 				}
	// 			}
	// 		: undefined
});

export { logger };
