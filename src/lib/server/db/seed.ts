import { db } from './index';
import { accounts, categories, expenses } from './schema';
import { InsertAccount, InsertCategory, InsertExpense } from 'drizzle-typebox';

const seedAccounts: InsertAccount[] = [
  { id: '1', name: 'Cash', balance: 1000, is_primary: true },
  { id: '2', name: 'Bank', balance: 5000, is_primary: false }
];

const seedCategories: InsertCategory[] = [
  { id: '1', name: 'Food' },
  { id: '2', name: 'Transport' }
];

const seedExpenses: InsertExpense[] = [
  { id: '1', amount: 50, description: 'Groceries', date: '2023-01-01', accountId: '1', categoryId: '1' },
  { id: '2', amount: 20, description: 'Bus ticket', date: '2023-01-02', accountId: '2', categoryId: '2' }
];

async function seedDatabase() {
  await db.insert(accounts).values(seedAccounts);
  await db.insert(categories).values(seedCategories);
  await db.insert(expenses).values(seedExpenses);
}

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
});
