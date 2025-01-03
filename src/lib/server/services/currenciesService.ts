import { Value } from '@sinclair/typebox/value';
import { asc, eq } from 'drizzle-orm';
import { db } from '../db';
import {
	currencies,
	insertCurrencySchema,
	selectCurrencySchema,
	type InsertCurrency
} from '../db/schema/currencies';
import { logger } from '../logger';

class CurrenciesService {
	async createCurrency(data: InsertCurrency) {
		try {
			const parsed = Value.Parse(insertCurrencySchema, data);

			return await db.insert(currencies).values(parsed);
		} catch (error) {
			logger.error('Error creating currency:', error);
			throw error;
		}
	}

	async getCurrencies() {
		try {
			return await db.query.currencies.findMany({
				orderBy: [asc(currencies.name)]
			});
		} catch (error) {
			logger.error('Error getting currencies:', error);
			throw error;
		}
	}

	async getCurrency(code: string) {
		try {
			return await db.query.currencies.findFirst({ where: eq(currencies.code, code) });
		} catch (error) {
			logger.error('Error getting currency:', error);
			throw error;
		}
	}

	async updateCurrency(code: string, data: Partial<InsertCurrency>) {
		try {
			const parsed = Value.Parse(selectCurrencySchema, data);
			return await db.update(currencies).set(parsed).where(eq(currencies.code, code));
		} catch (error) {
			logger.error('Error updating currency:', error);
			throw error;
		}
	}
}

export const currenciesService = new CurrenciesService();
