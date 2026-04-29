<script lang="ts">
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	import { STATUS_LABELS, type LearningItem } from './types';

	let {
		items,
		selectedId,
		actions,
		onSelect
	}: {
		items: LearningItem[];
		selectedId: string | null;
		actions?: Snippet<[LearningItem]>;
		onSelect?: (id: string) => void;
	} = $props();

	function handleSelect(id: string) {
		onSelect?.(id);
	}
</script>

<ul class="capstone-list">
	{#each items as item (item.id)}
		<li animate:flip transition:slide data-selected={item.id === selectedId}>
			<button type="button" class="item-main" onclick={() => handleSelect(item.id)}>
				<span class="title">{item.title}</span>
				<span class="status" data-status={item.status}>{STATUS_LABELS[item.status]}</span>
			</button>
			{#if actions}
				<div class="item-actions">
					{@render actions(item)}
				</div>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.capstone-list {
		list-style: none;
		padding: 0;
		margin: 0.75rem 0 0;
		display: grid;
		gap: 0.65rem;
	}

	li {
		border: 1px solid var(--capstone-border);
		border-radius: 14px;
		background: var(--capstone-surface);
		padding: 0.65rem;
		box-shadow: 0 8px 22px -18px color-mix(in srgb, var(--capstone-accent) 40%, transparent);
	}

	li[data-selected='true'] {
		border-color: color-mix(in srgb, var(--capstone-accent) 60%, var(--capstone-border));
		background: var(--capstone-surface-strong);
	}

	.item-main {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		width: 100%;
		background: transparent;
		border: none;
		padding: 0;
		color: inherit;
		text-align: left;
		cursor: pointer;
		font-size: 1rem;
	}

	.title {
		font-weight: 600;
	}

	.status {
		border-radius: 999px;
		padding: 0.2rem 0.6rem;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		background: var(--capstone-pill-bg);
		color: var(--capstone-pill-text);
	}

	.status[data-status='in-progress'] {
		background: color-mix(in srgb, var(--capstone-accent) 18%, var(--capstone-surface));
		color: var(--capstone-accent);
	}

	.status[data-status='done'] {
		background: color-mix(in srgb, var(--capstone-accent) 32%, var(--capstone-surface));
		color: var(--capstone-accent);
	}

	.item-actions {
		margin-top: 0.6rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
</style>
