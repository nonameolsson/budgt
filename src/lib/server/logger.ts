import { dev } from '$app/environment';
import { BETTERSTACK_TOKEN, LOG_LEVEL } from '$env/static/private';
import '@logtail/pino';
import pino from 'pino';
import 'pino-pretty';

const devLoggerConfig = {
	level: 'trace',
	transport: {
		targets: [
			{
				target: 'pino/file',
				options: { destination: 'server.log' }
			},
			{
				target: 'pino-pretty',
				options: {
					colorize: true
				}
			}
		]
	}
};

const prodLoggerConfig = {
	name: 'Budgt',
	level: LOG_LEVEL,
	transport: {
		target: '@logtail/pino',
		options: { sourceToken: BETTERSTACK_TOKEN }
	}
};

const loggerConfig = dev ? devLoggerConfig : prodLoggerConfig;
const logger = pino(loggerConfig);

export { logger };
