<script lang="ts">
	import { untrack } from 'svelte';

	let count = $state(0);
	let step = $state(1);
	let target = $state(12);
	let auditLog = $state<string[]>([]);

	let doubled = $derived(count * 2);
	let parity = $derived(count % 2 === 0 ? 'even' : 'odd');
	let distanceToTarget = $derived(Math.abs(target - count));
	let reachedTarget = $derived(count === target);

	function bump(direction: 'up' | 'down') {
		count += direction === 'up' ? step : -step;
	}

	function setPreset(value: number) {
		count = value;
	}

	function reset() {
		count = 0;
		step = 1;
		target = 12;
		auditLog = [];
	}

	$effect(() => {
		const currentLog = untrack(() => auditLog);
		auditLog = [...currentLog, `count changed to ${count}`].slice(-8);
	});
</script>

<section>
	<h2>Runes Lab</h2>
	<p>
		Use this page to practice <code>$state</code>, <code>$derived</code>, and <code>$effect</code> in one
		small sandbox.
	</p>

	<div class="panel">
		<div class="grid">
			<label>
				<span>Step</span>
				<input type="number" min="1" bind:value={step} />
			</label>
			<label>
				<span>Target</span>
				<input type="number" bind:value={target} />
			</label>
		</div>

		<div class="buttons">
			<button type="button" onclick={() => bump('down')}>-{step}</button>
			<button type="button" onclick={() => bump('up')}>+{step}</button>
			<button type="button" onclick={() => setPreset(target)}>Set to target</button>
			<button type="button" onclick={reset}>Reset</button>
		</div>

		<p><strong>Count:</strong> {count}</p>
		<p><strong>Doubled:</strong> {doubled}</p>
		<p><strong>Parity:</strong> {parity}</p>
		<p><strong>Distance to target:</strong> {distanceToTarget}</p>

		{#if reachedTarget}
			<p class="success">Target reached. Try changing step to make this harder.</p>
		{/if}
	</div>

	<h3>Effect audit log</h3>
	<ul>
		{#each auditLog as row, index (index)}
			<li>{row}</li>
		{/each}
	</ul>

	<div class="exercise">
		<h3>Mini-exercise</h3>
		<p>
			Start at <strong>0</strong>, set step to <strong>3</strong>, and reach the target exactly. Then
			change the target so it is impossible with that step and explain why.
		</p>
	</div>
</section>

<style>
	.panel,
	.exercise {
		border: 1px solid var(--color-border);
		border-radius: 12px;
		background: var(--color-surface-soft);
		padding: 0.9rem;
		margin-top: 0.8rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
		gap: 0.6rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-weight: 600;
	}

	input {
		padding: 0.35rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-input-bg);
		color: var(--color-text);
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
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

	.success {
		color: #2d7a34;
		font-weight: 600;
	}

	ul {
		padding-left: 1.1rem;
	}
</style>
