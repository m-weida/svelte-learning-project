<script lang="ts">
	let { done = 0, total = 1 }: { done?: number; total?: number } = $props();
	let percentage = $derived(total === 0 ? 0 : Math.round((done / total) * 100));
</script>

<div class="meter" role="status" aria-label="Progress meter">
	<div class="label">Progress: {done}/{total} ({percentage}%)</div>
	<div class="track" aria-hidden="true">
		<div class="fill" style={`width: ${percentage}%`}></div>
	</div>
</div>

<style>
	.meter {
		border: 1px solid var(--color-border);
		border-radius: 10px;
		padding: 0.65rem;
		background: var(--color-surface-soft);
	}

	.label {
		font-weight: 600;
		margin-bottom: 0.35rem;
	}

	.track {
		height: 10px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--color-border) 65%, transparent);
		overflow: hidden;
	}

	.fill {
		height: 100%;
		background: linear-gradient(
			90deg,
			var(--color-primary) 0%,
			color-mix(in srgb, var(--color-primary) 50%, white) 100%
		);
	}
</style>
