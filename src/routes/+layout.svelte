<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';
	let { children } = $props();
</script>

<nav class="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
	<ul class="flex justify-around">
		<li>
			<a
				href="/"
				class="flex flex-col items-center rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
				class:active={page.url.pathname === '/'}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7m-9 9v-6h4v6m5 0h3m-3 0a2 2 0 01-2 2H7a2 2 0 01-2-2m0 0H4m0 0h3"
					/>
				</svg>
				<span>Home</span>
			</a>
		</li>
		<li>
			<a
				href="/accounts"
				class="flex flex-col items-center rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
				class:active={page.url.pathname === '/accounts'}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				<span>Accounts</span>
			</a>
		</li>
		<li>
			<a
				href="/categories"
				class="flex flex-col items-center rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
				class:active={page.url.pathname === '/categories'}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 7h18M3 12h18m-9 5h9"
					/>
				</svg>
				<span>Categories</span>
			</a>
		</li>
		<li>
			<a
				href="/expenses"
				class="flex flex-col items-center rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
				class:active={page.url.pathname === '/expenses'}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-4.4 0-8-1.8-8-4V6c0-2.2 3.6-4 8-4s8 1.8 8 4v8c0 2.2-3.6 4-8 4z"
					/>
				</svg>
				<span>Expenses</span>
			</a>
		</li>
		<li>
			<a
				href="/login"
				class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
				class:active={page.url.pathname === '/login'}>Login</a
			>
		</li>
	</ul>
</nav>

<main class="pb-16">
	{@render children()}
</main>
