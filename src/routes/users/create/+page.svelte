<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Create User</h1>
	{#if $message}<h3>{$message}</h3>{/if}
	<form
		method="POST"
		use:enhance
		action="?/createUser"
		class="space-y-4 rounded-lg bg-white p-6 shadow-md"
	>
		<input
			bind:value={$form.name}
			type="text"
			required
			name="name"
			placeholder="Username"
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.name ? 'true' : undefined}
			{...$constraints.name}
		/>
		{#if $errors.name}
			<p class="text-red-500">{$errors.name}</p>
		{/if}
		<input
			bind:value={$form.email}
			type="email"
			required
			name="email"
			placeholder="Email"
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.email ? 'true' : undefined}
			{...$constraints.email}
		/>
		{#if $errors.email}
			<p class="text-red-500">{$errors.email}</p>
		{/if}
		<select
			bind:value={$form.currency}
			name="currency"
			required
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.currency ? 'true' : undefined}
			{...$constraints.currency}
		>
			<option value="" disabled selected>Select Currency</option>
			{#each data.currencies as { code, name }}
				<option value={code}>{name}</option>
			{/each}
		</select>
		{#if $errors.currency}
			<p class="text-red-500">{$errors.currency}</p>
		{/if}
		<div class="flex justify-between">
			<a href="/users" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
			<button type="submit" class="rounded bg-blue-500 p-2 text-white">Create</button>
		</div>
	</form>
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
		form {
			padding: 1rem;
		}
	}
</style>
