<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		summary,
		done,
		actions
	}: {
		title: string;
		summary: string;
		done: boolean;
		actions?: Snippet;
	} = $props();
</script>

<article class="lesson-card" data-done={done}>
	<header>
		<h3>{title}</h3>
		<p>{summary}</p>
	</header>

	<div class="actions">
		{@render actions?.()}
	</div>
</article>

<style>
	.lesson-card {
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 0.85rem;
		background: var(--color-surface-soft);
	}

	.lesson-card[data-done='true'] {
		border-color: color-mix(in srgb, var(--color-primary) 45%, var(--color-border));
	}

	h3 {
		margin: 0;
	}

	p {
		margin: 0.35rem 0 0;
		color: var(--color-text-muted);
	}

	.actions {
		margin-top: 0.7rem;
	}
</style>
