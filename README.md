# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Purpose and Features

This project is a budgeting app designed to help users manage their finances. The app allows users to track their expenses, income, accounts, and categories. Key features include:

- Adding, viewing, and deleting expenses
- Adding, viewing, and deleting income sources
- Creating, viewing, and deleting accounts
- Setting a primary account
- Creating, viewing, and deleting categories

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

To ensure consistent code formatting and quality, run the following scripts regularly:

```bash
pnpm run format
pnpm run lint
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Using DevContainers for Development

You can use DevContainers to create a consistent development environment. Follow these steps to open the project in a DevContainer:

1. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for Visual Studio Code.
2. Open the project in Visual Studio Code.
3. Press `F1` and select `Remote-Containers: Open Folder in Container...`.
4. Select the project folder.

This will open the project in a DevContainer with all the necessary dependencies and tools pre-installed.

## Contributing

We welcome contributions to the project! Please follow these guidelines when contributing:

### Code Style

- Use Prettier for code formatting. Run `pnpm run format` before submitting a pull request.
- Follow the ESLint rules. Run `pnpm run lint` to check for any linting errors.

### Testing

- Add unit tests for any new features or changes. Ensure that all tests pass before submitting a pull request.
- Run the tests using the following command:

```bash
pnpm run test
```

### Pull Requests

- Fork the repository and create a new branch for your feature or bugfix.
- Make your changes in the new branch.
- Submit a pull request with a clear description of the changes and the motivation behind them.

## Documentation

For more information on best practices and business logic for the budgeting app, refer to the following documents:

- [MVP Features](docs/MVP_Features.md)
- [Business Logic](docs/Business_Logic.md)
