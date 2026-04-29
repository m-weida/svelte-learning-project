<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import CapstoneList from '$lib/capstone/CapstoneList.svelte';
	import {
		STATUS_LABELS,
		STATUS_ORDER,
		type LearningItem,
		type LearningStatus
	} from '$lib/capstone/types';

	let { data, form } = $props();
	let itemsPromise = $derived(data.items as Promise<LearningItem[]>);
	let theme = $state('');
	let density = $state('');

	let createPending = $state(false);
	let selectedId = $state<string | null>(null);
	let lastSelectedId = $state<string | null>(null);
	let editTitle = $state('');
	let editStatus = $state<LearningStatus>('todo');

	const themeOptions = [
		{ value: 'breeze', label: 'Breeze' },
		{ value: 'ember', label: 'Ember' }
	];

	const densityOptions = [
		{ value: 'cozy', label: 'Cozy' },
		{ value: 'compact', label: 'Compact' }
	];

	$effect(() => {
		theme = data.preferences.theme;
		density = data.preferences.density;
	});

	type UpdateOptions = {
		reset?: boolean;
		invalidateAll?: boolean;
	};

	const enhanceWith = (
		onStart?: () => void,
		onDone?: () => void,
		updateOptions?: UpdateOptions
	) => {
		return () => {
			onStart?.();
			return async ({ update }: { update: (options?: UpdateOptions) => Promise<void> }) => {
				await update(updateOptions);
				onDone?.();
			};
		};
	};

	function handleSelect(items: LearningItem[], id: string) {
		const next = items.find((item) => item.id === id);
		if (!next) {
			return;
		}

		selectedId = next.id;
		editTitle = next.title;
		editStatus = next.status;
	}

	$effect(() => {
		if (form?.updateSuccess && typeof form?.selectedId === 'string') {
			selectedId = form.selectedId;
			return;
		}
	});

	$effect(() => {
		if (selectedId === lastSelectedId) {
			return;
		}

		if (!selectedId) {
			lastSelectedId = null;
			return;
		}

		let cancelled = false;

		itemsPromise.then((items) => {
			if (cancelled) {
				return;
			}

			const next = items.find((item) => item.id === selectedId);
			if (!next) {
				return;
			}

			editTitle = next.title;
			editStatus = next.status;
			lastSelectedId = selectedId;
		});

		return () => {
			cancelled = true;
		};
	});
</script>

<section
	class="capstone"
	data-density={density}
	data-theme={theme}
