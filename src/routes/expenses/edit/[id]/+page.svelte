<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Edit Expense</h1>
	{#if $message}<h3>{$message}</h3>{/if}
	<form
		method="POST"
		use:enhance
		action="?/editExpense"
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
			{#if data.accounts.length === 0}
				<option value="" disabled selected>No Accounts</option>
			{/if}

			{#each data.accounts as { id, is_primary, name }}
				<option selected={is_primary} value={id}>{name}</option>
			{/each}
		</select>
		{#if $errors.accountId}
			<p class="text-red-500">{$errors.accountId}</p>
		{/if}
		<select
			bind:value={$form.categoryId}
			name="categoryId"
			required
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.categoryId ? 'true' : undefined}
			{...$constraints.categoryId}
		>
			{#if data.categories.length === 0}
				<option value="" disabled selected>Select Category</option>
			{/if}
			{#each data.categories as { id, name }}
				<option value={id}>{name}</option>
			{/each}
		</select>
		{#if $errors.categoryId}
			<p class="text-red-500">{$errors.categoryId}</p>
		{/if}
		<div class="flex justify-between">
			<a href="/expenses" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
			<button type="submit" class="rounded bg-blue-500 p-2 text-white">Save</button>
		</div>
	</form>
</div>

<style>
</style>
