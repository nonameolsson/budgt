<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Budgt</h1>
	<p>Welcome to the home page.</p>
	<h2 class="mb-4 mt-8 text-xl font-bold">Latest Expenses</h2>
	<ul>
		{#each data.expenses as expense}
			<li class="mb-2">
				<span>{expense.date}</span>
				<span>{expense.amount}</span>
				<span>{expense.description}</span>
				<span>{expense.account.name}</span>
				<span>{expense.category.name}</span>
			</li>
		{/each}
	</ul>
</div>

<style></style>
