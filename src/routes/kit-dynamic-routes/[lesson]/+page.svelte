<script lang="ts">
	let { data } = $props();
</script>

<section>
	<h2>{data.lesson.title}</h2>
	<p><strong>Focus:</strong> {data.lesson.focus}</p>
	<p>{data.lesson.summary}</p>

	<div class="exercise">
		<h3>Challenge</h3>
		<p>{data.lesson.exercise}</p>
	</div>

	<nav>
		<a href="/kit-dynamic-routes">Back to lesson list</a>
		{#if data.previous}
			<a href={`/kit-dynamic-routes/${data.previous.slug}`}>Previous: {data.previous.title}</a>
		{/if}
		{#if data.next}
			<a href={`/kit-dynamic-routes/${data.next.slug}`}>Next: {data.next.title}</a>
		{/if}
	</nav>
</section>

<style>
	.exercise {
		margin: 0.9rem 0;
		padding: 0.9rem;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		background: var(--color-surface-soft);
	}

	nav {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	a {
		text-decoration: none;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		padding: 0.32rem 0.62rem;
		background: var(--color-button-bg);
		color: var(--color-link);
		font-weight: 600;
	}
</style>
