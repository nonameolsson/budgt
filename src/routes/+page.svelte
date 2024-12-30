<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Budgt</h1>
	<p>Welcome to the home page.</p>
	<h2 class="mb-4 mt-8 text-xl font-bold">Latest Expenses</h2>
	<ul>
		{#each data.latestExpenses as expense}
			<li class="mb-2">
				<span>{expense.amount}</span>
				<span>{expense.categoryId}</span>
				<span>{expense.date}</span>
				<span>{expense.accountId}</span>
			</li>
		{/each}
	</ul>
</div>

<style></style>
