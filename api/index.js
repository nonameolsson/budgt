// api/index.js
import { createServer } from 'http';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { handler } from '../build/handler.js';

const logger = pino({
	level: 'info',
	prettyPrint: true
});

const pinoHttpMiddleware = pinoHttp({
	logger: logger
});

const server = createServer((req, res) => {
	pinoHttpMiddleware(req, res);
	handler(req, res);
});

export default (req, res) => {
	server.emit('request', req, res);
};
