# Business Logic for Budgeting App

## Managing Expenses

### Business Logic

- Ensure that expenses are associated with a valid account.
- Validate that the expense amount is a positive number.
- Update the account balance when an expense is created or deleted.

### Database Modeling

- Table: `expenses`
  - Columns: `id`, `amount`, `description`, `date`, `created_at`, `accountId`
- Table: `accounts`
  - Columns: `id`, `name`, `balance`

### Example Queries

- Create Expense:
  ```sql
  INSERT INTO expenses (id, amount, description, date, created_at, accountId) VALUES (?, ?, ?, ?, ?, ?);
  UPDATE accounts SET balance = balance - ? WHERE id = ?;
  ```
- Delete Expense:
  ```sql
  DELETE FROM expenses WHERE id = ?;
  UPDATE accounts SET balance = balance + ? WHERE id = ?;
  ```

### Functions and Classes

#### `ExpensesService`

- `createExpense(data: InsertExpense)`: Creates a new expense and updates the account balance.
- `getExpenses(limit?: number)`: Retrieves a list of expenses, optionally limited by a specified number.
- `getExpense(id: string)`: Retrieves a specific expense by its ID.
- `deleteExpense(id: string)`: Deletes an expense and updates the account balance.
- `updateExpense(id: string, data: UpdateExpense)`: Updates an existing expense.

#### Example Usage

```typescript
import { expensesService } from '$lib/server/services/expensesService';

// Create a new expense
const newExpense = {
  amount: 50,
  description: 'Groceries',
  date: new Date().toISOString(),
  accountId: 'account-id',
  categoryId: 'category-id'
};
await expensesService.createExpense(newExpense);

// Get a list of expenses
const expenses = await expensesService.getExpenses(10);

// Get a specific expense
const expense = await expensesService.getExpense('expense-id');

// Delete an expense
await expensesService.deleteExpense('expense-id');

// Update an expense
const updatedExpense = {
  amount: 60,
  description: 'Groceries and snacks'
};
await expensesService.updateExpense('expense-id', updatedExpense);
```

## Managing Income

### Business Logic

- Ensure that income is associated with a valid account.
- Validate that the income amount is a positive number.
- Update the account balance when income is created or deleted.

### Database Modeling

- Table: `income`
  - Columns: `id`, `amount`, `description`, `date`, `created_at`, `accountId`
- Table: `accounts`
  - Columns: `id`, `name`, `balance`

### Example Queries

- Create Income:
  ```sql
  INSERT INTO income (id, amount, description, date, created_at, accountId) VALUES (?, ?, ?, ?, ?, ?);
  UPDATE accounts SET balance = balance + ? WHERE id = ?;
  ```
- Delete Income:
  ```sql
  DELETE FROM income WHERE id = ?;
  UPDATE accounts SET balance = balance - ? WHERE id = ?;
  ```

### Functions and Classes

#### `IncomeService`

- `createIncome(data: InsertIncome)`: Creates a new income and updates the account balance.
- `getIncomes(limit?: number)`: Retrieves a list of incomes, optionally limited by a specified number.
- `getIncome(id: string)`: Retrieves a specific income by its ID.
- `deleteIncome(id: string)`: Deletes an income and updates the account balance.
- `updateIncome(id: string, data: UpdateIncome)`: Updates an existing income.

#### Example Usage

```typescript
import { incomeService } from '$lib/server/services/incomeService';

// Create a new income
const newIncome = {
  amount: 1000,
  description: 'Salary',
  date: new Date().toISOString(),
  accountId: 'account-id'
};
await incomeService.createIncome(newIncome);

// Get a list of incomes
const incomes = await incomeService.getIncomes(10);

// Get a specific income
const income = await incomeService.getIncome('income-id');

// Delete an income
await incomeService.deleteIncome('income-id');

// Update an income
const updatedIncome = {
  amount: 1200,
  description: 'Salary with bonus'
};
await incomeService.updateIncome('income-id', updatedIncome);
```

## Managing Accounts

### Business Logic

- Validate that the account name is unique.
- Ensure that the initial balance is a positive number.
- Ensure that only one account can be set as the primary account at a time.

### Database Modeling

- Table: `accounts`
  - Columns: `id`, `name`, `balance`, `created_at`, `updated_at`, `is_primary`

### Example Queries

