<script lang="ts">
	let { data } = $props();
	import { enhance } from '$app/forms';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';

	let isModalVisible = false;
	let selectedAccountId: string | null = null;

	function showModal(accountId: string) {
		selectedAccountId = accountId;
		isModalVisible = true;
	}

	function hideModal() {
		selectedAccountId = null;
		isModalVisible = false;
	}

	async function proceedDelete() {
		if (selectedAccountId) {
			const formData = new FormData();
			formData.append('id', selectedAccountId);

			await fetch('?/deleteAccount', {
				method: 'POST',
				body: formData
			});

			hideModal();
			location.reload();
		}
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
				<button on:click={() => showModal(account.id)} class="rounded bg-red-500 p-2 text-white">
					Delete
				</button>
			</li>
		{/each}
	</ul>
</div>

<ConfirmModal
	isVisible={isModalVisible}
	onProceed={proceedDelete}
	onCancel={hideModal}
/>

<style>
</style>
