<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Expenses</h1>
	<a href="/expenses/create" class="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white">
		Create Expense
	</a>
	<ul>
		{#each data.expenses as expense}
			<li class="mb-2">
				<span>{expense.description}</span>
				<span>{expense.amount}</span>
				<span>{expense.date}</span>
				<a href={`/expenses/edit/${expense.id}`} class="rounded bg-yellow-500 p-2 text-white">
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

<style>
</style>
