<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<form method="POST" action="?/createExpense" class="space-y-4 rounded-lg bg-white p-6 shadow-md">
		<input
			type="number"
			required
			name="amount"
			placeholder="Amount"
			class="w-full rounded border border-gray-300 p-2"
		/>
		<input
			type="text"
			required
			name="description"
			placeholder="Description"
			class="w-full rounded border border-gray-300 p-2"
		/>
		<input type="date" required name="date" class="w-full rounded border border-gray-300 p-2" />
		<select name="userId" required class="w-full rounded border border-gray-300 p-2">
			<option value="" disabled selected>Select Account</option>
			{#each data.accounts as { id, name }}
				<option value={id}>{name}</option>
			{/each}
		</select>
		<button type="submit" class="w-full rounded bg-blue-500 p-2 text-white">Create expense</button>
	</form>
	<ul class="mt-6 space-y-4">
		{#each data.expenses as { amount, description, date, id }}
			<li class="rounded-lg bg-white p-4 shadow-md">
				<div class="flex items-center justify-between">
					<span>{description}: {amount}, {date}</span>
					<form method="POST" action="?/deleteExpense" class="inline">
						<input type="hidden" name="id" value={id} />
						<button class="rounded bg-red-500 p-2 text-white">Delete</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
</div>

<div class="container mx-auto p-4">
	<form method="POST" action="?/createAccount" class="space-y-4 rounded-lg bg-white p-6 shadow-md">
		<input
			type="text"
			required
			name="name"
			placeholder="Account Name"
			class="w-full rounded border border-gray-300 p-2"
		/>
		<input
			type="number"
			required
			name="balance"
			placeholder="Balance"
			class="w-full rounded border border-gray-300 p-2"
		/>
		<button type="submit" class="w-full rounded bg-blue-500 p-2 text-white">Create account</button>
	</form>
	<ul class="mt-6 space-y-4">
		{#each data.accounts as { name, balance, id }}
			<li class="rounded-lg bg-white p-4 shadow-md">
				<div class="flex items-center justify-between">
					<span>{name}: {balance}</span>
					<form method="POST" action="?/deleteAccount" class="inline">
						<input type="hidden" name="id" value={id} />
						<button class="rounded bg-red-500 p-2 text-white">Delete</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
</div>

<div class="container mx-auto p-4">
	<form method="POST" action="?/createCategory" class="space-y-4 rounded-lg bg-white p-6 shadow-md">
		<input
			type="text"
			required
			name="name"
			placeholder="Category Name"
			class="w-full rounded border border-gray-300 p-2"
		/>
		<button type="submit" class="w-full rounded bg-blue-500 p-2 text-white">Create category</button>
	</form>
	<ul class="mt-6 space-y-4">
		{#each data.categories as { name, id }}
			<li class="rounded-lg bg-white p-4 shadow-md">
				<div class="flex items-center justify-between">
					<span>{name}</span>
					<form method="POST" action="?/deleteCategory" class="inline">
						<input type="hidden" name="id" value={id} />
						<button class="rounded bg-red-500 p-2 text-white">Delete</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
