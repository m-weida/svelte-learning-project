import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type GuestbookEntry = {
	id: string;
	message: string;
	createdAt: string;
};

const COOKIE_NAME = 'kit-guestbook-v1';
const MAX_ENTRIES = 8;

function parseEntries(rawCookie: string | undefined): GuestbookEntry[] {
	if (!rawCookie) {
		return [];
	}

	try {
		const parsed = JSON.parse(rawCookie) as unknown;
		if (!Array.isArray(parsed)) {
			return [];
		}

		return parsed
			.filter((entry): entry is GuestbookEntry => {
				return (
					!!entry &&
					typeof entry === 'object' &&
					typeof entry.id === 'string' &&
					typeof entry.message === 'string' &&
					typeof entry.createdAt === 'string'
				);
			})
			.slice(0, MAX_ENTRIES);
	} catch {
		return [];
	}
}

function writeEntries(
	cookies: Parameters<PageServerLoad>[0]['cookies'],
	entries: GuestbookEntry[]
) {
	cookies.set(COOKIE_NAME, JSON.stringify(entries.slice(0, MAX_ENTRIES)), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 14
	});
}

export const load: PageServerLoad = ({ cookies }) => {
	const entries = parseEntries(cookies.get(COOKIE_NAME));

	return {
		entries
	};
};

export const actions: Actions = {
	add: async ({ cookies, request }) => {
		const formData = await request.formData();
		const draft = formData.get('message');
		const message = typeof draft === 'string' ? draft.trim() : '';

		if (!message) {
			return fail(400, { addError: 'Message is required.', message: '' });
		}

		if (message.length > 140) {
			return fail(400, {
				addError: 'Message must be 140 characters or less.',
				message
			});
		}

		const entries = parseEntries(cookies.get(COOKIE_NAME));
		const next: GuestbookEntry[] = [
			{
				id: crypto.randomUUID(),
				message,
				createdAt: new Date().toISOString()
			},
			...entries
		].slice(0, MAX_ENTRIES);

		writeEntries(cookies, next);

		return { addSuccess: true };
	},
	remove: async ({ cookies, request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || !id) {
			return fail(400, { removeError: 'Missing entry id.' });
		}

		const entries = parseEntries(cookies.get(COOKIE_NAME));
		writeEntries(
			cookies,
			entries.filter((entry) => entry.id !== id)
		);

		return { removeSuccess: true };
	},
	clear: async ({ cookies }) => {
		writeEntries(cookies, []);
		return { clearSuccess: true };
	}
};
