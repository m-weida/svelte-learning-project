import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const snippets: Record<string, string[]> = {
	load: [
		'Use load to return data before render.',
		'Read url.searchParams and cookies for server context.'
	],
	actions: [
		'Use named actions for multi-form pages.',
		'Return fail(400, data) for validation errors.'
	],
	cookies: [
		'Read cookies in load and actions.',
		'Persist small preference payloads with sameSite=lax.'
	]
};

export const GET: RequestHandler = ({ url }) => {
	const topic = url.searchParams.get('topic') ?? 'load';
	const rows = snippets[topic] ?? snippets.load;

	return json({
		topic,
		rows,
		servedAt: new Date().toISOString()
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const payload = (await request.json().catch(() => null)) as { question?: string } | null;
	const question = payload?.question?.trim();

	if (!question) {
		return json(
			{
				error: 'Question is required.'
			},
			{ status: 400 }
		);
	}

	return json({
		answer: `Endpoint received: "${question}". Server can now call databases or other services before responding.`,
		receivedAt: new Date().toISOString()
	});
};
