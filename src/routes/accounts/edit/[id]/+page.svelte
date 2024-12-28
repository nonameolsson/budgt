<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { data } = $props();
	const { form, errors, constraints, message, enhance } = superForm(data.form);

	onMount(() => {
		$form.name = data.form.data.name;
		$form.balance = data.form.data.balance;
	});
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Edit Account</h1>
	{#if $message}<h3>{$message}</h3>{/if}
	<form
		method="POST"
		use:enhance
		action="?/updateAccount"
		class="space-y-4 rounded-lg bg-white p-6 shadow-md"
	>
		<input
			bind:value={$form.name}
			type="text"
			name="name"
			placeholder="Account Name"
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.name ? 'true' : undefined}
			{...$constraints.name}
		/>
		{#if $errors.name}
			<p class="text-red-500">{$errors.name}</p>
		{/if}
		<input
			bind:value={$form.balance}
			type="number"
			name="balance"
			placeholder="Balance"
			class="w-full rounded border border-gray-300 p-2"
			aria-invalid={$errors.balance ? 'true' : undefined}
			{...$constraints.balance}
		/>
		{#if $errors.balance}
			<p class="text-red-500">{$errors.balance}</p>
		{/if}
		<div class="flex justify-between">
			<a href="/accounts" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
			<button type="submit" class="rounded bg-blue-500 p-2 text-white">Update</button>
		</div>
	</form>
</div>
