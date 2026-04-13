<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SvelteKit Learning Playground</title>
</svelte:head>

<div class="app-shell">
	<header>
		<h1>SvelteKit Learning Playground</h1>
		<p>Hands-on examples for someone coming from React and Angular.</p>
		<nav>
			<a href="/">Overview</a>
			<a href="/counter">Counter + Reactivity</a>
			<a href="/todos">Form + List</a>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: linear-gradient(135deg, #f6f9fc 0%, #e9f2ff 100%);
		color: #1d2a38;
	}

	.app-shell {
		min-height: 100vh;
		max-width: 960px;
		margin: 0 auto;
		padding: 1.25rem;
	}

	header {
		background: #ffffffcc;
		backdrop-filter: blur(8px);
		border: 1px solid #d9e5f2;
		border-radius: 14px;
		padding: 1rem 1.25rem;
	}

	h1 {
		margin: 0;
		font-size: 1.6rem;
	}

	p {
		margin: 0.45rem 0 1rem;
	}

	nav {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	a {
		text-decoration: none;
		color: #0e5cb5;
		font-weight: 600;
		padding: 0.35rem 0.6rem;
		border: 1px solid #bed4ed;
		border-radius: 999px;
		background: #eff6ff;
	}

	main {
		margin-top: 1rem;
		background: white;
		border: 1px solid #d9e5f2;
		border-radius: 14px;
		padding: 1.25rem;
	}
</style>
