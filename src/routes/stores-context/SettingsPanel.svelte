<script lang="ts">
	import { getContext } from 'svelte';
	import type { WorkspaceSettingsStore } from './context';
	import { workspaceSettingsKey } from './context';

	const settings = getContext<WorkspaceSettingsStore>(workspaceSettingsKey);

	function updateAccent(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		settings.update((value) => ({ ...value, accent: target.value }));
	}

	function toggleDense() {
		settings.update((value) => ({ ...value, denseMode: !value.denseMode }));
	}
</script>

<div class="panel" style={`--local-accent: ${$settings.accent}`}>
	<h3>Context consumer</h3>
	<p>This child component reads and updates shared settings via <code>getContext</code>.</p>

	<label>
		<span>Accent color</span>
		<input type="color" value={$settings.accent} onchange={updateAccent} />
	</label>

	<button type="button" onclick={toggleDense}>
		Dense mode: {$settings.denseMode ? 'On' : 'Off'}
	</button>
</div>

<style>
	.panel {
		border: 1px solid var(--color-border);
		border-left: 4px solid var(--local-accent);
		border-radius: 12px;
		padding: 0.85rem;
		background: var(--color-surface-soft);
	}

	p {
		margin: 0.35rem 0 0.75rem;
		color: var(--color-text-muted);
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-right: 0.75rem;
	}

	button {
		padding: 0.35rem 0.6rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-button-bg);
		color: var(--color-text);
		cursor: pointer;
	}
</style>
