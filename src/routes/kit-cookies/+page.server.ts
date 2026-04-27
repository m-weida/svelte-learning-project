import type { Actions, PageServerLoad } from './$types';

type LearningPace = 'focused' | 'balanced' | 'fast';
type CookiePreferences = {
	pace: LearningPace;
	showHints: boolean;
	visitCount: number;
};

const COOKIE_NAME = 'kit-preferences-v1';

const defaults: CookiePreferences = {
	pace: 'balanced',
	showHints: true,
	visitCount: 0
};

function parsePreferences(rawCookie: string | undefined): CookiePreferences {
	if (!rawCookie) {
		return defaults;
	}

	try {
		const parsed = JSON.parse(rawCookie) as Partial<CookiePreferences>;
		const pace: LearningPace =
			parsed.pace === 'focused' || parsed.pace === 'balanced' || parsed.pace === 'fast'
				? parsed.pace
				: defaults.pace;
		const showHints = typeof parsed.showHints === 'boolean' ? parsed.showHints : defaults.showHints;
		const visitCount = typeof parsed.visitCount === 'number' ? parsed.visitCount : defaults.visitCount;

		return { pace, showHints, visitCount };
	} catch {
		return defaults;
	}
}

function savePreferences(
	cookies: Parameters<PageServerLoad>[0]['cookies'],
	preferences: CookiePreferences
) {
	cookies.set(COOKIE_NAME, JSON.stringify(preferences), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 30
	});
}

export const load: PageServerLoad = ({ cookies }) => {
	const current = parsePreferences(cookies.get(COOKIE_NAME));
	const next = {
		...current,
		visitCount: current.visitCount + 1
	};

	savePreferences(cookies, next);

	return {
		preferences: next
	};
};

export const actions: Actions = {
	save: async ({ cookies, request }) => {
		const formData = await request.formData();
		const rawPace = formData.get('pace');
		const pace: LearningPace =
			rawPace === 'focused' || rawPace === 'balanced' || rawPace === 'fast' ? rawPace : defaults.pace;
		const showHints = formData.get('showHints') === 'on';
		const current = parsePreferences(cookies.get(COOKIE_NAME));

		savePreferences(cookies, {
			pace,
			showHints,
			visitCount: current.visitCount
		});

		return { saved: true };
	},
	reset: async ({ cookies }) => {
		savePreferences(cookies, defaults);
		return { reset: true };
	}
};
