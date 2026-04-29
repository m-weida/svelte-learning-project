<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let addPending = $state(false);
</script>

<section>
	<h2>Kit Actions</h2>
	<p>
		This page uses named form actions in <code>+page.server.ts</code>. The add form is progressively
		enhanced with <code>use:enhance</code>, so it submits without a full page reload when JavaScript is
		available.
	</p>

	<form
		method="POST"
		action="?/add"
		use:enhance={() => {
			addPending = true;
			return async ({ update }) => {
				await update();
				addPending = false;
			};
		}}
		class="guestbook-form"
	>
		<label for="message">Add a note</label>
		<input
			id="message"
			name="message"
			maxlength="140"
			placeholder="Example: use:enhance keeps this smooth"
			value={form?.message ?? ''}
		/>
		<button type="submit" disabled={addPending}>{addPending ? 'Adding...' : 'Add note'}</button>
	</form>

	{#if form?.addError}
		<p class="error">{form.addError}</p>
	{/if}
	{#if form?.addSuccess}
		<p class="success">Entry added.</p>
	{/if}

	<div class="actions-row">
		<form method="POST" action="?/clear">
			<button type="submit">Clear all</button>
		</form>
	</div>

	{#if data.entries.length === 0}
		<p>No entries yet.</p>
	{:else}
		<ul>
			{#each data.entries as entry (entry.id)}
				<li>
					<div>
						<p>{entry.message}</p>
						<small>{new Date(entry.createdAt).toLocaleString()}</small>
					</div>
					<form method="POST" action="?/remove">
						<input type="hidden" name="id" value={entry.id} />
						<button type="submit">Delete</button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="exercise">
		<h3>Mini-exercise</h3>
		<p>
			Add an edit action that updates an entry in-place, and show a validation error when edited text is
			empty.
		</p>
	</div>
</section>

<style>
	.guestbook-form {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.45rem;
		max-width: 640px;
		margin-top: 0.85rem;
	}

	label {
		grid-column: 1 / -1;
		font-weight: 600;
	}

	input {
		padding: 0.42rem;
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

	button:disabled {
		opacity: 0.6;
		cursor: progress;
	}

	.actions-row {
		margin: 0.75rem 0;
	}

	ul {
		list-style: none;
		padding-left: 0;
		max-width: 700px;
	}

	li {
		display: flex;
		justify-content: space-between;
		gap: 0.7rem;
		align-items: start;
		padding: 0.65rem;
		border: 1px solid var(--color-border);
		border-radius: 10px;
		background: var(--color-surface-soft);
		margin: 0.45rem 0;
	}

	li p {
		margin: 0;
	}

	small {
		color: var(--color-text-muted);
	}

	.error {
		color: #a93a2f;
		font-weight: 600;
	}

	.success {
		color: #2d7a34;
		font-weight: 600;
	}

	.exercise {
		margin-top: 1rem;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 0.9rem;
		background: var(--color-surface-soft);
	}
</style>
