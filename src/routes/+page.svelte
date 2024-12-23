<script lang="ts">
	let { data } = $props();
	console.log(data);

	function addUser() {}
</script>

<div>
	<form method="POST">
		<button type="submit">Add user</button>
	</form>
	<ul>
		{#each data.users as { age, id }}
			<li>{id}: {age}</li>
		{/each}
	</ul>
</div>

<style>
</style>
