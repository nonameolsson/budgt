<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let { selectedAccount = $bindable() } = $props();
</script>

{#if selectedAccount}
	<form
		method="POST"
		action="?/deleteAccount"
		use:enhance={() => {
			selectedAccount = null;

			return async ({ result }) => {
				selectedAccount = null;
				if (result.type === 'redirect') {
					goto(result.location);
				} else {
					await applyAction(result);
				}
			};
		}}
	>
		<input type="hidden" name="id" value={selectedAccount} />
		<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
			<div class="rounded bg-white p-6 shadow-md">
				<h2 class="mb-4 text-xl font-bold">Confirm Deletion</h2>
				<p class="mb-4">
					Are you sure you want to delete this account? This action cannot be undone and will delete
					all related expenses.
				</p>
				<div class="flex justify-end space-x-4">
					<button
						onclick={() => (selectedAccount = null)}
						class="rounded bg-gray-500 p-2 text-white"
					>
						Cancel
					</button>
					<button type="submit" class="rounded bg-red-500 px-4 py-2 text-white">Delete</button>
				</div>
			</div>
		</div>
	</form>
{/if}
