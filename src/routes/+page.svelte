<script lang="ts">
	let { data } = $props();
	function addUser() {}
</script>

<div class="container mx-auto p-4">
	<form method="POST" action="?/create" class="space-y-4 rounded-lg bg-white p-6 shadow-md">
		<input
			type="text"
			required
			name="name"
			placeholder="John Doe"
			class="w-full rounded border border-gray-300 p-2"
		/>
		<input
			type="number"
			required
			name="age"
			placeholder="Age"
			class="w-full rounded border border-gray-300 p-2"
		/>
		<input
			type="email"
			required
			name="email"
			placeholder="your@email.com"
			class="w-full rounded border border-gray-300 p-2"
		/>
		<button type="submit" class="w-full rounded bg-blue-500 p-2 text-white">Create user</button>
	</form>
	<ul class="mt-6 space-y-4">
		{#each data.users as { age, name, email, id }}
			<li class="rounded-lg bg-white p-4 shadow-md">
				<div class="flex items-center justify-between">
					<span>{name}: {age}, {email}</span>
					<!-- <span>{name}: {age}, {email}, Total Expenses: {totalExpenses}</span> -->
					<form method="POST" action="?/delete" class="inline">
						<input type="hidden" name="id" value={id} />
						<button class="rounded bg-red-500 p-2 text-white">Delete</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
</div>

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
			<option value="" disabled selected>Select User</option>
			{#each data.users as { id, name }}
				<option value={id}>{name}</option>
			{/each}
		</select>
		<button type="submit" class="w-full rounded bg-blue-500 p-2 text-white">Create expense</button>
	</form>
	<ul class="mt-6 space-y-4">
		{#each data.expenses as { amount, description, date, id, userName }}
			<li class="rounded-lg bg-white p-4 shadow-md">
				<div class="flex items-center justify-between">
					<span>{description}: {amount}, {date}, User: {userName}</span>
					<form method="POST" action="?/deleteExpense" class="inline">
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
