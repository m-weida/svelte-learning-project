import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import CapstoneList from '../CapstoneList.svelte';
import type { LearningItem } from '../types';

describe('CapstoneList', () => {
	it('highlights the selected item and shows status labels', () => {
		const items: LearningItem[] = [
			{
				id: 'item-1',
				title: 'Map upcoming kit lessons',
				status: 'todo',
				createdAt: '2026-04-01T09:00:00.000Z',
				updatedAt: '2026-04-01T09:00:00.000Z'
			},
			{
				id: 'item-2',
				title: 'Draft a practice checklist',
				status: 'in-progress',
				createdAt: '2026-04-02T14:30:00.000Z',
				updatedAt: '2026-04-03T10:15:00.000Z'
			}
		];

		render(CapstoneList, {
			props: {
				items,
				selectedId: 'item-2'
			}
		});

		const selected = screen.getByText('Draft a practice checklist').closest('li');
		expect(selected).toHaveAttribute('data-selected', 'true');
		expect(screen.getByText('In progress')).toBeInTheDocument();
	});
});
