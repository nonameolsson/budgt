<script lang="ts">
	let { data } = $props();

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
	<form method="POST" action="?/createExpense" class="space-y-4 rounded-lg bg-white p-6 shadow-md">
		<input
			type="number"
			required
			name="amount"
			placeholder="Amount"
			class="w-full rounded border border-gray-300 p-2"
		/>
		<input
			type="text"
			required
			name="description"
			placeholder="Description"
			class="w-full rounded border border-gray-300 p-2"
		/>
		<input
			type="date"
			required
			name="date"
			class="w-full rounded border border-gray-300 p-2"
			value={getCurrentDate()}
		/>
		<select name="accountId" required class="w-full rounded border border-gray-300 p-2">
			{#if data.accounts.length === 0}
				<option value="" disabled selected>No Accounts</option>
			{:else if !data.accounts.some((account) => account.is_primary)}
				<option value="" disabled selected>Select Account</option>
			{/if}
			{#each data.accounts as { id, is_primary, name }}
				<option selected={is_primary} value={id}>{name}</option>
			{/each}
		</select>
		<select name="categoryId" required class="w-full rounded border border-gray-300 p-2">
			<option value="" disabled selected>Select Category</option>
			{#each data.categories as { id, name }}
				<option value={id}>{name}</option>
			{/each}
		</select>
		<div class="flex justify-between">
			<a href="/expenses" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
			<button type="submit" class="rounded bg-blue-500 p-2 text-white">Add</button>
		</div>
	</form>
</div>

<style>
</style>
