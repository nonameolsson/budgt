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

## Managing Accounts

### Business Logic

- Validate that the account name is unique.
- Ensure that the initial balance is a positive number.

### Database Modeling

- Table: `accounts`
  - Columns: `id`, `name`, `balance`, `created_at`, `updated_at`

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
