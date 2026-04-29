import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { LearningItem, LearningStatus } from '$lib/capstone/types';
import {
	advanceItem,
	createItem,
	isLearningStatus,
	normalizeTitle,
	removeItem,
	updateItem,
	validateTitle
} from '$lib/server/capstone-store';

const COOKIE_NAME = 'capstone-preferences-v1';

type Density = 'cozy' | 'compact';

type CapstoneTheme = 'breeze' | 'ember';

type Preferences = {
	theme: CapstoneTheme;
	density: Density;
};

const DEFAULT_PREFERENCES: Preferences = {
	theme: 'breeze',
	density: 'cozy'
};

function parsePreferences(rawCookie: string | undefined): Preferences {
	if (!rawCookie) {
		return DEFAULT_PREFERENCES;
	}

	try {
		const parsed = JSON.parse(rawCookie) as Partial<Preferences>;
		const theme: CapstoneTheme = parsed.theme === 'ember' || parsed.theme === 'breeze'
			? parsed.theme
			: DEFAULT_PREFERENCES.theme;
		const density: Density = parsed.density === 'compact' || parsed.density === 'cozy'
			? parsed.density
			: DEFAULT_PREFERENCES.density;

		return { theme, density };
	} catch {
		return DEFAULT_PREFERENCES;
	}
}

function savePreferences(
	cookies: Parameters<PageServerLoad>[0]['cookies'],
	preferences: Preferences
) {
	cookies.set(COOKIE_NAME, JSON.stringify(preferences), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 30
	});
}

function parseDensity(value: FormDataEntryValue | null): Density {
	return value === 'compact' || value === 'cozy' ? value : DEFAULT_PREFERENCES.density;
}

function parseTheme(value: FormDataEntryValue | null): CapstoneTheme {
	return value === 'ember' || value === 'breeze' ? value : DEFAULT_PREFERENCES.theme;
}

export const load: PageServerLoad = ({ cookies, fetch }) => {
	const items = fetch('/capstone/api/items')
		.then(async (response) => {
			if (!response.ok) {
				return [] as LearningItem[];
			}

			const payload = (await response.json()) as { items?: LearningItem[] };
			return Array.isArray(payload.items) ? payload.items : [];
		})
		.catch(() => [] as LearningItem[]);

	return {
		items,
		preferences: parsePreferences(cookies.get(COOKIE_NAME))
	};
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const title = normalizeTitle(formData.get('title'));
		const rawStatus = formData.get('status');
		const status: LearningStatus = isLearningStatus(rawStatus) ? rawStatus : 'todo';
		const titleError = validateTitle(title);

		if (titleError) {
			return fail(400, { createError: titleError, title, status });
		}

		createItem(title, status);
		return { createSuccess: true };
	},
	update: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const title = normalizeTitle(formData.get('title'));
		const rawStatus = formData.get('status');
		const status: LearningStatus = isLearningStatus(rawStatus) ? rawStatus : 'todo';

		if (typeof id !== 'string' || !id) {
			return fail(400, { updateError: 'Missing item id.' });
		}

		const titleError = validateTitle(title);
		if (titleError) {
			return fail(400, { updateError: titleError, title, status, id });
		}

		const updated = updateItem(id, { title, status });
		if (!updated) {
			return fail(404, { updateError: 'Item not found.' });
		}

		return { updateSuccess: true, selectedId: id };
	},
	advance: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || !id) {
			return fail(400, { advanceError: 'Missing item id.' });
		}

		const updated = advanceItem(id);
		if (!updated) {
			return fail(404, { advanceError: 'Item not found.' });
		}

		return { advanceSuccess: true, selectedId: id };
	},
	remove: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || !id) {
			return fail(400, { removeError: 'Missing item id.' });
		}

		const removed = removeItem(id);
		if (!removed) {
			return fail(404, { removeError: 'Item not found.' });
		}

		return { removeSuccess: true, removedId: id };
	},
	preferences: async ({ cookies, request }) => {
		const formData = await request.formData();
		const theme = parseTheme(formData.get('theme'));
		const density = parseDensity(formData.get('density'));

		savePreferences(cookies, { theme, density });
		return { preferencesSaved: true };
	},
	resetPreferences: async ({ cookies }) => {
		savePreferences(cookies, DEFAULT_PREFERENCES);
		return { preferencesReset: true };
	}
};
