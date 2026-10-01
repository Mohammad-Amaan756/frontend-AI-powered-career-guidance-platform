# Pathfinder frontend

A responsive React interface for the AI-powered career guidance backend.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `VITE_API_URL` to the backend API base URL (for example `http://localhost:5000/api`).
3. Start the development server with `npm run dev`.

The backend must be running and reachable from the browser. The frontend sends authenticated API requests with the login token and does not connect directly to MongoDB, Gemini, or YouTube.

## Features

- Register, sign in, and sign out
- Career dashboard and profile editor
- Job description analysis and skill gap comparison
- Personalized learning roadmap and skill resources
- AI career guidance
- Resume feedback from PDF, DOCX, or pasted text (backend limit: 5 MB)
- Mock interview question generation, answer evaluation, and history

## Source layout

- `src/app` contains the application entry, route definitions, and auth/theme providers.
- `src/features` groups each workflow's pages and API functions.
- `src/components/ui` contains shared controls and presentation primitives.
- `src/layouts` contains the authenticated dashboard shell and auth-page layout.
- `src/lib` centralizes the API client and browser storage keys.
- `src/hooks`, `src/utils`, and `src/constants` hold reusable helpers.

Run `npm run build` to create a production bundle and `npm run lint` for lint checks.
