import { seedItems } from '$lib/capstone/seed';
import { STATUS_ORDER, type LearningItem, type LearningStatus } from '$lib/capstone/types';

const statusRank = new Map(STATUS_ORDER.map((status, index) => [status, index]));

let items: LearningItem[] = seedItems.map((item) => ({ ...item }));

function sortItems(list: LearningItem[]): LearningItem[] {
	return [...list].sort((a, b) => {
		const statusDelta = (statusRank.get(a.status) ?? 0) - (statusRank.get(b.status) ?? 0);
		if (statusDelta !== 0) {
			return statusDelta;
		}

		return b.updatedAt.localeCompare(a.updatedAt);
	});
}

export function listItems(): LearningItem[] {
	return sortItems(items);
}

export function isLearningStatus(value: unknown): value is LearningStatus {
	return typeof value === 'string' && STATUS_ORDER.includes(value as LearningStatus);
}

export function normalizeTitle(value: FormDataEntryValue | null): string {
	return typeof value === 'string' ? value.trim() : '';
}

export function validateTitle(title: string): string | null {
	if (!title) {
		return 'Title is required.';
	}

	if (title.length > 80) {
		return 'Title must be 80 characters or less.';
	}

	return null;
}

export function createItem(title: string, status: LearningStatus): LearningItem {
	const timestamp = new Date().toISOString();
	const item: LearningItem = {
		id: crypto.randomUUID(),
		title,
		status,
		createdAt: timestamp,
		updatedAt: timestamp
	};

	items = [item, ...items];
	return item;
}

export function updateItem(
	id: string,
	updates: { title?: string; status?: LearningStatus }
): LearningItem | null {
	const index = items.findIndex((item) => item.id === id);
	if (index === -1) {
		return null;
	}

	const next: LearningItem = {
		...items[index],
		...updates,
		updatedAt: new Date().toISOString()
	};

	items = [...items];
	items[index] = next;

	return next;
}

export function removeItem(id: string): boolean {
	const next = items.filter((item) => item.id !== id);
	const removed = next.length !== items.length;
	items = next;
	return removed;
}

export function advanceItem(id: string): LearningItem | null {
	const current = items.find((item) => item.id === id);
	if (!current) {
		return null;
	}

	const currentIndex = statusRank.get(current.status) ?? 0;
	const nextIndex = Math.min(currentIndex + 1, STATUS_ORDER.length - 1);
	const nextStatus = STATUS_ORDER[nextIndex];

	return updateItem(id, { status: nextStatus });
}
