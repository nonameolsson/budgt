<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Create Category</h1>
	<form method="POST" action="?/createCategory" class="space-y-4 rounded-lg bg-white p-6 shadow-md">
		<input
			type="text"
			required
			name="name"
			placeholder="Category Name"
			class="w-full rounded border border-gray-300 p-2"
		/>
		<div class="flex justify-between">
			<a href="/categories" class="rounded bg-gray-500 p-2 text-white">Cancel</a>
			<button type="submit" class="rounded bg-blue-500 p-2 text-white">Add</button>
		</div>
	</form>
</div>

<style>
</style>
