<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Income</h1>
	<a href="/income/create" class="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white">
		Create Income
	</a>
	<ul>
		{#each data.incomes as income}
			<li class="mb-2">
				<span>{income.description}</span>
				<span>{income.amount}</span>
				<span>{income.date}</span>
				<a href={`/income/edit/${income.id}`} class="rounded bg-yellow-500 p-2 text-white">
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

<style>
</style>
