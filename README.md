# SvelteKit Learning Project

Small SvelteKit + TypeScript project created with `pnpm` for learning core Svelte concepts.

## Install dependencies

```sh
pnpm install
```

## Run it

```sh
pnpm dev
```

Then open the local URL shown in the terminal.

## What to explore

1. `/` overview and React/Angular to Svelte concept map
2. `/counter` local state (`$state`) and derived values (`$derived`)
3. `/todos` form binding (`bind:value`, `bind:checked`) and keyed list updates

## Handy scripts

```sh
pnpm dev
pnpm check
pnpm build
pnpm preview
```

## How this project was scaffolded

```sh
pnpm dlx sv create . --template minimal --types ts --no-add-ons --install pnpm
```
