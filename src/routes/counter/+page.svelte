<script lang="ts">
	let count = $state(0);
	let step = $state(1);
	let history = $state<number[]>([]);
	let doubled = $derived(count * 2);

	function increment() {
		count += step;
		history = [...history, count];
	}

	function decrement() {
		count -= step;
		history = [...history, count];
	}

	function reset() {
		count = 0;
		history = [];
	}

	$effect(() => {
		if (history.length > 8) {
			history = history.slice(-8);
		}
	});
</script>

<section>
	<h2>Counter + Reactivity</h2>
	<p>
		Think of <code>$state</code> as local component state and <code>$derived</code> as a lightweight
		computed value.
	</p>

	<div class="panel">
		<label for="step">Step</label>
		<input id="step" type="number" min="1" bind:value={step} />

		<div class="buttons">
			<button type="button" onclick={decrement}>-{step}</button>
			<button type="button" onclick={increment}>+{step}</button>
			<button type="button" onclick={reset}>Reset</button>
		</div>

		<p><strong>Count:</strong> {count}</p>
		<p><strong>Doubled:</strong> {doubled}</p>
	</div>

	<h3>Recent values</h3>
	{#if history.length === 0}
		<p>No history yet. Click increment or decrement.</p>
	{:else}
		<ul>
			{#each history as entry, index (index)}
				<li>{entry}</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.panel {
		border: 1px solid #d8e8f8;
		background: #f7fbff;
		padding: 0.9rem;
		border-radius: 12px;
		max-width: 420px;
	}

	label {
		display: block;
		margin-bottom: 0.3rem;
		font-weight: 600;
	}

	input {
		max-width: 90px;
		margin-bottom: 0.75rem;
		padding: 0.3rem;
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	button {
		padding: 0.35rem 0.6rem;
		border: 1px solid #c6d8eb;
		border-radius: 8px;
		background: white;
		cursor: pointer;
	}

	ul {
		padding-left: 1.1rem;
	}
</style>
