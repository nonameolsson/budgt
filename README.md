# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

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

## Documentation

For more information on best practices and business logic for the budgeting app, refer to the following documents:

- [MVP Features](docs/MVP_Features.md)
- [Business Logic](docs/Business_Logic.md)
