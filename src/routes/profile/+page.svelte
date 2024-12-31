<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import { goto } from '$app/navigation';

	let { data } = $props();
	let selectedCurrency = $state<string | null>(null);
	let currencies = [
		{ code: 'USD', name: 'US Dollar' },
		{ code: 'EUR', name: 'Euro' },
		{ code: 'GBP', name: 'British Pound' },
		// Add more currencies as needed
	];

	onMount(() => {
		selectedCurrency = data.user.currency;
	});

	const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Profile</h1>
	{#if $message}<h3>{$message}</h3>{/if}
	<form
		method="POST"
		use:enhance
		action="?/updateCurrency"
		class="space-y-4 rounded-lg bg-white p-6 shadow-md"
	>
		<label for="currency" class="block text-sm font-medium text-gray-700">Preferred Currency</label>
		<select
			id="currency"
			name="currency"
			bind:value={selectedCurrency}
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.currency ? 'true' : undefined}
			{...$constraints.currency}
		>
			{#each currencies as { code, name }}
				<option value={code} selected={code === selectedCurrency}>{name}</option>
			{/each}
		</select>
		{#if $errors.currency}
			<p class="text-red-500">{$errors.currency}</p>
		{/if}
		<button type="submit" class="rounded bg-blue-500 p-2 text-white">Save</button>
	</form>
</div>

<style>
	/* Add responsive styles */
	@media (max-width: 640px) {
		.container {
			padding: 1rem;
		}
		h1 {
			font-size: 2rem;
		}
		form {
			padding: 1rem;
		}
	}
</style>
