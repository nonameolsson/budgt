<script lang="ts">
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';

	let { data } = $props();
	let isModalVisible = $state(false);
	let selectedAccountId: string | null = $state(null);
	function showDeleteModal(accountId: string) {
		selectedAccountId = accountId;
		isModalVisible = true;
	}

	function handleCancel() {
		isModalVisible = false;
		selectedAccountId = null;
	}

	async function handleSetPrimary(accountId: string) {
		const formData = new FormData();
		formData.append('id', accountId);

		await fetch('/accounts/setPrimaryAccount', {
			method: 'POST',
			body: formData
		});
	}
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
				<span>{account.balance}:-</span>
				<a href={`/accounts/edit/${account.id}`} class="rounded bg-yellow-500 p-2 text-white">
					Edit
				</a>
				<button
					onclick={() => showDeleteModal(account.id)}
					class="rounded bg-red-500 p-2 text-white">Delete</button
				>
				<button
					onclick={() => handleSetPrimary(account.id)}
					class="rounded bg-green-500 p-2 text-white">Set as Primary</button
				>
			</li>
		{/each}
	</ul>
</div>

<ConfirmModal visible={isModalVisible} id={selectedAccountId} onCancel={handleCancel} />
