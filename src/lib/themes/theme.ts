import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';

export type ThemeName = 'light' | 'dark' | 'custom';

export type ThemeTokens = {
	bg: string;
	bgAlt: string;
	surface: string;
	surfaceSoft: string;
	text: string;
	textMuted: string;
	border: string;
	primary: string;
	primarySoft: string;
	buttonBg: string;
	inputBg: string;
	gradientStart: string;
	gradientEnd: string;
	link: string;
};

export type ThemeState = {
	name: ThemeName;
	custom: ThemeTokens;
};

export type ThemeExchangeV1 = {
	version: 1;
	name: 'custom';
	custom: ThemeTokens;
};

export type ThemeImportResult = { ok: true } | { ok: false; error: string };

const STORAGE_KEY = 'svelte-playground-theme-v1';
const HEX_COLOR = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const THEME_EXCHANGE_VERSION = 1;

const LIGHT_TOKENS: ThemeTokens = {
	bg: '#f6f9fc',
	bgAlt: '#e9f2ff',
	surface: '#ffffff',
	surfaceSoft: '#f7fbff',
	text: '#1d2a38',
	textMuted: '#71808e',
	border: '#d9e5f2',
	primary: '#0e5cb5',
	primarySoft: '#eff6ff',
	buttonBg: '#eff7ff',
	inputBg: '#ffffff',
	gradientStart: '#f6f9fc',
	gradientEnd: '#e9f2ff',
	link: '#0e5cb5'
};

const CSS_VAR_MAP: Record<keyof ThemeTokens, string> = {
	bg: '--color-bg',
	bgAlt: '--color-bg-alt',
	surface: '--color-surface',
	surfaceSoft: '--color-surface-soft',
	text: '--color-text',
	textMuted: '--color-text-muted',
	border: '--color-border',
	primary: '--color-primary',
	primarySoft: '--color-primary-soft',
	buttonBg: '--color-button-bg',
	inputBg: '--color-input-bg',
	gradientStart: '--color-gradient-start',
	gradientEnd: '--color-gradient-end',
	link: '--color-link'
};
const TOKEN_KEYS = Object.keys(CSS_VAR_MAP) as Array<keyof ThemeTokens>;

const DEFAULT_STATE: ThemeState = {
	name: 'light',
	custom: { ...LIGHT_TOKENS }
};

function isThemeName(value: unknown): value is ThemeName {
	return value === 'light' || value === 'dark' || value === 'custom';
}

function sanitizeTokenValue(value: unknown, fallback: string): string {
	if (typeof value !== 'string') {
		return fallback;
	}

	return HEX_COLOR.test(value) ? value : fallback;
}

function sanitizeTokens(value: unknown): ThemeTokens {
	const source = value && typeof value === 'object' ? (value as Partial<ThemeTokens>) : {};

	return {
		bg: sanitizeTokenValue(source.bg, LIGHT_TOKENS.bg),
		bgAlt: sanitizeTokenValue(source.bgAlt, LIGHT_TOKENS.bgAlt),
		surface: sanitizeTokenValue(source.surface, LIGHT_TOKENS.surface),
		surfaceSoft: sanitizeTokenValue(source.surfaceSoft, LIGHT_TOKENS.surfaceSoft),
		text: sanitizeTokenValue(source.text, LIGHT_TOKENS.text),
		textMuted: sanitizeTokenValue(source.textMuted, LIGHT_TOKENS.textMuted),
		border: sanitizeTokenValue(source.border, LIGHT_TOKENS.border),
		primary: sanitizeTokenValue(source.primary, LIGHT_TOKENS.primary),
		primarySoft: sanitizeTokenValue(source.primarySoft, LIGHT_TOKENS.primarySoft),
		buttonBg: sanitizeTokenValue(source.buttonBg, LIGHT_TOKENS.buttonBg),
		inputBg: sanitizeTokenValue(source.inputBg, LIGHT_TOKENS.inputBg),
		gradientStart: sanitizeTokenValue(source.gradientStart, LIGHT_TOKENS.gradientStart),
		gradientEnd: sanitizeTokenValue(source.gradientEnd, LIGHT_TOKENS.gradientEnd),
		link: sanitizeTokenValue(source.link, LIGHT_TOKENS.link)
	};
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
	return !!value && typeof value === 'object' && !Array.isArray(value);
}

