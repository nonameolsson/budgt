<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Expenses</h1>
	<ul>
		{#each data.expenses as expense}
			<li class="mb-2">
				<span>{expense.description}</span>
				<span>{expense.amount}</span>
				<span>{expense.date}</span>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
