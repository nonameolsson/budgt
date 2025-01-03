# MVP Features for Budgeting App

## Managing Expenses

### User Stories

- As a user, I want to add an expense with a description, amount, and date so that I can track my spending.
- As a user, I want to view a list of all my expenses so that I can see where my money is going.
- As a user, I want to delete an expense so that I can correct mistakes or remove unnecessary entries.
- As a user, I want to categorize my expenses so that I can better understand my spending habits.
- As a user, I want to filter my expenses by category so that I can see how much I am spending in each category.

### Example Implementation

```typescript
import { expensesService } from '$lib/server/services/expensesService';

// Add a new expense
const newExpense = {
	amount: 50,
	description: 'Groceries',
	date: new Date().toISOString(),
	accountId: 'account-id',
	categoryId: 'category-id'
};
await expensesService.createExpense(newExpense);

// View all expenses
const expenses = await expensesService.getExpenses();

// Delete an expense
await expensesService.deleteExpense('expense-id');

// Categorize an expense
const updatedExpense = {
	categoryId: 'new-category-id'
};
await expensesService.updateExpense('expense-id', updatedExpense);

// Filter expenses by category
const filteredExpenses = expenses.filter((expense) => expense.categoryId === 'category-id');
```

## Managing Income

### User Stories

- As a user, I want to add an income source with a description, amount, and date so that I can track my earnings.
- As a user, I want to view a list of all my income sources so that I can see my total earnings.
- As a user, I want to delete an income source so that I can correct mistakes or remove unnecessary entries.

### Example Implementation

```typescript
import { incomeService } from '$lib/server/services/incomeService';

// Add a new income source
const newIncome = {
	amount: 1000,
	description: 'Salary',
	date: new Date().toISOString(),
	accountId: 'account-id'
};
await incomeService.createIncome(newIncome);

// View all income sources
const incomes = await incomeService.getIncomes();

// Delete an income source
await incomeService.deleteIncome('income-id');
```

## Managing Accounts

### User Stories

- As a user, I want to create an account with a name and initial balance so that I can track my finances.
- As a user, I want to view a list of all my accounts so that I can see my financial overview.
- As a user, I want to delete an account so that I can remove accounts I no longer use.
- As a user, I want to set an account as the primary account so that I can easily identify my main account.

### Example Implementation

```typescript
import { accountService } from '$lib/server/services/accountsService';

// Create a new account
const newAccount = {
	name: 'Savings',
	balance: 5000
};
await accountService.createAccount(newAccount);

// View all accounts
const accounts = await accountService.getAccounts();

// Delete an account
await accountService.deleteAccount('account-id');

// Set an account as the primary account
const updatedAccount = {
	is_primary: true
};
await accountService.updateAccount('account-id', updatedAccount);
```

## Managing Categories

### User Stories

- As a user, I want to create a category with a name so that I can organize my expenses and income.
- As a user, I want to view a list of all my categories so that I can see how my finances are organized.
- As a user, I want to delete a category so that I can remove categories I no longer use.

### Example Implementation

```typescript
import { categoriesService } from '$lib/server/services/categoriesService';

// Create a new category
const newCategory = {
	name: 'Food'
};
await categoriesService.createCategory(newCategory);

// View all categories
const categories = await categoriesService.getCategories();

// Delete a category
await categoriesService.deleteCategory('category-id');
```
