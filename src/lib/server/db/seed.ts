import * as schema from '$lib/server/db/schema';
import { reset } from 'drizzle-seed';
import { logger } from '../logger';
import { db } from './index';
import type { InsertAccount } from './schema/accounts';
import type { InsertCategory } from './schema/categories';
import type { InsertExpense } from './schema/expenses';

const seedAccounts: InsertAccount[] = [
	{ id: 'cc6gkcsvgvxagvry16yh74v4', name: 'Cash', balance: 1000, is_primary: true },
	{ id: 'cja4l3wtsaw9h93945xjdbzu', name: 'Bank', balance: 5000, is_primary: false }
];

const seedCategories: InsertCategory[] = [
	{ id: 'dkm8kmfxnbpvkmovst', name: 'Uncategorized' },
	{ id: 'kdd2kfmxkdj9k837ak', name: 'Utilities' },
	{ id: 'jdosk388sl3kasjdnc', name: 'Transport' },
	{ id: 'fkm3wtsaw9h935xbzu', name: 'Food' }
];

const seedExpenses: InsertExpense[] = [
	{
		id: 'i9a4pijkm8kmfxnbpvkmovst',
		amount: 50,
		description: 'Groceries',
		date: '2023-01-01',
		accountId: 'cja4l3wtsaw9h93945xjdbzu',
		categoryId: 'fkm3wtsaw9h935xbzu'
	},
	{
		id: 'jsdks938ajkfjds83jdlsdkj3',
		amount: 20,
		description: 'Bus ticket',
		date: '2023-01-02',
		accountId: 'cc6gkcsvgvxagvry16yh74v4',
		categoryId: 'jdosk388sl3kasjdnc'
	},
	{
		id: 'fksd83jhslkdjsdfs09dok3ut',
		amount: 100,
		description: 'Electricity bill',
		date: '2023-01-03',
		accountId: 'cja4l3wtsaw9h93945xjdbzu',
		categoryId: 'kdd2kfmxkdj9k837ak'
	},
	{
		id: 'jdsjl30amvc9xfjdsj3jo83js',
		amount: 50,
		description: 'Gifts',
		date: '2023-01-04',
		accountId: 'cc6gkcsvgvxagvry16yh74v4',
		categoryId: 'fkm3wtsaw9h935xbzu'
	}
];

async function seedDatabase() {
	await db.insert(schema.accounts).values(seedAccounts);
	await db.insert(schema.categories).values(seedCategories);
	await db.insert(schema.expenses).values(seedExpenses);
}

export async function initiateSeed() {
	try {
		console.log('Seeding database...');
		await seedDatabase();
		console.log('Database seeded successfully');
	} catch (error) {
		logger.error(error, 'Error seeding database');
		throw error;
	}
}

export async function resetDatabase() {
	try {
		console.log('Resetting database...');
		// @ts-expect-error - The types of the databse reset function are not correct
		await reset(db, schema);
		console.log('Database reset successfully');
	} catch (error) {
		logger.error(error, 'Error resetting database');
		throw error;
	}
}
