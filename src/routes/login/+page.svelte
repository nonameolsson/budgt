<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const dispatch = createEventDispatcher();

	let username = '';
	let password = '';
	let error = '';

	async function handleSubmit(event: Event) {
		event.preventDefault();

		const response = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		if (response.ok) {
			const data = await response.json();
			dispatch('login', { user: data.user });
			window.location.href = '/';
		} else {
			const errorData = await response.json();
			error = errorData.message;
		}
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Login</h1>
	<form on:submit={handleSubmit} class="space-y-4 rounded-lg bg-white p-6 shadow-md">
		<div>
			<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
			<input
				type="text"
				id="username"
				bind:value={username}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			/>
		</div>
		<div>
			<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			/>
		</div>
		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}
		<div class="flex justify-between">
			<a href="/" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
			<button type="submit" class="rounded bg-blue-500 p-2 text-white">Login</button>
		</div>
	</form>
</div>
