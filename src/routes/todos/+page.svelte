<script lang="ts">
	type Todo = {
		id: number;
		text: string;
		done: boolean;
	};

	let todos = $state<Todo[]>([]);
	let draft = $state('');
	let nextId = 1;
	let remaining = $derived(todos.filter((todo) => !todo.done).length);

	function addTodo(event: SubmitEvent) {
		event.preventDefault();
		const text = draft.trim();

		if (!text) {
			return;
		}

		todos = [...todos, { id: nextId++, text, done: false }];
		draft = '';
	}

	function removeTodo(id: number) {
		todos = todos.filter((todo) => todo.id !== id);
	}
</script>

<section>
	<h2>Form + List</h2>
	<p>
		This page demonstrates template binding and list rendering. It is similar to controlled inputs in
		React, but with less boilerplate.
	</p>

	<form onsubmit={addTodo} class="todo-form">
		<input bind:value={draft} placeholder="Add a task" />
		<button type="submit">Add</button>
	</form>

	<p><strong>Remaining:</strong> {remaining}</p>

	{#if todos.length === 0}
		<p>No todos yet.</p>
	{:else}
		<ul>
			{#each todos as todo (todo.id)}
				<li>
					<label>
						<input type="checkbox" bind:checked={todo.done} />
						<span class:done={todo.done}>{todo.text}</span>
					</label>
					<button type="button" onclick={() => removeTodo(todo.id)}>Delete</button>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.todo-form {
		display: flex;
		gap: 0.5rem;
		margin: 1rem 0 0.75rem;
	}

	input {
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

	ul {
		list-style: none;
		padding-left: 0;
		max-width: 520px;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	label {
		display: flex;
		gap: 0.45rem;
		align-items: center;
	}

	.done {
		text-decoration: line-through;
		color: var(--color-text-muted);
	}
</style>
