<script lang="ts">
	import AddExpenseForm from '$lib/components/AddExpenseForm.svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const {
		errors: incomeErrors,
		constraints: incomeConstraints,
		message: incomeMessage,
		enhance: incomeEnhance,
		form: incomeForm
	} = superForm(data.incomeForm);
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Add {data.transactionType}</h1>
	{#if data.transactionType === 'expense'}
		<AddExpenseForm categories={data.categories} accounts={data.accounts} data={data.expenseForm} />
	{/if}
	{#if data.transactionType === 'income'}
		{#if $incomeMessage}<h3>{$incomeMessage}</h3>{/if}
		<form
			method="POST"
			use:incomeEnhance
			action="?/addIncome"
			class="space-y-4 rounded-lg bg-white p-6 shadow-md"
		>
			<input
				bind:value={$incomeForm.amount}
				type="number"
				required
				name="amount"
				placeholder="Amount"
				class="w-full rounded border border-gray-300 p-2"
				aria-invalid={$incomeErrors.amount ? 'true' : undefined}
				{...$incomeConstraints.amount}
			/>
			{#if $incomeErrors.amount}
				<p class="text-red-500">{$incomeErrors.amount}</p>
			{/if}
			<input
				bind:value={$incomeForm.description}
				type="text"
				required
				name="description"
				placeholder="Description"
				class="w-full rounded border border-gray-300 p-2"
				aria-invalid={$incomeErrors.description ? 'true' : undefined}
				{...$incomeConstraints.description}
			/>
			{#if $incomeErrors.description}
				<p class="text-red-500">{$incomeErrors.description}</p>
			{/if}
			<input
				bind:value={$incomeForm.date}
				type="date"
				required
				name="date"
				class="w-full rounded border border-gray-300 p-2"
				aria-invalid={$incomeErrors.date ? 'true' : undefined}
				{...$incomeConstraints.date}
			/>
			{#if $incomeErrors.date}
				<p class="text-red-500">{$incomeErrors.date}</p>
			{/if}
			<select
				bind:value={$incomeForm.accountId}
				name="accountId"
				required
				class="w-full rounded border border-gray-300 p-2"
				aria-invalid={$incomeErrors.accountId ? 'true' : undefined}
				{...$incomeConstraints.accountId}
			>
				{#if data.accounts.length === 0}
					<option value="" disabled selected>No Accounts</option>
				{/if}

				{#each data.accounts as { id, is_primary, name }}
					<option selected={is_primary} value={id}>{name}</option>
				{/each}
			</select>
			{#if $incomeErrors.accountId}
				<p class="text-red-500">{$incomeErrors.accountId}</p>
			{/if}
			<select
				bind:value={$incomeForm.categoryId}
				name="categoryId"
				required
				class="w-full rounded border border-gray-300 p-2"
				aria-invalid={$incomeErrors.categoryId ? 'true' : undefined}
				{...$incomeConstraints.categoryId}
			>
				{#if data.categories.length === 0}
					<option value="" disabled selected>Select Category</option>
				{/if}
				{#each data.categories as { id, name }}
					<option value={id}>{name}</option>
				{/each}
			</select>
			{#if $incomeErrors.categoryId}
				<p class="text-red-500">{$incomeErrors.categoryId}</p>
			{/if}
			<div class="flex justify-between">
				<a href="/transactions" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
				<button type="submit" class="rounded bg-blue-500 p-2 text-white">Add</button>
			</div>
		</form>
	{/if}
</div>

<style>
</style>
