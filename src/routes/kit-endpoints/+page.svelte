<script lang="ts">
	type Topic = 'load' | 'actions' | 'cookies';
	type GetResponse = {
		topic: string;
		rows: string[];
		servedAt: string;
	};
	type PostResponse = {
		answer: string;
		receivedAt: string;
	};

	let topic = $state<Topic>('load');
	let getResult = $state<GetResponse | null>(null);
	let postResult = $state<PostResponse | null>(null);
	let endpointError = $state('');
	let question = $state('Why use +server.ts in SvelteKit?');
	let loading = $state(false);

	async function loadTopic() {
		endpointError = '';
		loading = true;

		try {
			const response = await fetch(`/kit-endpoints/api?topic=${encodeURIComponent(topic)}`);
			if (!response.ok) {
				throw new Error('Could not load topic snippets.');
			}

			getResult = (await response.json()) as GetResponse;
		} catch {
			endpointError = 'Failed to load endpoint data.';
		} finally {
			loading = false;
		}
	}

	async function askEndpoint() {
		endpointError = '';
		postResult = null;

		try {
			const response = await fetch('/kit-endpoints/api', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ question })
			});

			if (!response.ok) {
				const errorData = (await response.json()) as { error?: string };
				endpointError = errorData.error ?? 'POST request failed.';
				return;
			}

			postResult = (await response.json()) as PostResponse;
		} catch {
			endpointError = 'POST request failed.';
		}
	}
</script>

<section>
	<h2>Kit Endpoints</h2>
	<p>
		This route demonstrates request handlers in <code>+server.ts</code> with both GET and POST examples.
	</p>

	<div class="panel">
		<h3>GET endpoint</h3>
		<div class="row">
			<label for="topic">Topic</label>
			<select id="topic" bind:value={topic}>
				<option value="load">load</option>
				<option value="actions">actions</option>
				<option value="cookies">cookies</option>
			</select>
			<button type="button" onclick={loadTopic} disabled={loading}>
				{loading ? 'Loading...' : 'Fetch snippets'}
			</button>
		</div>

		{#if getResult}
			<p><strong>Topic:</strong> {getResult.topic}</p>
			<ul>
				{#each getResult.rows as row, index (index)}
					<li>{row}</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="panel">
		<h3>POST endpoint</h3>
		<form
			onsubmit={(event) => {
				event.preventDefault();
				void askEndpoint();
			}}
		>
			<label for="question">Question</label>
			<input id="question" bind:value={question} />
			<button type="submit">Send to endpoint</button>
		</form>

		{#if postResult}
			<p>{postResult.answer}</p>
		{/if}
	</div>

	{#if endpointError}
		<p class="error">{endpointError}</p>
	{/if}

	<div class="exercise">
		<h3>Mini-exercise</h3>
		<p>
			Add a DELETE handler to remove a mock item by id, then call it from this page with <code>fetch</code>.
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
		margin: 0.8rem 0;
	}

	.row,
	form {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		align-items: center;
	}

	label {
		font-weight: 600;
	}

	input,
	select {
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

	.error {
		color: #a93a2f;
		font-weight: 600;
	}
</style>
