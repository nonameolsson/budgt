<form method="POST" action="?/seed">
	<button
		class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
		type="submit"
	>
		Seed
	</button>
</form>

<form method="POST" action="?/reset">
	<button class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700" type="submit">
		Reset Database
	</button>
</form>

<form method="POST" action="?/setUser">
	<input
		type="text"
		name="username"
		placeholder="Username"
		class="rounded border border-gray-300 p-2"
	/>
	<button
		class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
		type="submit"
	>
		Set User
	</button>
</form>
