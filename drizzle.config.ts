import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema',

	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN
	},

	out: './migrations',

	verbose: process.env.NODE_ENV === 'development',
	strict: true,
	dialect: 'turso'
});
