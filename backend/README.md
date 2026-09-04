# Smriti Setu backend

The API is a small Node.js/Express service. Node was selected because the
available frontend dependencies indicate a React/Vite JavaScript application.

At setup time, `docs/` contained only `.gitkeep` and the frontend contained no
application source files, so there was no verified product API contract beyond
the requested health check. The service therefore exposes a safe, minimal
versioned API foundation rather than guessing feature endpoints.

## Requirements

- Node.js 20 or later
- npm

## Run locally

From this directory:

```bash
npm install
Copy-Item .env.example .env
npm run dev
```

On macOS/Linux, replace the second command with `cp .env.example .env`.

The server listens on `http://localhost:4000` by default. Change `PORT` in
`.env` to use another port. `CORS_ORIGIN` defaults to all origins when unset;
set it to the frontend URL in environments beyond local development.

## Routes

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Liveness/readiness response with timestamp |
| GET | `/api/v1` | API name, version, and currently available routes |

Example:

```bash
curl http://localhost:4000/health
```

## Structure

```text
src/
  app.js                 Express composition and middleware
  server.js              Process entry point
  routes/                HTTP route definitions
  controllers/           Request/response handlers
  models/                Domain and persistence model definitions
  middleware/            Shared error and 404 handlers
```

`models/Memory.js` is a deliberately persistence-agnostic domain model for the
app name's memory-recording use case. Once the frontend and product documents
define concrete flows, add their route/controller pairs and select a database
adapter without changing the server composition.
