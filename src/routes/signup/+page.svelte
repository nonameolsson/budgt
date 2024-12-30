<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let username = '';
  let email = '';
  let password = '';
  let errorMessage = '';

  async function handleSubmit(event: Event) {
    event.preventDefault();

    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      goto('/login');
    } else {
      const error = await response.json();
      errorMessage = error.message;
    }
  }
</script>

<main class="container mx-auto p-4">
  <h1 class="mb-4 text-2xl font-bold">Sign Up</h1>
  <form on:submit={handleSubmit} class="space-y-4">
    <div>
      <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
      <input
        type="text"
        id="username"
        bind:value={username}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        required
      />
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        required
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        required
      />
    </div>
    {#if errorMessage}
      <p class="text-red-500">{errorMessage}</p>
    {/if}
    <button
      type="submit"
      class="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700"
    >
      Sign Up
    </button>
  </form>
</main>
