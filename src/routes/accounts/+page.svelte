<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Accounts</h1>
	<ul>
		{#each data.accounts as account}
			<li class="mb-2">{account.name}</li>
		{/each}
	</ul>
</div>

<style>
</style>
