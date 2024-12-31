<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	const { enhance } = superForm(data.form);
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Categories</h1>
	<a href="/categories/create" class="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white">
		Create Category
	</a>
	<ul>
		{#each data.categories as category}
			<li class="mb-2 flex justify-between">
				<span>{category.name}</span>
				<a href={`/categories/edit/${category.id}`} class="rounded bg-yellow-500 p-2 text-white">
					Edit
				</a>
				<form method="POST" action="?/deleteCategory" use:enhance>
					<input type="hidden" name="id" value={category.id} />
					<button type="submit" class="rounded bg-red-500 p-2 text-white">Delete</button>
				</form>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
