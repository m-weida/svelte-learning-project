export type KitLesson = {
	slug: string;
	title: string;
	focus: string;
	summary: string;
	exercise: string;
};

export const kitLessons: KitLesson[] = [
	{
		slug: 'load-basics',
		title: 'Load Basics',
		focus: 'Returning server data to a page',
		summary:
			'Use a load function when a page needs data before it renders. Load can read params, URL search params, cookies, and headers.',
		exercise: 'Add a query string filter and show how it changes the returned dataset.'
	},
	{
		slug: 'actions-flow',
		title: 'Actions Flow',
		focus: 'Handling form submits on the server',
		summary:
			'Actions process form data with full server validation and return values back to the page through the form prop.',
		exercise: 'Add another named action that edits an existing item from the same page.'
	},
	{
		slug: 'endpoint-design',
		title: 'Endpoint Design',
		focus: 'Serving JSON with +server.ts',
		summary:
			'Endpoints are useful for request/response APIs, webhook handlers, and data clients that do not need a page render.',
		exercise: 'Add one endpoint query parameter and one response field for debugging.'
	},
	{
		slug: 'cookie-preferences',
		title: 'Cookie Preferences',
		focus: 'Persisting user preferences in cookies',
		summary:
			'Cookies are ideal for lightweight persisted state that needs to be available during server load and actions.',
		exercise: 'Add one more preference and keep backward compatibility with older cookie payloads.'
	}
];

export function findKitLesson(slug: string): KitLesson | undefined {
	return kitLessons.find((lesson) => lesson.slug === slug);
}
