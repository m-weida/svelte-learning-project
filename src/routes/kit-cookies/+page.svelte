<script lang="ts">
	let { data, form } = $props();

	const paceExplanation: Record<string, string> = {
		focused: 'Fewer examples, deeper explanation.',
		balanced: 'A balance of explanation and practice.',
		fast: 'Short explanation and rapid hands-on tasks.'
	};
</script>

<section>
	<h2>Kit Cookies</h2>
	<p>
		This page stores lightweight learning preferences in cookies so server load and actions can share the
		same persisted state.
	</p>

	<div class="panel">
		<p><strong>Visits tracked in cookie:</strong> {data.preferences.visitCount}</p>
		<p><strong>Current pace:</strong> {data.preferences.pace}</p>
		<p>{paceExplanation[data.preferences.pace]}</p>
		<p>
			<strong>Hints:</strong>
			{data.preferences.showHints ? 'Hints are enabled for guided learning.' : 'Hints are hidden.'}
		</p>
	</div>

	<form method="POST" action="?/save" class="prefs-form">
		<label for="pace">Learning pace</label>
		<select id="pace" name="pace" value={data.preferences.pace}>
			<option value="focused">focused</option>
			<option value="balanced">balanced</option>
			<option value="fast">fast</option>
		</select>

		<label class="checkbox">
			<input type="checkbox" name="showHints" checked={data.preferences.showHints} />
			<span>Show hints</span>
		</label>

		<div class="buttons">
			<button type="submit">Save preferences</button>
		</div>
	</form>

	<form method="POST" action="?/reset" class="buttons">
		<button type="submit">Reset to defaults</button>
	</form>

	{#if form?.saved}
		<p class="success">Preferences saved. Reloading this page keeps your settings.</p>
	{/if}
	{#if form?.reset}
		<p class="success">Preferences reset.</p>
	{/if}

	<div class="exercise">
		<h3>Mini-exercise</h3>
		<p>
			Add a <code>compactMode</code> preference and use it to switch spacing styles across another route.
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

	.prefs-form {
		display: grid;
		gap: 0.5rem;
		max-width: 420px;
		margin-top: 0.8rem;
	}

	label {
		font-weight: 600;
	}

	select {
		padding: 0.4rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-input-bg);
		color: var(--color-text);
	}

	.checkbox {
		display: flex;
		gap: 0.45rem;
		align-items: center;
		font-weight: 500;
	}

	.buttons {
		margin-top: 0.4rem;
	}

	button {
		padding: 0.35rem 0.6rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-button-bg);
		color: var(--color-text);
		cursor: pointer;
	}

	.success {
		color: #2d7a34;
		font-weight: 600;
	}
</style>
