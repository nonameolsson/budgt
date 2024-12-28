<script lang="ts">
	export let visible: boolean;
	export let id: string | null;
	export let onCancel: () => void;
</script>

{#if visible}
	<form method="POST" action="?/deleteAccount">
		<input type="hidden" name="id" value={id} />
		<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
			<div class="rounded bg-white p-6 shadow-md">
				<h2 class="mb-4 text-xl font-bold">Confirm Deletion</h2>
				<p class="mb-4">
					Are you sure you want to delete this account? This action cannot be undone and will delete
					all related expenses.
				</p>
				<div class="flex justify-end space-x-4">
					<button on:click={onCancel} class="rounded bg-gray-500 px-4 py-2 text-white"
						>Cancel</button
					>
					<button type="submit" class="rounded bg-red-500 px-4 py-2 text-white">Proceed</button>
				</div>
			</div>
		</div>
	</form>
{/if}