- Create Account:
  ```sql
  INSERT INTO accounts (id, name, balance, created_at, updated_at) VALUES (?, ?, ?, ?, ?);
  ```
- Delete Account:
  ```sql
  DELETE FROM accounts WHERE id = ?;
  DELETE FROM expenses WHERE accountId = ?;
  DELETE FROM income WHERE accountId = ?;
  ```
- Set Primary Account:
  ```sql
  UPDATE accounts SET is_primary = 0 WHERE is_primary = 1;
  UPDATE accounts SET is_primary = 1 WHERE id = ?;
  ```

### Functions and Classes

#### `AccountService`

- `createAccount(data: InsertAccount)`: Creates a new account and sets it as primary if no other primary account exists.
- `getAccounts()`: Retrieves a list of all accounts.
- `getAccount(id: string)`: Retrieves a specific account by its ID.
- `deleteAccount(id: string)`: Deletes an account and its associated expenses and income.
- `updateAccount(id: string, data: UpdateAccount)`: Updates an existing account.

#### Example Usage

```typescript
import { accountService } from '$lib/server/services/accountsService';

// Create a new account
const newAccount = {
  name: 'Savings',
  balance: 5000
};
await accountService.createAccount(newAccount);

// Get a list of accounts
const accounts = await accountService.getAccounts();

// Get a specific account
const account = await accountService.getAccount('account-id');

// Delete an account
await accountService.deleteAccount('account-id');

// Update an account
const updatedAccount = {
  name: 'Emergency Fund',
  balance: 6000
};
await accountService.updateAccount('account-id', updatedAccount);
```

## Managing Categories

### Business Logic

- Validate that the category name is unique.

### Database Modeling

- Table: `categories`
  - Columns: `id`, `name`, `created_at`, `updated_at`

### Example Queries

- Create Category:
  ```sql
  INSERT INTO categories (id, name, created_at, updated_at) VALUES (?, ?, ?, ?);
  ```
- Delete Category:
  ```sql
  DELETE FROM categories WHERE id = ?;
  ```

### Functions and Classes

#### `CategoriesService`

- `createCategory(data: InsertCategory)`: Creates a new category.
- `getCategories()`: Retrieves a list of all categories.
- `getCategory(id: string)`: Retrieves a specific category by its ID.
- `deleteCategory(id: string)`: Deletes a category and its associated expenses.
- `updateCategory(id: string, data: UpdateCategory)`: Updates an existing category.

#### Example Usage

```typescript
import { categoriesService } from '$lib/server/services/categoriesService';

// Create a new category
const newCategory = {
  name: 'Food'
};
await categoriesService.createCategory(newCategory);

// Get a list of categories
const categories = await categoriesService.getCategories();

// Get a specific category
const category = await categoriesService.getCategory('category-id');

// Delete a category
await categoriesService.deleteCategory('category-id');

// Update a category
const updatedCategory = {
  name: 'Groceries'
};
await categoriesService.updateCategory('category-id', updatedCategory);
```

## Managing Users

### Business Logic

- Validate that the username is unique.
- Ensure that the currency preference is a valid currency code (e.g., ISO 4217 currency codes).

### Database Modeling

- Table: `users`
  - Columns: `id`, `username`, `currency`, `created_at`, `updated_at`

### Example Queries

- Create User:
  ```sql
  INSERT INTO users (id, username, currency, created_at, updated_at) VALUES (?, ?, ?, ?, ?);
  ```
- Update User Currency:
  ```sql
  UPDATE users SET currency = ? WHERE id = ?;
  ```

### Functions and Classes

#### `UsersService`

- `createUser(data: InsertUser)`: Creates a new user with a currency preference.
- `getUsers()`: Retrieves a list of all users.
- `getUser(id: string)`: Retrieves a specific user by their ID.
- `updateUserCurrency(id: string, currency: string)`: Updates the currency preference of a user.

#### Example Usage

```typescript
import { usersService } from '$lib/server/services/usersService';

// Create a new user
const newUser = {
  username: 'john_doe',
  currency: 'USD'
};
await usersService.createUser(newUser);

// Get a list of users
const users = await usersService.getUsers();

// Get a specific user
const user = await usersService.getUser('user-id');

// Update user currency
await usersService.updateUserCurrency('user-id', 'EUR');
```
