<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import {
		exportThemeJson,
		importThemeJson,
		resetCustomTheme,
		setTheme,
		themeState,
		type ThemeName,
		type ThemeTokens,
		updateCustomThemeToken
	} from '$lib/themes/theme';

	let { children } = $props();

	type EditableThemeToken = keyof Pick<
		ThemeTokens,
		| 'primary'
		| 'surface'
		| 'surfaceSoft'
		| 'text'
		| 'textMuted'
		| 'border'
		| 'buttonBg'
		| 'gradientStart'
		| 'gradientEnd'
	>;

	const customTokenFields: Array<{ key: EditableThemeToken; label: string }> = [
		{ key: 'primary', label: 'Primary' },
		{ key: 'surface', label: 'Surface' },
		{ key: 'surfaceSoft', label: 'Soft surface' },
		{ key: 'text', label: 'Text' },
		{ key: 'textMuted', label: 'Muted text' },
		{ key: 'border', label: 'Border' },
		{ key: 'buttonBg', label: 'Button' },
		{ key: 'gradientStart', label: 'Gradient start' },
		{ key: 'gradientEnd', label: 'Gradient end' }
	];
	let importMessage = $state<{ kind: 'idle' | 'success' | 'error'; text: string }>({
		kind: 'idle',
		text: ''
	});
	let importFileInput = $state<HTMLInputElement | null>(null);

	function handleThemeChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement;
		setTheme(target.value as ThemeName);
	}

	function handleTokenChange(token: EditableThemeToken, event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		updateCustomThemeToken(token, target.value);
	}

	function getThemeExportFilename() {
		const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
		return `theme-${timestamp}.json`;
	}

	function handleThemeDownload() {
		const json = exportThemeJson();
		const blob = new Blob([json], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = getThemeExportFilename();
		document.body.append(link);
		link.click();
		link.remove();
		URL.revokeObjectURL(url);
		importMessage = { kind: 'success', text: 'Theme downloaded.' };
	}

	function openThemeImportPicker() {
		importFileInput?.click();
	}

	async function handleThemeImport(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) {
			return;
		}

		try {
			const rawJson = await file.text();
			const result = importThemeJson(rawJson);
			importMessage = result.ok
				? { kind: 'success', text: 'Theme imported.' }
				: { kind: 'error', text: result.error };
		} catch {
			importMessage = { kind: 'error', text: 'Could not read the selected file.' };
		}

		target.value = '';
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SvelteKit Learning Playground</title>
</svelte:head>

<div class="app-shell">
	<header>
		<div class="title-block">
			<h1>SvelteKit Learning Playground</h1>
			<p>Hands-on examples for someone coming from React and Angular.</p>
		</div>

		<div class="theme-controls">
			<label for="theme-select">Theme</label>
			<select id="theme-select" onchange={handleThemeChange} value={$themeState.name}>
				<option value="light">Light</option>
				<option value="dark">Dark</option>
				<option value="custom">Custom</option>
			</select>
		</div>

		{#if $themeState.name === 'custom'}
			<div class="custom-theme-grid">
				{#each customTokenFields as field}
					<label class="token-field">
						<span>{field.label}</span>
						<input
							type="color"
							value={$themeState.custom[field.key]}
							onchange={(event) => handleTokenChange(field.key, event)}
						/>
					</label>
				{/each}
				<button type="button" class="reset-theme" onclick={resetCustomTheme}>Reset custom palette</button>
			</div>
		{/if}

		{#if $themeState.name === 'custom'}
			<div class="theme-io-controls">
				<button type="button" class="theme-io-button" onclick={handleThemeDownload}>
					Download custom theme
				</button>
				<button type="button" class="theme-io-button" onclick={openThemeImportPicker}>Import theme</button>
				<input
					bind:this={importFileInput}
					class="theme-import-input"
					type="file"
					accept="application/json,.json"
					onchange={handleThemeImport}
				/>
			</div>

			{#if importMessage.kind !== 'idle'}
				<p class="theme-import-message" data-kind={importMessage.kind}>{importMessage.text}</p>
			{/if}
		{/if}

		<nav>
			<a href="/">Overview</a>
			<a href="/counter">Counter + Reactivity</a>
			<a href="/todos">Form + List</a>
			<a href="/runes">Runes Lab</a>
			<a href="/components">Component Composition</a>
			<a href="/transitions">Transitions + Animation</a>
			<a href="/stores-context">Stores + Context</a>
			<a href="/kit-load">Kit Load</a>
			<a href="/kit-actions">Kit Actions</a>
			<a href="/kit-endpoints">Kit Endpoints</a>
			<a href="/kit-dynamic-routes">Kit Dynamic Routes</a>
			<a href="/kit-cookies">Kit Cookies</a>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>
</div>

<style>
	:global(:root) {
		--color-bg: #f6f9fc;
		--color-bg-alt: #e9f2ff;
		--color-surface: #ffffff;
		--color-surface-soft: #f7fbff;
		--color-text: #1d2a38;
		--color-text-muted: #71808e;
		--color-border: #d9e5f2;
		--color-primary: #0e5cb5;
		--color-primary-soft: #eff6ff;
		--color-button-bg: #eff7ff;
		--color-input-bg: #ffffff;
		--color-gradient-start: #f6f9fc;
		--color-gradient-end: #e9f2ff;
		--color-link: #0e5cb5;
	}

	:global(:root[data-theme='dark']) {
		--color-bg: #111820;
		--color-bg-alt: #1a2532;
		--color-surface: #1f2b38;
		--color-surface-soft: #243445;
		--color-text: #ebf2fa;
		--color-text-muted: #a4b3c4;
		--color-border: #35506b;
		--color-primary: #7cc0ff;
		--color-primary-soft: #22384d;
		--color-button-bg: #274058;
		--color-input-bg: #172330;
		--color-gradient-start: #0f1620;
		--color-gradient-end: #1a2735;
		--color-link: #9ed2ff;
	}

	:global(body) {
		margin: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: linear-gradient(135deg, var(--color-gradient-start) 0%, var(--color-gradient-end) 100%);
		color: var(--color-text);
	}

	.app-shell {
		min-height: 100vh;
		max-width: 960px;
		margin: 0 auto;
		padding: 1.25rem;
	}

	header {
		background: color-mix(in srgb, var(--color-surface) 88%, transparent);
		backdrop-filter: blur(8px);
		border: 1px solid var(--color-border);
		border-radius: 14px;
		padding: 1rem 1.25rem;
	}

	.title-block p {
		color: var(--color-text-muted);
	}

	h1 {
		margin: 0;
		font-size: 1.6rem;
	}

	p {
		margin: 0.45rem 0 1rem;
	}

	nav {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	a {
		text-decoration: none;
		color: var(--color-link);
		font-weight: 600;
		padding: 0.35rem 0.6rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-primary-soft);
	}

	main {
		margin-top: 1rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 14px;
		padding: 1.25rem;
	}

	.theme-controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.9rem;
	}

	.theme-controls label {
		font-weight: 600;
	}

	select,
	.reset-theme,
	.theme-io-button {
		border: 1px solid var(--color-border);
		background: var(--color-button-bg);
		color: var(--color-text);
		padding: 0.35rem 0.55rem;
		border-radius: 8px;
	}

	.custom-theme-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 0.65rem;
		margin-bottom: 0.9rem;
	}

	.token-field {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 10px;
		background: var(--color-surface-soft);
		font-size: 0.9rem;
	}

	.token-field span {
		color: var(--color-text-muted);
	}

	.token-field input[type='color'] {
		inline-size: 2.25rem;
		block-size: 1.6rem;
		padding: 0;
		border: 0;
		background: transparent;
	}

	.reset-theme {
		cursor: pointer;
	}

	.theme-io-controls {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 0.9rem;
	}

	.theme-io-button {
		cursor: pointer;
	}

	.theme-import-input {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.theme-import-message {
		margin: 0 0 0.9rem;
		font-size: 0.9rem;
		color: var(--color-text-muted);
	}

	.theme-import-message[data-kind='error'] {
		color: #c62828;
	}
</style>
