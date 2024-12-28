<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	const { form, errors, constraints, message, enhance } = superForm(data.form);

	function getCurrentDate() {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Create Expense</h1>
	{#if $message}<h3>{$message}</h3>{/if}
	<form
		method="POST"
		use:enhance
		action="?/createExpense"
		class="space-y-4 rounded-lg bg-white p-6 shadow-md"
	>
		<input
			bind:value={$form.amount}
			type="number"
			required
			name="amount"
			placeholder="Amount"
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.amount ? 'true' : undefined}
			{...$constraints.amount}
		/>
		{#if $errors.amount}
			<p class="text-red-500">{$errors.amount}</p>
		{/if}
		<input
			bind:value={$form.description}
			type="text"
			required
			name="description"
			placeholder="Description"
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.description ? 'true' : undefined}
			{...$constraints.description}
		/>
		{#if $errors.description}
			<p class="text-red-500">{$errors.description}</p>
		{/if}
		<input
			bind:value={$form.date}
			type="date"
			required
			name="date"
			class="w-full rounded border border-gray-300 p-2"
			value={getCurrentDate()}
			aria-invalid={$errors.date ? 'true' : undefined}
			{...$constraints.date}
		/>
		{#if $errors.date}
			<p class="text-red-500">{$errors.date}</p>
		{/if}
		<select
			bind:value={$form.accountId}
			name="accountId"
			required
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.accountId ? 'true' : undefined}
			{...$constraints.accountId}
		>
			<option value="" disabled selected>Select Account</option>
			{#each data.accounts as { id, name }}
				<option value={id}>{name}</option>
			{/each}
		</select>
		{#if $errors.accountId}
			<p class="text-red-500">{$errors.accountId}</p>
		{/if}
		<div class="flex justify-between">
			<a href="/expenses" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
			<button type="submit" class="rounded bg-blue-500 p-2 text-white">Add</button>
		</div>
	</form>
</div>

<style>
</style>
