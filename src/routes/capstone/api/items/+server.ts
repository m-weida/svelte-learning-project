import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createItem, isLearningStatus, listItems, validateTitle } from '$lib/server/capstone-store';

export const GET: RequestHandler = () => {
	const items = listItems();

	return json({
		items,
		total: items.length,
		updatedAt: new Date().toISOString()
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const payload = (await request.json().catch(() => null)) as
		| { title?: string; status?: string }
		| null;

	const title = payload?.title?.trim() ?? '';
	const status = isLearningStatus(payload?.status) ? payload?.status : 'todo';
	const titleError = validateTitle(title);

	if (titleError) {
		return json({ error: titleError }, { status: 400 });
	}

	const item = createItem(title, status);
	return json({ item }, { status: 201 });
};
