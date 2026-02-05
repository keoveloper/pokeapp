# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start Vite dev server with HMR
pnpm build        # Type-check (tsc -b) then build for production
pnpm lint         # Run ESLint (flat config)
pnpm preview      # Preview production build locally
```

Package manager is **pnpm** (not npm/yarn).

## Architecture

React 19 + TypeScript + Vite SPA that consumes the [PokéAPI v2](https://pokeapi.co/api/v2). Styled with Tailwind CSS 3.

### Stack

- **Routing:** React Router DOM 7 — routes defined in `src/App.tsx`
- **Server state:** TanStack React Query (5 min stale, 30 min cache, 2 retries, no refetch on window focus)
- **Client state:** Zustand with `persist` middleware (localStorage key: `pokemon-favorites`)
- **HTTP:** Axios client with base URL `https://pokeapi.co/api/v2` and 10s timeout
- **Virtualization:** react-window for long lists

### Routes

| Path | Component |
|------|-----------|
| `/` | `PokemonList` |
| `/pokemon/:name` | `PokemonDetail` |
| `/favorites` | `Favorites` |

### Source Layout

```
src/
├── services/api.ts          # Axios client: getPokemons, getPokemonByName, getType, getTypes
├── stores/favoritesStore.ts # Zustand store: addFavorite, removeFavorite, isFavorite
├── features/                # Feature modules (PokemonList, PokemonDetail, Favorites)
├── shared/
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   └── utils/               # Utilities (debounce)
└── App.tsx                  # QueryClient provider, BrowserRouter, route definitions
```

### Key Patterns

- Feature-based organization: each feature gets its own directory under `src/features/`
- Shared code (components, hooks, utils) lives in `src/shared/`
- The Zustand favorites store persists to localStorage — no backend needed for favorites
- React Query is the single QueryClient configured at the App root level

## TypeScript

Strict mode is enabled with `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, and `noFallthroughCasesInSwitch`. Target is ES2022 with bundler module resolution.
