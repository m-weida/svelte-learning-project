import type { Writable } from 'svelte/store';

export type WorkspaceSettings = {
	accent: string;
	denseMode: boolean;
};

export type WorkspaceSettingsStore = Writable<WorkspaceSettings>;

export const workspaceSettingsKey = Symbol('workspace-settings');
