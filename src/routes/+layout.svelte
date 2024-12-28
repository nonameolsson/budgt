<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';
	let { children } = $props();
</script>

<nav class="bg-gray-800 p-4">
	<ul class="flex space-x-4">
		<li>
			<a
				href="/"
				class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
				class:active={page.url.pathname === '/'}>Home</a
			>
		</li>
		<li>
			<a
				href="/accounts"
				class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
				class:active={page.url.pathname === '/accounts'}>Accounts</a
			>
		</li>
		<li>
			<a
				href="/categories"
				class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
				class:active={page.url.pathname === '/categories'}>Categories</a
			>
		</li>
		<li>
			<a
				href="/expenses"
				class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
				class:active={page.url.pathname === '/expenses'}>Expenses</a
			>
		</li>
	</ul>
</nav>

<main>
	{@render children()}
</main>
