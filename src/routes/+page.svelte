<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-center text-3xl font-bold text-gray-800">Budgt</h1>
	<p class="text-center text-gray-600">Welcome to the home page.</p>
	<h2 class="mb-4 mt-8 text-2xl font-semibold text-gray-800">Latest Expenses</h2>
	<ul class="space-y-4">
		{#each data.expenses as expense}
			<li class="flex flex-col rounded-lg bg-white p-4 shadow-md">
				<div class="flex justify-between text-gray-600">
					<span class="font-medium">{expense.date}</span>
					<span class="font-medium">${expense.amount.toFixed(2)}</span>
				</div>
				<p class="mt-2 text-gray-800">{expense.description}</p>
				<div class="mt-2 flex justify-between text-sm text-gray-500">
					<span>{expense.account.name}</span>
					<span>{expense.category.name}</span>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	/* Add responsive styles */
	@media (max-width: 640px) {
		.container {
			padding: 1rem;
		}
		h1 {
			font-size: 2rem;
		}
		h2 {
			font-size: 1.5rem;
		}
		li {
			padding: 1rem;
		}
	}
</style>
