import { db } from '.';
import {
	accounts,
	categories,
	expenses,
	type InsertAccount,
	type InsertCategory,
	type InsertExpense
} from './schema';

export async function getExpenses() {
	return db.query.expenses.findMany();
}

export async function createExpense(data: InsertExpense) {
	await db.insert(expenses).values(data);
}

export async function createAccount(data: InsertAccount) {
	await db.insert(accounts).values(data);
}

export async function getAccounts() {
	return db.query.accounts.findMany();
}

export async function createCategory(data: InsertCategory) {
	await db.insert(categories).values(data);
}

export async function getCategories() {
	return db.query.categories.findMany();
}
