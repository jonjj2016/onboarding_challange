# Contently

A miniature CMS for managing editorial content. Content can reference multiple products, products can appear in many pieces of content, and the order of products on a piece of content matters and persists.

## What's built so far

The backend stack is up and running. The frontend is next.

```
mock-services/rover-mock   →  content + authors  (Express + Postgres, port 4001)
mock-services/vader-mock   →  products + links   (Express + Postgres, port 4002)
server/                    →  Apollo Gateway BFF  (Express + GraphQL, port 8080)
```

The two mock services are standalone REST APIs. The BFF sits in front of them, federates their schemas into a single GraphQL endpoint, and handles session auth.

## Running it

You need Docker. That's it.

```bash
docker compose up --build
```

First boot takes a minute — Postgres needs to initialize, then both mocks run migrations and seed their data. On every subsequent boot it's much faster.

Once everything is up:
- GraphQL sandbox → http://localhost:8080/graphql
- rover-mock health → http://localhost:4001/health
- vader-mock health → http://localhost:4002/health

### Running the BFF locally (faster for development)

Keep the data layer in Docker and run the server on your machine so you can restart it instantly without rebuilding images.

```bash
# Terminal 1 — data layer stays up between restarts
docker compose up postgres rover-mock vader-mock

# Terminal 2 — BFF you can kill and restart freely
cd server
ROVER_SERVICE_URL=http://localhost:4001 VADER_SERVICE_URL=http://localhost:4002 npm start
```

## Try a federated query

Open http://localhost:8080/graphql and run this. It touches both subgraphs in a single request — content + author come from rover, products come from vader:

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

## Seeded data

Three sites, seeded on first boot:

| Site | Content records |
|------|----------------|
| site-us-cooking | 10 |
| site-us-fashion | 10 |
| site-us-travel | 10 |

25 products, ~90 content↔product links across all sites.

Login emails you can use (POST /api/login with `{ "email": "..." }`):
- alice.chen@contently.com
- bob.martinez@contently.com
- carol.johnson@contently.com
- david.kim@contently.com
- emma.wilson@contently.com

## Commit conventions

Every commit must follow this format or the pre-commit hook rejects it:

```
CTNT-123 feat: add content list page
CTNT-456 fix: slug uniqueness check scoped to site
CTNT-789 chore: update docker compose healthcheck
```

Pattern: `CTNT-<number> <type>: <description>`

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

The ticket number is fake — just increment it. The point is to keep the history readable and consistent.

**Rebase-only.** No merge commits. If you're pulling from remote:

```bash
git pull --rebase
```

## Project structure

```
/
├── apps/contently/          # React 19 SPA (not started yet)
├── packages/toolkit/        # @contently/toolkit design system (not started yet)
├── server/                  # BFF: Apollo Gateway + Express + auth
│   └── src/
│       ├── auth.ts          # /api/login, /api/me, session
│       ├── index.ts         # starts subgraphs + gateway
│       └── graphql/
│           ├── rover/       # content + authors subgraph
│           └── vader/       # products + links subgraph
├── mock-services/
│   ├── rover-mock/          # content + authors REST API
│   └── vader-mock/          # products + junction REST API
├── shared/                  # shared config/constants (not started yet)
└── scripts/
    └── init-dbs.sql         # creates rover_db and vader_db on first Postgres boot
```

## Architecture decisions worth knowing

**Why two mock services?** They represent two real-world systems that wouldn't share a database. Keeping them separate forces the federation layer to actually do its job.

**Why fixed UUIDs in seed data?** vader-mock's junction table references content IDs that live in rover-mock's database. Since the services don't talk to each other at boot time, the only way to pre-seed the junction is to agree on IDs ahead of time.

**Why DataLoader in the BFF?** Without it, fetching a list of 20 content items with their products makes 20 separate HTTP requests to vader-mock. With DataLoader, it's one. The `?content_id:in=` endpoint on vader-mock exists specifically to support this batching.

**Why subgraphs on internal ports (4010/4011)?** Apollo Gateway with `IntrospectAndCompose` communicates with subgraphs over HTTP. Running them on internal ports in the same process avoids extra Docker containers while still using the real federation protocol.
