<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { currencies } from '$lib/server/db/seed';

	let { data } = $props();
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
		<select
			bind:value={$form.currency}
			name="currency"
			required
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.currency ? 'true' : undefined}
			{...$constraints.currency}
		>
			{#each currencies as currency}
				<option value={currency.code}>{currency.name}</option>
			{/each}
		</select>
		{#if $errors.currency}
			<p class="text-red-500">{$errors.currency}</p>
		{/if}
		<div class="flex justify-between">
			<a href="/" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
			<button type="submit" class="rounded bg-blue-500 p-2 text-white">Save</button>
		</div>
	</form>
</div>

<style>
</style>
