<script lang="ts">
	import { kitLessons } from '$lib/kit-lessons';
</script>

<section>
	<h2>Kit Dynamic Routes</h2>
	<p>
		This page links to routes backed by <code>[lesson]</code> params. Select a lesson to see how dynamic
		params are resolved in server load.
	</p>

	<ul>
		{#each kitLessons as lesson (lesson.slug)}
			<li>
				<a href={`/kit-dynamic-routes/${lesson.slug}`}>{lesson.title}</a>
				<p>{lesson.focus}</p>
			</li>
		{/each}
	</ul>

	<div class="exercise">
		<h3>Mini-exercise</h3>
		<p>
			Add a second dynamic segment, such as <code>/kit-dynamic-routes/[lesson]/[tab]</code>, and use it to
			switch between explanation and challenge views.
		</p>
	</div>
</section>

<style>
	ul {
		list-style: none;
		padding-left: 0;
		max-width: 700px;
	}

	li {
		padding: 0.7rem;
		margin: 0.5rem 0;
		border: 1px solid var(--color-border);
		border-radius: 10px;
		background: var(--color-surface-soft);
	}

	a {
		color: var(--color-link);
		font-weight: 700;
		text-decoration: none;
	}

	li p {
		margin: 0.35rem 0 0;
		color: var(--color-text-muted);
	}

	.exercise {
		margin-top: 1rem;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 0.9rem;
		background: var(--color-surface-soft);
	}
</style>
