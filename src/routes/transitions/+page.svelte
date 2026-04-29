<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade, fly, slide } from 'svelte/transition';

	type Chip = { id: number; label: string };

	let chips = $state<Chip[]>([
		{ id: 1, label: 'State' },
		{ id: 2, label: 'Derived' },
		{ id: 3, label: 'Effects' }
	]);
	let nextId = 4;
	let showHint = $state(true);
	let reduceMotion = $state(false);

	let transitionDuration = $derived(reduceMotion ? 0 : 220);

	function addChip() {
		chips = [...chips, { id: nextId, label: `Concept ${nextId}` }];
		nextId += 1;
	}

	function removeChip(id: number) {
		chips = chips.filter((chip) => chip.id !== id);
	}

	function reverseOrder() {
		chips = [...chips].reverse();
	}
</script>

<section>
	<h2>Transitions and Animation</h2>
	<p>
		Use transitions for enter/leave behavior and animation for layout changes. Toggle reduced motion to see
		how duration changes behavior.
	</p>

	<div class="controls">
		<button type="button" onclick={addChip}>Add chip</button>
		<button type="button" onclick={reverseOrder}>Reverse order</button>
		<label>
			<input type="checkbox" bind:checked={reduceMotion} />
			Reduced motion
		</label>
	</div>

	<ul>
		{#each chips as chip (chip.id)}
			<li in:fly={{ y: 12, duration: transitionDuration }} out:fade={{ duration: transitionDuration }} animate:flip>
				<span>{chip.label}</span>
				<button type="button" onclick={() => removeChip(chip.id)}>Remove</button>
			</li>
		{/each}
	</ul>

	<button type="button" class="toggle-hint" onclick={() => (showHint = !showHint)}>
		{showHint ? 'Hide' : 'Show'} transition hint
	</button>

	{#if showHint}
		<p class="hint" transition:slide={{ duration: transitionDuration }}>
			Try adding three chips, reversing order, and removing the middle item. Notice that
			<code>animate:flip</code> smooths positional movement.
		</p>
	{/if}

	<div class="exercise">
		<h3>Mini-exercise</h3>
		<p>
			Replace the hint transition with a different one and compare how the same interaction feels.
			Then set reduced motion as the default and verify all interactions still work.
		</p>
	</div>
</section>

<style>
	.controls {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
		align-items: center;
		margin: 0.8rem 0;
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
		padding: 0;
		margin: 0;
		max-width: 500px;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.55rem;
		margin-bottom: 0.45rem;
		border: 1px solid var(--color-border);
		border-radius: 10px;
		background: var(--color-surface-soft);
	}

	.toggle-hint {
		margin-top: 0.5rem;
	}

	.hint,
	.exercise {
		margin-top: 0.8rem;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 0.85rem;
		background: var(--color-surface-soft);
	}
</style>
