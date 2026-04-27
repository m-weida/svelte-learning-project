<script lang="ts">
	let { data } = $props();

	const levelOptions = ['all', 'beginner', 'intermediate', 'advanced'];
</script>

<section>
	<h2>Kit Load</h2>
	<p>
		This page uses <code>+page.server.ts</code> to fetch and filter data on the server before rendering.
	</p>

	<div class="panel">
		<h3>Filter by level</h3>
		<div class="chips">
			{#each levelOptions as option}
				<a class:selected={data.level === option} href={`/kit-load?level=${option}`}>{option}</a>
			{/each}
		</div>
		<p><strong>Visible:</strong> {data.visibleCount} / {data.totalCount}</p>
		<p><strong>Server fetched at:</strong> {new Date(data.fetchedAt).toLocaleTimeString()}</p>
	</div>

	<ul>
		{#each data.announcements as announcement (announcement.id)}
			<li>
				<strong>{announcement.title}</strong>
				<p>{announcement.note}</p>
				<span class="badge">{announcement.level}</span>
			</li>
		{/each}
	</ul>

	<div class="exercise">
		<h3>Mini-exercise</h3>
		<p>
			Add a second query parameter for sorting, then update the server load function so sorting happens
			before data is returned.
		</p>
	</div>
</section>

<style>
	.panel,
	.exercise {
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 0.9rem;
		background: var(--color-surface-soft);
		margin-top: 0.8rem;
	}

	.chips {
		display: flex;
		gap: 0.45rem;
		flex-wrap: wrap;
		margin: 0.55rem 0;
	}

	a {
		text-decoration: none;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		padding: 0.25rem 0.65rem;
		background: var(--color-button-bg);
		color: var(--color-text);
	}

	a.selected {
		border-color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 18%, var(--color-surface));
	}

	ul {
		list-style: none;
		padding-left: 0;
		max-width: 620px;
	}

	li {
		border: 1px solid var(--color-border);
		border-radius: 10px;
		padding: 0.7rem;
		margin: 0.55rem 0;
		background: var(--color-surface);
	}

	li p {
		margin: 0.4rem 0;
	}

	.badge {
		display: inline-block;
		padding: 0.12rem 0.45rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		font-size: 0.82rem;
		text-transform: capitalize;
	}
</style>
