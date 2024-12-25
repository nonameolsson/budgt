<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';

	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Accounts</h1>
	<Button
		href="/accounts/create"
		class="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white"
	>
		Create Account
	</Button>

	<Table.Root>
		<Table.Header><Table.Row><Table.Head>hej</Table.Head></Table.Row></Table.Header>
	</Table.Root>

	<ul>
		{#each data.accounts as account}
			<li class="mb-2 flex justify-between">
				<span>{account.name}</span>
				<form method="POST" action="?/deleteAccount" use:enhance>
					<input type="hidden" name="id" value={account.id} />
					<Button type="submit" class="rounded bg-red-500 p-2 text-white">Delete</Button>
				</form>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
