# Contently

A miniature CMS for managing editorial content. Content can reference multiple products, products can appear in many pieces of content, and the order of products on a piece of content matters and persists.

## Stack

| Layer         | Tech                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| Frontend      | React 19, TypeScript, Webpack 5, Apollo Client, MUI v5, React Router v6 |
| Design system | `@contently/toolkit` — custom component library built on MUI + Emotion  |
| BFF           | Express + Apollo Federation Gateway                                     |
| Subgraphs     | Apollo Server 5 + `@apollo/subgraph`                                    |
| Mock services | Express + Postgres (TypeScript)                                         |
| E2E tests     | Playwright                                                              |

---

## Getting started

### Full stack via Docker

You need Docker. That's it.

```bash
docker compose up --build
```

First boot takes a minute — Postgres initialises, both mocks run migrations and seed data. Subsequent boots are fast.

| Endpoint          | URL                           |
| ----------------- | ----------------------------- |
| App               | http://localhost:8080         |
| GraphQL sandbox   | http://localhost:8080/graphql |
| rover-mock health | http://localhost:4001/health  |
| vader-mock health | http://localhost:4002/health  |

### Local development (faster iteration)

Keep the data layer in Docker, run the BFF and frontend on your machine:

```bash
# Terminal 1 — data layer
docker compose up postgres rover-mock vader-mock

# Terminal 2 — BFF
cd server
ROVER_SERVICE_URL=http://localhost:4001 VADER_SERVICE_URL=http://localhost:4002 npm start

# Terminal 3 — frontend (proxies /graphql and /api to localhost:8080)
npm run contently
```

The frontend dev server starts on **port 3000**.

---

## Commands

All commands run from the **repo root** unless noted.

### Development

```bash
npm run contently           # webpack-dev-server for the React app (port 3000)
npm run dev                 # docker compose up (full stack)
```

### Testing

```bash
npm run test                # unit tests — app + toolkit
npm run test:ci             # same with --ci --coverage flags

# Run a single workspace
npm run test --workspace=apps/contently
npm run test --workspace=packages/toolkit

# E2E — requires the app to be running at localhost:8080
npm run test:e2e            # headless Playwright
npm run test:e2e:ui         # Playwright interactive UI
npm run test:e2e:headed     # Playwright with visible browser
```

### Storybook

```bash
# Toolkit component explorer — runs on port 6006
npm run storybook --workspace=packages/toolkit

# Or from inside the package
cd packages/toolkit && npm run storybook
```

### Linting & formatting

```bash
npm run lint:check          # oxlint + ESLint + Prettier (read-only)
npm run lint:fix            # auto-fix everything possible
npm run lint:oxlint         # oxlint only
npm run lint:eslint         # ESLint only
npm run lint:format         # Prettier check only
```

### Type checking

```bash
npm run type-check          # app + server + toolkit in one pass
```

---

## Project structure