>
	<header class="capstone-header">
		<h2>Capstone: Learning Tracker</h2>
		<p>
			Combine load, actions, endpoints, transitions, and cookie-backed preferences into one
			workflow.
		</p>
	</header>

	{#await itemsPromise}
		<div class="capstone-grid">
			<section class="panel">
				<h3>Loading items</h3>
				<p class="muted">Fetching the tracker list from the capstone API...</p>
			</section>
			<aside class="side-panel">
				<section class="panel">
					<h3>Preferences</h3>
					<p class="muted">Loading preferences from cookies...</p>
				</section>
				<section class="panel">
					<h3>Details</h3>
					<p class="muted">Select a learning item to edit it.</p>
				</section>
			</aside>
		</div>
	{:then items}
		{@const selected = items.find((item) => item.id === selectedId)}
		<div class="capstone-grid">
			<section class="panel">
				<h3>New learning item</h3>
				<form
					method="POST"
					action="?/create"
					use:enhance={enhanceWith(
						() => {
							createPending = true;
						},
						() => {
							createPending = false;
						}
					)}
					class="stack"
				>
					<label for="title">Title</label>
					<input
						id="title"
						name="title"
						maxlength="80"
						placeholder="Example: add an endpoint walkthrough"
						value={form?.title ?? ''}
					/>

					<label for="status">Starting status</label>
					<select id="status" name="status" value={form?.status ?? 'todo'}>
						{#each STATUS_ORDER as status (status)}
							<option value={status}>{STATUS_LABELS[status]}</option>
						{/each}
					</select>

					<button type="submit" disabled={createPending}>
						{createPending ? 'Adding...' : 'Add item'}
					</button>
				</form>

				{#if form?.createError}
					<p class="error">{form.createError}</p>
				{/if}
				{#if form?.createSuccess}
					<p class="success">Item created.</p>
				{/if}

				<h3 class="section-title">Learning items</h3>
				<p class="muted">Loaded {items.length} items from /capstone/api/items.</p>
				<CapstoneList
					{items}
					{selectedId}
					onSelect={(id) => handleSelect(items, id)}
				>
					{#snippet actions(item)}
						<form method="POST" action="?/advance" use:enhance={enhanceWith()}>
							<input type="hidden" name="id" value={item.id} />
							<button type="submit" disabled={item.status === 'done'}>
								Advance
							</button>
						</form>
						<form
							method="POST"
							action="?/remove"
							use:enhance={enhanceWith(undefined, () => {
								if (selectedId === item.id) {
									selectedId = null;
								}
							})}
						>
							<input type="hidden" name="id" value={item.id} />
							<button type="submit" class="danger">Remove</button>
						</form>
					{/snippet}
				</CapstoneList>
			</section>

			<aside class="side-panel">
				<section class="panel">
					<h3>Preferences</h3>
					<div class="stack">
						<form
							method="POST"
							action="?/preferences"
							use:enhance={enhanceWith(undefined, undefined, { reset: false })}
							class="stack"
						>
							<label for="theme">Theme</label>
							<select id="theme" name="theme" bind:value={theme}>
								{#each themeOptions as option (option.value)}
									<option value={option.value}>{option.label}</option>
								{/each}
							</select>

							<label for="density">Density</label>
							<select id="density" name="density" bind:value={density}>
								{#each densityOptions as option (option.value)}
									<option value={option.value}>{option.label}</option>
								{/each}
							</select>

							<button type="submit">Save preferences</button>
						</form>

						<form
							method="POST"
							action="?/resetPreferences"
							use:enhance={enhanceWith(undefined, undefined, { reset: false })}
						>
							<button type="submit" class="ghost">Reset to defaults</button>
						</form>
					</div>

					{#if form?.preferencesSaved}
						<p class="success">Preferences saved.</p>
					{/if}
					{#if form?.preferencesReset}
						<p class="success">Preferences reset.</p>
					{/if}
				</section>

				<section class="panel">
					<h3>Details</h3>
					{#if selected}
						<div class="detail-card" transition:fade>
							<form
								method="POST"
								action="?/update"
								use:enhance={enhanceWith(undefined, undefined, { reset: false })}
								class="stack"
							>
								<input type="hidden" name="id" value={selected.id} />
								<label for="edit-title">Title</label>
								<input
									id="edit-title"
									name="title"
									maxlength="80"
									bind:value={editTitle}
								/>

								<label for="edit-status">Status</label>
								<select id="edit-status" name="status" bind:value={editStatus}>
									{#each STATUS_ORDER as status (status)}
										<option value={status}>{STATUS_LABELS[status]}</option>
									{/each}
								</select>

								<button type="submit">Save changes</button>
							</form>

							<div class="detail-meta">
								<p>Created: {new Date(selected.createdAt).toLocaleString()}</p>
								<p>Updated: {new Date(selected.updatedAt).toLocaleString()}</p>
							</div>
						</div>
					{:else}
						<p class="muted">Select a learning item to edit it.</p>
					{/if}

					{#if form?.updateError}
						<p class="error">{form.updateError}</p>
					{/if}
					{#if form?.updateSuccess}
						<p class="success">Item updated.</p>
					{/if}
					{#if form?.advanceError}
						<p class="error">{form.advanceError}</p>
					{/if}
					{#if form?.removeError}
						<p class="error">{form.removeError}</p>
					{/if}
				</section>
			</aside>
		</div>
	{/await}
</section>

<style>
	.capstone {
		--capstone-accent: #2f6feb;
		--capstone-border: color-mix(in srgb, var(--color-border) 70%, transparent);
		--capstone-surface: color-mix(in srgb, var(--color-surface) 90%, transparent);
		--capstone-surface-strong: color-mix(in srgb, var(--color-surface) 96%, transparent);
		--capstone-pill-bg: color-mix(in srgb, var(--color-primary) 18%, var(--color-surface));
		--capstone-pill-text: var(--color-primary);
	}

	.capstone[data-theme='ember'] {
		--capstone-accent: #d2562a;
		--capstone-pill-bg: color-mix(in srgb, #d2562a 20%, var(--color-surface));
		--capstone-pill-text: #d2562a;
	}

	.capstone[data-density='compact'] .panel,
	.capstone[data-density='compact'] input,
	.capstone[data-density='compact'] select {
		font-size: 0.92rem;
	}

	.capstone-header {
		margin-bottom: 1.25rem;
	}

	.capstone-header p {
		color: var(--color-text-muted);
		max-width: 620px;
	}

	.capstone-grid {
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
		gap: 1rem;
		align-items: start;
	}

	.panel {
		border: 1px solid var(--capstone-border);
		border-radius: 16px;
		background: var(--capstone-surface);
		padding: 1rem;
		box-shadow: 0 16px 30px -30px color-mix(in srgb, var(--capstone-accent) 40%, transparent);
	}

	.side-panel {
		display: grid;
		gap: 1rem;
	}

	.stack {
		display: grid;
		gap: 0.5rem;
	}

	.section-title {
		margin-top: 1.2rem;
	}

	label {
		font-weight: 600;
	}

	input,
	select {
		padding: 0.45rem 0.6rem;
		border-radius: 10px;
		border: 1px solid var(--capstone-border);
		background: var(--color-input-bg);
		color: var(--color-text);
	}

	button {
		padding: 0.45rem 0.75rem;
		border-radius: 10px;
		border: 1px solid var(--capstone-border);
		background: color-mix(in srgb, var(--capstone-accent) 12%, var(--color-button-bg));
		color: var(--color-text);
		font-weight: 600;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.6;
		cursor: progress;
	}

	button.ghost {
		background: transparent;
		color: var(--color-text-muted);
	}

	button.danger {
		background: color-mix(in srgb, #d2562a 12%, var(--color-button-bg));
		color: #a43f1d;
	}

	.detail-card {
		display: grid;
		gap: 0.7rem;
	}

	.detail-meta {
		font-size: 0.85rem;
		color: var(--color-text-muted);
	}

	.muted {
		color: var(--color-text-muted);
		margin: 0.2rem 0 0;
	}

	.error {
		color: #a93a2f;
		font-weight: 600;
	}

	.success {
		color: #2d7a34;
		font-weight: 600;
	}

	@media (max-width: 900px) {
		.capstone-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
