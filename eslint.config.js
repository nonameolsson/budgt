import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import * as drizzle from 'eslint-plugin-drizzle';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

// https://github.com/drizzle-team/drizzle-orm/issues/2131
// https://github.com/drizzle-team/drizzle-orm/pull/3686
const flatDrizzle = {
	plugins: {
		drizzle: {
			rules: drizzle.rules,
			meta: drizzle.meta
		}
	},
	rules: drizzle.configs.recommended.rules
};

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	flatDrizzle,
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],

		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	}
);