function parseThemeTokensForImport(value: unknown): { ok: true; tokens: ThemeTokens } | { ok: false; error: string } {
	if (!isObjectRecord(value)) {
		return { ok: false, error: 'Theme file must include a custom token object.' };
	}

	const unknownKeys = Object.keys(value).filter((key) => !TOKEN_KEYS.includes(key as keyof ThemeTokens));
	if (unknownKeys.length > 0) {
		return { ok: false, error: `Theme file has unknown token(s): ${unknownKeys.join(', ')}.` };
	}

	const parsed = {} as ThemeTokens;

	for (const key of TOKEN_KEYS) {
		if (!(key in value)) {
			return { ok: false, error: `Theme file is missing token "${key}".` };
		}

		const tokenValue = value[key];
		if (typeof tokenValue !== 'string' || !HEX_COLOR.test(tokenValue)) {
			return { ok: false, error: `Theme token "${key}" must be a valid hex color.` };
		}

		parsed[key] = tokenValue;
	}

	return { ok: true, tokens: parsed };
}

function parseThemeExchangePayload(value: unknown): { ok: true; tokens: ThemeTokens } | { ok: false; error: string } {
	if (!isObjectRecord(value)) {
		return { ok: false, error: 'Theme file must be a JSON object.' };
	}

	if (value.version !== THEME_EXCHANGE_VERSION) {
		return { ok: false, error: `Theme file must have version ${THEME_EXCHANGE_VERSION}.` };
	}

	if (value.name !== 'custom') {
		return { ok: false, error: 'Theme file name must be "custom".' };
	}

	return parseThemeTokensForImport(value.custom);
}

function loadInitialState(): ThemeState {
	if (!browser) {
		return DEFAULT_STATE;
	}

	try {
		const rawState = window.localStorage.getItem(STORAGE_KEY);
		if (!rawState) {
			return DEFAULT_STATE;
		}

		const parsed = JSON.parse(rawState) as Partial<ThemeState>;
		return {
			name: isThemeName(parsed.name) ? parsed.name : DEFAULT_STATE.name,
			custom: sanitizeTokens(parsed.custom)
		};
	} catch {
		return DEFAULT_STATE;
	}
}

function persistState(state: ThemeState) {
	if (!browser) {
		return;
	}

	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function applyThemeToDocument(state: ThemeState) {
	if (!browser) {
		return;
	}

	const root = document.documentElement;
	root.setAttribute('data-theme', state.name);

	for (const cssVarName of Object.values(CSS_VAR_MAP)) {
		root.style.removeProperty(cssVarName);
	}

	if (state.name !== 'custom') {
		return;
	}

	for (const tokenKey of Object.keys(CSS_VAR_MAP) as Array<keyof ThemeTokens>) {
		root.style.setProperty(CSS_VAR_MAP[tokenKey], state.custom[tokenKey]);
	}
}

const internalThemeState = writable<ThemeState>(loadInitialState());

if (browser) {
	internalThemeState.subscribe((state) => {
		persistState(state);
		applyThemeToDocument(state);
	});
}

export const themeState = {
	subscribe: internalThemeState.subscribe
};

export function setTheme(name: ThemeName) {
	internalThemeState.update((state) => ({ ...state, name }));
}

export function updateCustomThemeToken(token: keyof ThemeTokens, value: string) {
	if (!HEX_COLOR.test(value)) {
		return;
	}

	internalThemeState.update((state) => ({
		name: 'custom',
		custom: {
			...state.custom,
			[token]: value
		}
	}));
}

export function resetCustomTheme() {
	internalThemeState.update((state) => ({
		...state,
		custom: { ...LIGHT_TOKENS }
	}));
}

export function getThemeExchangePayload(): ThemeExchangeV1 {
	const state = get(internalThemeState);
	return {
		version: THEME_EXCHANGE_VERSION,
		name: 'custom',
		custom: { ...state.custom }
	};
}

export function exportThemeJson(): string {
	return JSON.stringify(getThemeExchangePayload(), null, 2);
}

export function importThemeJson(rawJson: string): ThemeImportResult {
	let parsed: unknown;

	try {
		parsed = JSON.parse(rawJson);
	} catch {
		return { ok: false, error: 'Theme file is not valid JSON.' };
	}

	const payload = parseThemeExchangePayload(parsed);
	if (!payload.ok) {
		return payload;
	}

	internalThemeState.set({
		name: 'custom',
		custom: payload.tokens
	});

	return { ok: true };
}

export const themeStorageKey = STORAGE_KEY;
