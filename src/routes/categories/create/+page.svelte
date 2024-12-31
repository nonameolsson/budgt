<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	const { form, errors, constraints, message, enhance } = superForm(data);
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Create Category</h1>
	{#if $message}<h3>{$message}</h3>{/if}
	<form
		method="POST"
		use:enhance
		action="?/createCategory"
		class="space-y-4 rounded-lg bg-white p-6 shadow-md"
	>
		<input
			bind:value={$form.name}
			type="text"
			name="name"
			placeholder="Category Name"
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.name ? 'true' : undefined}
			{...$constraints.name}
		/>
		{#if $errors.name}
			<p class="text-red-500">{$errors.name}</p>
		{/if}
		<div class="flex justify-between">
			<a href="/categories" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
			<button type="submit" class="rounded bg-blue-500 p-2 text-white">Add</button>
		</div>
	</form>
</div>

<style>
</style>
