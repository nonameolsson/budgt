<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	const {
		form: expenseForm,
		errors: expenseErrors,
		constraints: expenseConstraints,
		message: expenseMessage,
		enhance: expenseEnhance
	} = superForm(data.expenseForm);

	const {
		form: incomeForm,
		errors: incomeErrors,
		constraints: incomeConstraints,
		message: incomeMessage,
		enhance: incomeEnhance
	} = superForm(data.incomeForm);
</script>

<div class="container mx-auto p-4">
	{#if data.transactionType === 'expense'}
		<h1 class="mb-4 text-2xl font-bold">Edit Expense</h1>
		{#if $expenseMessage}<h3>{$expenseMessage}</h3>{/if}
		<form
			method="POST"
			use:expenseEnhance
			action="?/editExpense"
			class="space-y-4 rounded-lg bg-white p-6 shadow-md"
		>
			<input
				bind:value={$expenseForm.amount}
				type="number"
				required
				name="amount"
				placeholder="Amount"
				class="w-full rounded border border-gray-300 p-2"
				aria-invalid={$expenseErrors.amount ? 'true' : undefined}
				{...$expenseConstraints.amount}
			/>
			{#if $expenseErrors.amount}
				<p class="text-red-500">{$expenseErrors.amount}</p>
			{/if}
			<input
				bind:value={$expenseForm.description}
				type="text"
				required
				name="description"
				placeholder="Description"
				class="w-full rounded border border-gray-300 p-2"
				aria-invalid={$expenseErrors.description ? 'true' : undefined}
				{...$expenseConstraints.description}
			/>
			{#if $expenseErrors.description}
				<p class="text-red-500">{$expenseErrors.description}</p>
			{/if}
			<input
				bind:value={$expenseForm.date}
				type="date"
				required
				name="date"
				class="w-full rounded border border-gray-300 p-2"
				aria-invalid={$expenseErrors.date ? 'true' : undefined}
				{...$expenseConstraints.date}
			/>
			{#if $expenseErrors.date}
				<p class="text-red-500">{$expenseErrors.date}</p>
			{/if}
			<select
				bind:value={$expenseForm.accountId}
				name="accountId"
				required
				class="w-full rounded border border-gray-300 p-2"
				aria-invalid={$expenseErrors.accountId ? 'true' : undefined}
				{...$expenseConstraints.accountId}
			>
				{#if data.accounts.length === 0}
					<option value="" disabled selected>No Accounts</option>
				{/if}

				{#each data.accounts as { id, is_primary, name }}
					<option selected={is_primary} value={id}>{name}</option>
				{/each}
			</select>
			{#if $expenseErrors.accountId}
				<p class="text-red-500">{$expenseErrors.accountId}</p>
			{/if}
			<select
				bind:value={$expenseForm.categoryId}
				name="categoryId"
				required
				class="w-full rounded border border-gray-300 p-2"
				aria-invalid={$expenseErrors.categoryId ? 'true' : undefined}
				{...$expenseConstraints.categoryId}
			>
				{#if data.categories.length === 0}
					<option value="" disabled selected>No categories...</option>
				{/if}
				{#each data.categories as { id, name }}
					<option value={id}>{name}</option>
				{/each}
			</select>
			{#if $expenseErrors.categoryId}
				<p class="text-red-500">{$expenseErrors.categoryId}</p>
			{/if}
			<div class="flex justify-between">
				<a href="/transactions" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
				<button type="submit" class="rounded bg-blue-500 p-2 text-white">Save</button>
			</div>
		</form>
	{/if}

	{#if data.transactionType === 'income'}
		<h1 class="mb-4 text-2xl font-bold">Edit Income</h1>
		{#if $incomeMessage}<h3>{$incomeMessage}</h3>{/if}
		<form
			method="POST"
			use:incomeEnhance
			action="?/editIncome"
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
					<option value="" disabled selected>No categories...</option>
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
				<button type="submit" class="rounded bg-blue-500 p-2 text-white">Save</button>
			</div>
		</form>
	{/if}
</div>

<style>
</style>
