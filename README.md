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

## Theme export/import

1. Switch to **Custom** theme and tweak colors.
2. Click **Download custom theme** to save a JSON file.
3. Click **Import theme** and choose a previously exported JSON file.

Theme files use this shape:

```json
{
  "version": 1,
  "name": "custom",
  "custom": {
    "...": "#RRGGBB"
  }
}
```

## How this project was scaffolded

```sh
pnpm dlx sv create . --template minimal --types ts --no-add-ons --install pnpm
```
