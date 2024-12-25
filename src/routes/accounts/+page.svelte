<script lang="ts">
	let { data } = $props();
	import { enhance } from '$app/forms';
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Accounts</h1>
	<a href="/accounts/create" class="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white">
		Create Account
	</a>
	<ul>
		{#each data.accounts as account}
			<li class="mb-2 flex justify-between">
				<span>{account.name}</span>
				<form method="POST" action="?/deleteAccount" use:enhance>
					<input type="hidden" name="id" value={account.id} />
					<button type="submit" class="rounded bg-red-500 p-2 text-white">Delete</button>
				</form>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