```
/
├── apps/
│   └── contently/                   # React 19 SPA
│       └── src/
│           ├── components/          # shared app components (Nav, RequireAuth)
│           ├── contexts/            # React contexts (AuthContext)
│           ├── data/                # route registry
│           ├── hooks/               # shared hooks (useDebounce)
│           ├── layouts/             # page shell with Nav + Snackbar
│           ├── lib/                 # Apollo client config, MUI theme
│           ├── modules/             # feature modules — co-located logic + UI
│           │   ├── auth/            # login form, useLogin hook
│           │   ├── content-edit/    # edit form, rich-text editor, product picker
│           │   └── content-list/    # list filters, content card
│           ├── pages/               # lazy-loaded route entry points
│           │   ├── content/edit/
│           │   ├── content/list/
│           │   ├── content/new/
│           │   └── login/
│           ├── providers/           # one file per provider + composed RootProvider
│           │   ├── apollo-provider.tsx
│           │   ├── auth-provider.tsx
│           │   ├── router-provider.tsx
│           │   ├── theme-provider.tsx
│           │   └── index.tsx        # RootProvider + AppRouter
│           ├── queries/             # named GraphQL operations
│           ├── stores/              # Zustand stores (useSiteStore, useSnackbarStore)
│           └── utils/               # pure utilities (slugify)
│
├── packages/
│   └── toolkit/                     # @contently/toolkit — internal design system
│       └── src/
│           ├── components/
│           │   ├── button/          # Button — primary / secondary / danger / ghost
│           │   ├── form-autocomplete/ # async multi-select with debounce
│           │   ├── form-input/      # label, error, helper text, max-length
│           │   ├── form-select/     # sync + async options, size prop
│           │   ├── loading/         # spinner, isCentered variant
│           │   └── modal/           # portal, focus trap, ESC to close
│           ├── primitives.ts        # re-exports MUI layout primitives (Box, Typography…)
│           └── index.ts             # single public entry point
│
├── server/                          # BFF — Apollo Gateway + Express
│   └── src/
│       ├── index.ts                 # bootstrap: starts subgraphs + gateway
│       ├── graphql/
│       │   ├── rover/               # content + authors subgraph
│       │   └── vader/               # products + junction subgraph
│       ├── modules/auth/            # /api/login, /api/me, session middleware
│       └── utils/caseConvert.ts     # snake_case ↔ camelCase
│
├── mock-services/
│   ├── rover-mock/                  # content + authors REST API (port 4001)
│   │   └── src/modules/
│   │       ├── authors/             # GET /v2/authors
│   │       └── content/             # GET /v2/content, POST, PATCH /:id
│   └── vader-mock/                  # products + junction REST API (port 4002)
│       └── src/modules/
│           ├── products/            # GET /v2/products
│           └── content-products/    # junction — supports ?content_id:in= batch
│
├── e2e/                             # Playwright specs
│   ├── auth.setup.ts
│   ├── content-list.spec.ts
│   └── content-edit.spec.ts
├── shared/                          # shared constants / types
└── docker-compose.yml
```

---

## Seeded data

Three sites, seeded on first boot:

| Site            | Content records |
| --------------- | --------------- |
| site-us-cooking | 10              |
| site-us-fashion | 10              |
| site-us-travel  | 10              |

25 products, ~90 content↔product links across all sites.

Login emails (POST `/api/login` with `{ "email": "..." }`):

- alice.chen@contently.com
- bob.martinez@contently.com
- carol.johnson@contently.com
- david.kim@contently.com
- emma.wilson@contently.com

---

## Try a federated query

Open http://localhost:8080/graphql. This touches both subgraphs in a single request — content + author from rover, products from vader:

```graphql
query {
  content(id: "c0000000-0000-0000-0000-000000000001") {
    title
    status
    author {
      name
    }
    products {
      id
      name
      price
    }
  }
}
```

---

## Coding conventions

### Commit format

Every commit must match this pattern or the pre-commit hook rejects it:

```
CTNT-123 feat: add content list page
CTNT-456 fix: slug uniqueness scoped to site
CTNT-789 chore: update docker compose healthcheck
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`. The ticket number is fake — just increment it.

**Rebase-only.** No merge commits:

```bash
git pull --rebase
```

### Key rules enforced by lint + type-check

- TypeScript strict mode everywhere — no `any`
- No inline `style` attributes — use MUI `sx` or `@emotion/styled`
- Boolean props prefixed `is`/`has` (`isOpen`, not `open`)
- Zustand selectors only — `useStore(s => s.x)`, never destructure the store
- GraphQL operations named `ACTION_RESOURCE` — `GET_CONTENT`, `UPDATE_CONTENT`
- Absolute imports inside `src/` via path aliases — no relative `../../`
- All UI imported from `@contently/toolkit`, never directly from `@mui/material`

---

## Architecture notes

**Why two mock services?** They represent two real-world systems that wouldn't share a database. Keeping them separate forces the federation layer to actually do its job.

**Why fixed UUIDs in seed data?** vader-mock's junction table references content IDs from rover-mock's database. Since they don't talk to each other at boot, pre-seeding the junction requires agreeing on IDs ahead of time.

**Why DataLoader in the BFF?** Without it, fetching 20 content items with products makes 20 HTTP calls to vader-mock. DataLoader + the `?content_id:in=` batch endpoint collapses that to one.

**Why `@contently/toolkit` re-exports MUI primitives?** The app imports everything from one place. If MUI is ever swapped out, only the toolkit changes — app code is untouched.

**Why subgraphs on internal ports (4010/4011)?** Apollo Gateway with `IntrospectAndCompose` talks to subgraphs over HTTP. Running them on internal ports avoids extra Docker containers while still using the real federation protocol.
