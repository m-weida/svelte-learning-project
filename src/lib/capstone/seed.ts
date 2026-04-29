import type { LearningItem } from './types';

export const seedItems: LearningItem[] = [
	{
		id: 'seed-1',
		title: 'Map upcoming kit lessons',
		status: 'todo',
		createdAt: '2026-04-01T09:00:00.000Z',
		updatedAt: '2026-04-01T09:00:00.000Z'
	},
	{
		id: 'seed-2',
		title: 'Draft a practice checklist',
		status: 'in-progress',
		createdAt: '2026-04-02T14:30:00.000Z',
		updatedAt: '2026-04-03T10:15:00.000Z'
	},
	{
		id: 'seed-3',
		title: 'Ship the capstone walkthrough',
		status: 'done',
		createdAt: '2026-04-05T08:20:00.000Z',
		updatedAt: '2026-04-06T16:45:00.000Z'
	}
];
