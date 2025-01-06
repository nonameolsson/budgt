<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Transactions</h1>
	<div class="mb-8">
		<h2 class="mb-4 text-xl font-semibold">Expenses</h2>
		<a
			href="/transactions/expense/add"
			class="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white"
		>
			Add Expense
		</a>
		<ul>
			{#each data.expenses as expense}
				<li class="mb-2">
					<span>{expense.description}</span>
					<span>{expense.amount}</span>
					<span>{expense.date}</span>
					<a
						href={`transactions/expense/edit/${expense.id}`}
						class="rounded bg-yellow-500 p-2 text-white"
					>
						Edit
					</a>
					<form method="POST" action="?/deleteExpense" use:enhance class="inline">
						<input type="hidden" name="id" value={expense.id} />
						<button class="rounded bg-red-500 p-2 text-white">Delete</button>
					</form>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<h2 class="mb-4 text-xl font-semibold">Income</h2>
		<a
			href="/transactions/income/add"
			class="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white"
		>
			Add Income
		</a>
		<ul>
			{#each data.incomes as income}
				<li class="mb-2">
					<span>{income.description}</span>
					<span>{income.amount}</span>
					<span>{income.date}</span>
					<a
						href={`/transactions/income/edit/${income.id}`}
						class="rounded bg-yellow-500 p-2 text-white"
					>
						Edit
					</a>
					<form method="POST" action="?/deleteIncome" use:enhance class="inline">
						<input type="hidden" name="id" value={income.id} />
						<button class="rounded bg-red-500 p-2 text-white">Delete</button>
					</form>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
</style>
