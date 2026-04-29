import { describe, expect, it } from 'vitest';
import { importThemeJson, themeStorageKey } from '../theme';

describe('theme utilities', () => {
	it('exports the expected local storage key', () => {
		expect(themeStorageKey).toBe('svelte-playground-theme-v1');
	});

	it('rejects invalid theme JSON', () => {
		expect(importThemeJson('{bad json')).toEqual({
			ok: false,
			error: 'Theme file is not valid JSON.'
		});
	});

	it('rejects theme files with invalid token colors', () => {
		const result = importThemeJson(
			JSON.stringify({
				version: 1,
				name: 'custom',
				custom: {
					bg: '#ffffff',
					bgAlt: '#f0f0f0',
					surface: '#ffffff',
					surfaceSoft: '#fafafa',
					text: '#111111',
					textMuted: '#666666',
					border: '#dddddd',
					primary: 'blue',
					primarySoft: '#eeeeff',
					buttonBg: '#eeeeee',
					inputBg: '#ffffff',
					gradientStart: '#ffffff',
					gradientEnd: '#eeeeee',
					link: '#0000ff'
				}
			})
		);

		expect(result).toEqual({
			ok: false,
			error: 'Theme token "primary" must be a valid hex color.'
		});
	});
});
