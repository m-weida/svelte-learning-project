import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ProgressMeter from '../ProgressMeter.svelte';

describe('ProgressMeter', () => {
	it('announces the completed lesson count and percentage', () => {
		render(ProgressMeter, {
			props: {
				done: 2,
				total: 4
			}
		});

		expect(screen.getByRole('status', { name: 'Progress meter' })).toHaveTextContent(
			'Progress: 2/4 (50%)'
		);
	});

	it('handles an empty checklist without dividing by zero', () => {
		render(ProgressMeter, {
			props: {
				done: 0,
				total: 0
			}
		});

		expect(screen.getByText('Progress: 0/0 (0%)')).toBeInTheDocument();
	});
});
