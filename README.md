# SvelteKit Learning Project

Small SvelteKit + TypeScript project created with `pnpm` for learning Svelte and SvelteKit step by step.

## Install and run

```sh
pnpm install
pnpm dev
```

Then open the local URL shown in the terminal.

## Phase 1 + Phase 2 + Phase 3 learning path (guided)

Use this order for the smoothest ramp-up:

- [ ] Start at `/` for the concept map.
- [ ] Move to `/counter` to practice reactivity.
- [ ] Move to `/todos` to practice bindings and list updates.
- [ ] Move to `/runes` to combine state, derived values, and effects.
- [ ] Move to `/components` to practice component composition.
- [ ] Move to `/transitions` to practice transitions and animation.
- [ ] Move to `/stores-context` to practice shared state and context.
- [ ] Move to `/kit-load` to practice server load and query params.
- [ ] Move to `/kit-actions` to practice server form actions and validation.
- [ ] Move to `/kit-endpoints` to practice GET/POST endpoint handlers.
- [ ] Move to `/kit-dynamic-routes` to practice route params.
- [ ] Move to `/kit-cookies` to practice persisted preferences with cookies.

If you are coming from React or Angular, treat this as:

- `/`: mental model translation
- `/counter`: local state and derived values
- `/todos`: forms and list rendering with less boilerplate
- `/runes`: runes working together in one lab
- `/components`: reusable component composition
- `/transitions`: UI motion and list animation
- `/stores-context`: scoped dependency sharing
- `/kit-load`: server-side page data fetching
- `/kit-actions`: form handling in page actions
- `/kit-endpoints`: explicit request/response handlers
- `/kit-dynamic-routes`: dynamic param-based page routing
- `/kit-cookies`: persisted preferences across requests

## Route outcomes and challenge tasks

### `/` Overview

What you should learn:

- How Svelte concepts map to React/Angular concepts.
- How this project is organized with file-based routing.

Try this next:

- Add one more row to the concept table, for example lifecycle or context.
- Add a new card to a future route you want to build.

### `/counter`

What you should learn:

- `\$state` for local mutable state.
- `\$derived` for computed values.
- Event handlers and simple reactive effects.

Try this next:

- Add a "Set to value" input that updates the counter directly.
- Add undo/redo support using the history array.
- Prevent negative values with a toggleable guard.

### `/todos`

What you should learn:

- `bind:value` and `bind:checked` for two-way bindings.
- Keyed list rendering and immutable updates.
- Basic form handling and validation.

Try this next:

- Add "edit todo" inline.
- Add filters: all, active, completed.
- Persist todos in local storage.

### `/runes`

What you should learn:

- `\$state`, `\$derived`, and `\$effect` in one focused workflow.
- How derived values and effect logs react to state updates.

Try this next:

- Add a lower-bound toggle that blocks negative count values.
- Add an extra derived value that categorizes progress toward target.

### `/components`

What you should learn:

- Parent-to-child props for reusable pieces.
- Slot-based actions to customize card behavior.
- Composition with small focused components.

Try this next:

- Add a fourth lesson card and custom action.
- Extract a shared action bar component.

### `/transitions`

What you should learn:

- Enter/leave transitions with `in:` and `out:` directives.
- Layout animation with `animate:flip`.
- Motion tuning with reduced duration.

Try this next:

- Swap one transition and compare interaction feel.
- Default reduced motion to true and verify usability.

### `/stores-context`

What you should learn:

- Store-driven shared state updates.
- Passing dependencies with `setContext` / `getContext`.
- Derived store summaries for UI counters.

Try this next:

- Move notes to a module-level store and reuse it in another route.
- Extract list rendering to a child context consumer.

### `/kit-load`

What you should learn:

- `+page.server.ts` load functions for server-side data preparation.
- Reading URL search params and returning filtered results.
- Cache hints with `setHeaders`.

Try this next:

- Add sorting to the returned list via a query parameter.
- Add one more filter and include it in the UI controls.

### `/kit-actions`

What you should learn:

- Named actions with `?/action-name`.
- Server validation with `fail(400, ...)`.
- Progressive enhancement with `use:enhance`.

Try this next:

- Add an edit action for existing entries.
- Return and render per-action success messages.

### `/kit-endpoints`

What you should learn:

- GET/POST handlers in `+server.ts`.
- Returning JSON responses and status codes.
- Calling endpoint handlers from page code with `fetch`.

Try this next:

- Add a DELETE handler and call it from the page.
- Add one extra response metadata field.

### `/kit-dynamic-routes`

What you should learn:

- Dynamic route params with `[lesson]`.
- Loading route-specific content from server load.
- Navigating between previous/next param-based pages.

Try this next:

- Add a second dynamic segment for tabbed views.
- Return 404 for unknown params and customize the error page.

### `/kit-cookies`

What you should learn:

- Reading and writing cookie-backed preferences.
- Keeping load and actions in sync with shared cookie state.
- Persisting lightweight user state without a database.

Try this next:

- Add a new `compactMode` cookie preference.
- Reuse preferences in another route's server load.

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

## Plan

Project roadmap is tracked in `plan.md`.

## How this project was scaffolded

```sh
pnpm dlx sv create . --template minimal --types ts --no-add-ons --install pnpm
```
