import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	isLearningStatus,
	removeItem,
	updateItem,
	validateTitle
} from '$lib/server/capstone-store';
import type { LearningStatus } from '$lib/capstone/types';

export const PATCH: RequestHandler = async ({ params, request }) => {
	const payload = (await request.json().catch(() => null)) as
		| { title?: string; status?: string }
		| null;

	if (!payload) {
		return json({ error: 'Update payload is required.' }, { status: 400 });
	}

	const updates: { title?: string; status?: LearningStatus } = {};

	if (typeof payload.title === 'string') {
		const nextTitle = payload.title.trim();
		const titleError = validateTitle(nextTitle);
		if (titleError) {
			return json({ error: titleError }, { status: 400 });
		}

		updates.title = nextTitle;
	}

	if (payload.status !== undefined) {
		if (!isLearningStatus(payload.status)) {
			return json({ error: 'Status is invalid.' }, { status: 400 });
		}

		updates.status = payload.status;
	}

	if (!updates.title && !updates.status) {
		return json({ error: 'No updates provided.' }, { status: 400 });
	}

	const item = updateItem(params.id, updates);
	if (!item) {
		return json({ error: 'Item not found.' }, { status: 404 });
	}

	return json({ item });
};

export const DELETE: RequestHandler = ({ params }) => {
	const removed = removeItem(params.id);

	if (!removed) {
		return json({ error: 'Item not found.' }, { status: 404 });
	}

	return json({ ok: true });
};
