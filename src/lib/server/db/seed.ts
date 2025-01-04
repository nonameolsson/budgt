import * as schema from '$lib/server/db/schema';
import { reset } from 'drizzle-seed';
import { logger } from '../logger';
import { db } from './index';
import type { InsertAccount } from './schema/accounts';
import type { InsertCategory } from './schema/categories';
import type { InsertCurrency } from './schema/currencies';
import type { InsertExpense } from './schema/expenses';
import type { InsertIncome } from './schema/income';
import type { InsertUser } from './schema/users';

const seedAccounts: InsertAccount[] = [
	{ id: 'cc6gkcsvgvxagvry16yh74v4', name: 'Cash', balance: 1000, is_primary: true },
	{ id: 'cja4l3wtsaw9h93945xjdbzu', name: 'Bank', balance: 5000, is_primary: false }
];

const seedCategories: InsertCategory[] = [
	{ id: 'ajskd9s343j908893d', name: 'Salary', type: 'income' },
	{ id: 'kldj20dmksl30skmd3', name: 'Other', type: 'income' },
	{ id: 'fmsj38jsl3jsj8383j', name: 'Uncategorized', type: 'income' },
	{ id: 'dkm8kmfxnbpvkmovst', name: 'Uncategorized', type: 'expense' },
	{ id: 'kdd2kfmxkdj9k837ak', name: 'Utilities', type: 'expense' },
	{ id: 'jdosk388sl3kasjdnc', name: 'Transport', type: 'expense' },
	{ id: 'fkm3wtsaw9h935xbzu', name: 'Food', type: 'expense' },
	{ id: '9skw3oojse03jsj3hh', name: 'Rent', type: 'expense' }
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

const seedIncome: InsertIncome[] = [
	{
		id: 'a1b2c3d4e5f6g7h8i9j0',
		amount: 1000,
		description: 'Salary',
		date: '2023-01-01',
		accountId: 'cja4l3wtsaw9h93945xjdbzu',
		categoryId: 'ajskd9s343j908893d'
	},
	{
		id: 'k1l2m3n4o5p6q7r8s9t0',
		amount: 500,
		description: 'Freelance Work',
		date: '2023-01-02',
		accountId: 'cja4l3wtsaw9h93945xjdbzu',
		categoryId: 'ajskd9s343j908893d'
	},
	{
		id: 'kd89k230jsjsjlmnd833',
		accountId: 'cc6gkcsvgvxagvry16yh74v4',
		amount: 100,
		description: 'Gift',
		date: '2023-01-03',
		categoryId: 'kldj20dmksl30skmd3'
	}
];

const seedUsers: InsertUser[] = [
	{ id: 'fjds83kslsjs0vlks9dl3kaa3', username: 'john_doe', currencyCode: 'USD' },
	{ id: 'kls0cm2mslanzkltzke0sk338', username: 'jane_doe', currencyCode: 'EUR' }
];

const seedCurrencies: InsertCurrency[] = [
	{ code: 'USD', name: 'United States Dollar', symbol: '$' },
	{ code: 'EUR', name: 'Euro', symbol: '€' },
	{ code: 'GBP', name: 'British Pound', symbol: '£' },
	{ code: 'SEK', name: 'Swedish Krona', symbol: 'kr' }
];

async function seedDatabase() {
	await db.insert(schema.accounts).values(seedAccounts);
	await db.insert(schema.categories).values(seedCategories);
	await db.insert(schema.expenses).values(seedExpenses);
	await db.insert(schema.income).values(seedIncome);
	await db.insert(schema.users).values(seedUsers);
	await db.insert(schema.currencies).values(seedCurrencies);
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
		// @ts-expect-error - The types of the database reset function are not correct
		await reset(db, schema);
		console.log('Database reset successfully');
	} catch (error) {
		logger.error(error, 'Error resetting database');
		throw error;
	}
}
