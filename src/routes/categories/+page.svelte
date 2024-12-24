<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Categories</h1>
	<ul>
		{#each data.categories as category}
			<li class="mb-2">{category.name}</li>
		{/each}
	</ul>
</div>

<style>
</style>
