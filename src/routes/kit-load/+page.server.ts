import type { PageServerLoad } from './$types';

type LessonAnnouncement = {
	id: number;
	title: string;
	level: 'beginner' | 'intermediate' | 'advanced';
	note: string;
};

const announcements: LessonAnnouncement[] = [
	{
		id: 1,
		title: 'Load receives URL context',
		level: 'beginner',
		note: 'Read search params to change what data your page receives.'
	},
	{
		id: 2,
		title: 'Load can set cache hints',
		level: 'intermediate',
		note: 'Use setHeaders when your data should be cached for short periods.'
	},
	{
		id: 3,
		title: 'Load can read cookies',
		level: 'advanced',
		note: 'Combine cookie preferences with query params for personalized content.'
	}
];

const validLevels = ['all', 'beginner', 'intermediate', 'advanced'] as const;

type FilterLevel = (typeof validLevels)[number];

function toFilterLevel(value: string | null): FilterLevel {
	if (value && validLevels.includes(value as FilterLevel)) {
		return value as FilterLevel;
	}

	return 'all';
}

export const load: PageServerLoad = async ({ setHeaders, url }) => {
	const level = toFilterLevel(url.searchParams.get('level'));
	const visible =
		level === 'all' ? announcements : announcements.filter((announcement) => announcement.level === level);

	setHeaders({
		'cache-control': 'max-age=0, s-maxage=45'
	});

	return {
		level,
		totalCount: announcements.length,
		visibleCount: visible.length,
		announcements: visible,
		fetchedAt: new Date().toISOString()
	};
};
