<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Accounts</h1>
	<a href="/accounts/create" class="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white"
		>Create Account</a
	>
	<ul>
		{#each data.accounts as account}
			<li class="mb-2">{account.name}</li>
		{/each}
	</ul>
</div>

<style>
</style>
