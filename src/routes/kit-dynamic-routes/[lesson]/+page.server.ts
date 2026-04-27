import { error } from '@sveltejs/kit';
import { findKitLesson, kitLessons } from '$lib/kit-lessons';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const lesson = findKitLesson(params.lesson);

	if (!lesson) {
		throw error(404, 'Lesson not found');
	}

	const index = kitLessons.findIndex((item) => item.slug === lesson.slug);
	const previous = index > 0 ? kitLessons[index - 1] : null;
	const next = index < kitLessons.length - 1 ? kitLessons[index + 1] : null;

	return {
		lesson,
		previous,
		next
	};
};
