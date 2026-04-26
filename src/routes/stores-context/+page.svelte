<script lang="ts">
	import { setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import SettingsPanel from './SettingsPanel.svelte';
	import type { WorkspaceSettings } from './context';
	import { workspaceSettingsKey } from './context';

	const settings = writable<WorkspaceSettings>({
		accent: '#0e5cb5',
		denseMode: false
	});

	setContext(workspaceSettingsKey, settings);

	const notes = writable<string[]>([]);
	let draft = $state('');

	const noteSummary = derived(notes, ($notes) => ({
		total: $notes.length,
		empty: $notes.length === 0
	}));

	function addNote(event: SubmitEvent) {
		event.preventDefault();
		const text = draft.trim();
		if (!text) {
			return;
		}

		notes.update((list) => [...list, text]);
		draft = '';
	}

	function clearNotes() {
		notes.set([]);
	}
</script>

<section>
	<h2>Stores + Context</h2>
	<p>
		Use stores for shared reactive data and context to pass scoped dependencies through component trees.
	</p>

	<SettingsPanel />

	<form onsubmit={addNote} class:compact={$settings.denseMode}>
		<input bind:value={draft} placeholder="Add shared note" />
		<button type="submit">Add note</button>
		<button type="button" onclick={clearNotes}>Clear</button>
	</form>

	<p><strong>Total notes:</strong> {$noteSummary.total}</p>

	{#if $noteSummary.empty}
		<p>No notes yet.</p>
	{:else}
		<ul class:compact={$settings.denseMode} style={`--accent: ${$settings.accent}`}>
			{#each $notes as note, index (index)}
				<li>{note}</li>
			{/each}
		</ul>
	{/if}

	<div class="exercise">
		<h3>Mini-exercise</h3>
		<p>
			Extract the note list into a child component that consumes context for styling. Then move note state to
			a separate module-level store and reuse it from another route.
		</p>
	</div>
</section>

<style>
	form {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin: 0.9rem 0;
	}

	form.compact {
		gap: 0.3rem;
	}

	input {
		padding: 0.4rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-input-bg);
		color: var(--color-text);
	}

	button {
		padding: 0.35rem 0.6rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-button-bg);
		color: var(--color-text);
		cursor: pointer;
	}

	ul {
		list-style: none;
		padding-left: 0;
		max-width: 540px;
	}

	ul.compact li {
		padding: 0.3rem 0.45rem;
	}

	li {
		padding: 0.5rem 0.55rem;
		border: 1px solid var(--color-border);
		border-left: 4px solid var(--accent);
		border-radius: 9px;
		background: var(--color-surface-soft);
		margin-bottom: 0.45rem;
	}

	.exercise {
		margin-top: 1rem;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 0.85rem;
		background: var(--color-surface-soft);
	}
</style>
