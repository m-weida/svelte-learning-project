<script lang="ts">
	import LessonCard from './LessonCard.svelte';
	import ProgressMeter from './ProgressMeter.svelte';

	type Lesson = {
		id: number;
		title: string;
		summary: string;
		done: boolean;
	};

	let lessons = $state<Lesson[]>([
		{ id: 1, title: 'Props', summary: 'Pass data from parent to child components.', done: false },
		{ id: 2, title: 'Slots', summary: 'Insert custom child content into reusable shells.', done: false },
		{ id: 3, title: 'Composition', summary: 'Combine small components into one workflow.', done: false }
	]);

	let doneCount = $derived(lessons.filter((lesson) => lesson.done).length);

	function toggleLesson(id: number) {
		lessons = lessons.map((lesson) =>
			lesson.id === id ? { ...lesson, done: !lesson.done } : lesson
		);
	}

	function resetLessons() {
		lessons = lessons.map((lesson) => ({ ...lesson, done: false }));
	}
</script>

<section>
	<h2>Component Composition</h2>
	<p>
		This page models a simple learning checklist using reusable child components and slot-based actions.
	</p>

	<ProgressMeter done={doneCount} total={lessons.length} />

	<div class="card-grid">
		{#each lessons as lesson (lesson.id)}
			<LessonCard title={lesson.title} summary={lesson.summary} done={lesson.done}>
				{#snippet actions()}
					<button type="button" onclick={() => toggleLesson(lesson.id)}>
						{lesson.done ? 'Mark not done' : 'Mark done'}
					</button>
				{/snippet}
			</LessonCard>
		{/each}
	</div>

	<div class="actions">
		<button type="button" onclick={resetLessons}>Reset all</button>
	</div>

	<div class="exercise">
		<h3>Mini-exercise</h3>
		<p>
			Add a fourth lesson card with its own action, then move the reset button into a shared action bar
			component so page code stays smaller.
		</p>
	</div>
</section>

<style>
	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 0.75rem;
		margin-top: 0.75rem;
	}

	button {
		padding: 0.35rem 0.6rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-button-bg);
		color: var(--color-text);
		cursor: pointer;
	}

	.actions {
		margin-top: 0.8rem;
	}

	.exercise {
		margin-top: 1rem;
		border: 1px solid var(--color-border);
		background: var(--color-surface-soft);
		padding: 0.9rem;
		border-radius: 12px;
	}
</style>
