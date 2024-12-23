<script lang="ts">
	let { data } = $props();
	function addUser() {}
</script>

<div>
	<form method="POST" action="?/create">
		<input type="text" required name="name" placeholder="John Doe" />
		<input type="number" required name="age" placeholder="Age" />
		<input type="email" required name="email" placeholder="your@email.com" />
		<button type="submit">Create user</button>
	</form>
	<ul>
		{#each data.users as { age, name, email, id }}
			<li>
				<div>
					{name}: {age}, {email} -
					<form method="POST" action="?/delete">
						<input type="hidden" name="id" value={id} />
						<button>Delete</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
