<script lang="ts">
	let { data } = $props();
	function addUser() {}
</script>

<div class="container mx-auto p-4">
	<form method="POST" action="?/create" class="space-y-4 bg-white p-6 rounded-lg shadow-md">
		<input type="text" required name="name" placeholder="John Doe" class="w-full p-2 border border-gray-300 rounded" />
		<input type="number" required name="age" placeholder="Age" class="w-full p-2 border border-gray-300 rounded" />
		<input type="email" required name="email" placeholder="your@email.com" class="w-full p-2 border border-gray-300 rounded" />
		<button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">Create user</button>
	</form>
	<ul class="mt-6 space-y-4">
		{#each data.users as { age, name, email, id }}
			<li class="bg-white p-4 rounded-lg shadow-md">
				<div class="flex justify-between items-center">
					<span>{name}: {age}, {email}</span>
					<form method="POST" action="?/delete" class="inline">
						<input type="hidden" name="id" value={id} />
						<button class="bg-red-500 text-white p-2 rounded">Delete</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
</div>

<div class="container mx-auto p-4">
	<form method="POST" action="?/createExpense" class="space-y-4 bg-white p-6 rounded-lg shadow-md">
		<input type="number" required name="amount" placeholder="Amount" class="w-full p-2 border border-gray-300 rounded" />
		<input type="text" required name="description" placeholder="Description" class="w-full p-2 border border-gray-300 rounded" />
		<input type="date" required name="date" class="w-full p-2 border border-gray-300 rounded" />
		<button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">Create expense</button>
	</form>
	<ul class="mt-6 space-y-4">
		{#each data.expenses as { amount, description, date, id }}
			<li class="bg-white p-4 rounded-lg shadow-md">
				<div class="flex justify-between items-center">
					<span>{description}: {amount}, {date}</span>
					<form method="POST" action="?/deleteExpense" class="inline">
						<input type="hidden" name="id" value={id} />
						<button class="bg-red-500 text-white p-2 rounded">Delete</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
