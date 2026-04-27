<section>
	<h2>Welcome</h2>
	<p>
		This small project is set up to learn SvelteKit quickly if you already know React and Angular.
	</p>

	<div class="cards">
		<a class="card" href="/counter">
			<h3>Counter + Reactivity</h3>
			<p>Learn <code>$state</code>, <code>$derived</code> and event handlers.</p>
		</a>
		<a class="card" href="/todos">
			<h3>Form + List</h3>
			<p>Learn bindings, keyed lists, and immutable updates.</p>
		</a>
		<a class="card" href="/runes">
			<h3>Runes Lab</h3>
			<p>Practice state, derived values, and effects together.</p>
		</a>
		<a class="card" href="/components">
			<h3>Component Composition</h3>
			<p>Build UI from reusable child components and slots.</p>
		</a>
		<a class="card" href="/transitions">
			<h3>Transitions + Animation</h3>
			<p>Animate list entry, exit, and layout changes.</p>
		</a>
		<a class="card" href="/stores-context">
			<h3>Stores + Context</h3>
			<p>Share reactive data and scoped dependencies.</p>
		</a>
		<a class="card" href="/kit-load">
			<h3>Kit Load</h3>
			<p>Fetch and shape data on the server before rendering.</p>
		</a>
		<a class="card" href="/kit-actions">
			<h3>Kit Actions</h3>
			<p>Handle form submissions with server validation.</p>
		</a>
		<a class="card" href="/kit-endpoints">
			<h3>Kit Endpoints</h3>
			<p>Build JSON handlers with <code>+server.ts</code>.</p>
		</a>
		<a class="card" href="/kit-dynamic-routes">
			<h3>Kit Dynamic Routes</h3>
			<p>Use params with <code>[segment]</code> route files.</p>
		</a>
		<a class="card" href="/kit-cookies">
			<h3>Kit Cookies</h3>
			<p>Persist lightweight server-aware preferences.</p>
		</a>
	</div>

	<h3>Mental model mapping</h3>
	<table>
		<thead>
			<tr>
				<th>Concept</th>
				<th>React / Angular</th>
				<th>Svelte</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Local state</td>
				<td><code>useState</code> / component field</td>
				<td><code>$state(...)</code></td>
			</tr>
			<tr>
				<td>Derived values</td>
				<td><code>useMemo</code> / computed signals</td>
				<td><code>$derived(...)</code></td>
			</tr>
			<tr>
				<td>Two-way form binding</td>
				<td><code>value + onChange</code> / <code>[(ngModel)]</code></td>
				<td><code>bind:value</code>, <code>bind:checked</code></td>
			</tr>
			<tr>
				<td>Routing</td>
				<td>React Router / Angular Router</td>
				<td>File-based routes in <code>src/routes</code></td>
			</tr>
		</tbody>
	</table>

	<section class="learning-path">
		<h3>Guided path</h3>
		<ol>
			<li>
				<strong>Start at this page</strong>
				<p>Learn the concept mapping and navigation structure.</p>
			</li>
			<li>
				<strong>Go to /counter</strong>
				<p>Practice <code>$state</code>, <code>$derived</code>, and update flows.</p>
			</li>
			<li>
				<strong>Go to /todos</strong>
				<p>Practice bindings, keyed lists, and form-driven state changes.</p>
			</li>
			<li>
				<strong>Go to /runes</strong>
				<p>Combine <code>$state</code>, <code>$derived</code>, and <code>$effect</code>.</p>
			</li>
			<li>
				<strong>Go to /components</strong>
				<p>Compose multiple components with props and slots.</p>
			</li>
			<li>
				<strong>Go to /transitions</strong>
				<p>Use transitions and animation to improve interaction feel.</p>
			</li>
			<li>
				<strong>Go to /stores-context</strong>
				<p>Share state with stores and pass dependencies with context.</p>
			</li>
			<li>
				<strong>Go to /kit-load</strong>
				<p>Use server load functions and query params for data flow.</p>
			</li>
			<li>
				<strong>Go to /kit-actions</strong>
				<p>Submit forms to named actions and inspect returned form state.</p>
			</li>
			<li>
				<strong>Go to /kit-endpoints</strong>
				<p>Call GET/POST handlers in <code>+server.ts</code> using fetch.</p>
			</li>
			<li>
				<strong>Go to /kit-dynamic-routes</strong>
				<p>Navigate dynamic route params with <code>[lesson]</code>.</p>
			</li>
			<li>
				<strong>Go to /kit-cookies</strong>
				<p>Persist and read user preferences through cookies.</p>
			</li>
		</ol>

		<h4>Mini challenges</h4>
		<ul>
			<li><strong>/:</strong> add one extra concept row in the mapping table.</li>
			<li><strong>/counter:</strong> implement undo/redo with history.</li>
			<li><strong>/todos:</strong> add filters (all/active/completed).</li>
			<li><strong>/runes:</strong> add a guard that prevents count from going below zero.</li>
			<li><strong>/components:</strong> extract a shared action bar component.</li>
			<li><strong>/transitions:</strong> replace one transition and compare feel.</li>
			<li><strong>/stores-context:</strong> move notes to a module-level store.</li>
			<li><strong>/kit-load:</strong> add sorting to the load function.</li>
			<li><strong>/kit-actions:</strong> add an edit action with validation.</li>
			<li><strong>/kit-endpoints:</strong> add one DELETE handler and call it from UI.</li>
			<li><strong>/kit-dynamic-routes:</strong> add a second dynamic path segment.</li>
			<li><strong>/kit-cookies:</strong> add one more persisted cookie preference.</li>
		</ul>
	</section>
</section>

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 0.75rem;
		margin: 1rem 0 1.25rem;
	}

	.card {
		display: block;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 0.9rem;
		background: var(--color-surface-soft);
		color: var(--color-text);
		text-decoration: none;
	}

	.card:visited,
	.card:active {
		color: var(--color-text);
	}

	.card h3 {
		color: var(--color-link);
	}

	.card:visited h3,
	.card:active h3 {
		color: var(--color-link);
	}

	.card h3 {
		margin: 0 0 0.35rem;
	}

	.card p {
		margin: 0;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		text-align: left;
		padding: 0.55rem;
		border-bottom: 1px solid var(--color-border);
		vertical-align: top;
	}

	h3 {
		margin-top: 1rem;
	}

	.learning-path {
		margin-top: 1.25rem;
		padding: 0.9rem;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		background: var(--color-surface-soft);
	}

	ol {
		padding-left: 1.25rem;
	}

	ol p {
		margin: 0.2rem 0 0.6rem;
		color: var(--color-text-muted);
	}

	h4 {
		margin: 0.6rem 0 0.35rem;
	}
</style>
