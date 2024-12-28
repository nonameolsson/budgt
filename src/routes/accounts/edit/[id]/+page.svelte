<script lang="ts">
	import { enhance } from '$app/forms';
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Edit Account</h1>
	<form
		method="POST"
		use:enhance
		action="?/updateAccount"
		class="space-y-4 rounded-lg bg-white p-6 shadow-md"
	>
		<input
			type="text"
			required
			name="name"
			placeholder="Account Name"
			value={data.account?.name}
			class="w-full rounded border border-gray-300 p-2"
		/>
		<input
			type="number"
			required
			name="balance"
			placeholder="Balance"
			value={data.account?.balance}
			class="w-full rounded border border-gray-300 p-2"
		/>
		<div class="flex justify-between">
			<a href="/accounts" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
			<button type="submit" class="rounded bg-blue-500 p-2 text-white">Save</button>
		</div>
	</form>
</div>

<style>
</style>
