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
		border: 1px solid #d8e8f8;
		border-radius: 12px;
		padding: 0.9rem;
		background: #f7fbff;
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
		border-bottom: 1px solid #e7edf4;
		vertical-align: top;
	}

	h3 {
		margin-top: 1rem;
	}
</style>
