<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	const { form, errors, constraints, message, enhance } = superForm(data.form, {
		resetForm: false
	});
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Profile</h1>
	{#if $message}<h3>{$message}</h3>{/if}
	<form
		method="POST"
		use:enhance
		action="?/updateUser"
		class="space-y-4 rounded-lg bg-white p-6 shadow-md"
	>
		<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
		<input
			type="text"
			bind:value={$form.username}
			name="username"
			aria-invalid={$errors.username ? 'true' : undefined}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			{...$constraints.username}
		/>
		{#if $errors.username}
			<p class="mt-2 text-sm text-red-600">{$errors.username}</p>
		{/if}
		<select
			bind:value={$form.currency}
			name="currency"
			required
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.currency ? 'true' : undefined}
			{...$constraints.currency}
		>
			{#each data.currencies as currency}
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
