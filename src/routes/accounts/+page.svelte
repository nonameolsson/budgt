<script lang="ts">
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';

	let { data } = $props();
	let selectedAccount = $state<string | null>(null);
</script>

{selectedAccount}
<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Accounts</h1>
	<a href="/accounts/create" class="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white">
		Create Account
	</a>
	<ul>
		{#each data.accounts as account}
			<li class="mb-2 flex justify-between">
				<span>{account.name}</span>
				<span>{account.balance}:-</span>
				{#if account.is_primary}
					<span class="text-green-500">Primary</span>
				{/if}
				<a href={`/accounts/edit/${account.id}`} class="rounded bg-yellow-500 p-2 text-white">
					Edit
				</a>
				<button
					onclick={() => (selectedAccount = account.id)}
					class="rounded bg-red-500 p-2 text-white"
				>
					Delete
				</button>
			</li>
		{/each}
	</ul>
</div>

<ConfirmModal bind:selectedAccount />
