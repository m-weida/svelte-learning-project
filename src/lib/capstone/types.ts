export type LearningStatus = 'todo' | 'in-progress' | 'done';

export type LearningItem = {
	id: string;
	title: string;
	status: LearningStatus;
	createdAt: string;
	updatedAt: string;
};

export const STATUS_ORDER: LearningStatus[] = ['todo', 'in-progress', 'done'];

export const STATUS_LABELS: Record<LearningStatus, string> = {
	todo: 'To do',
	'in-progress': 'In progress',
	done: 'Done'
};
