# Creative Studio

A premium creative technology / branding studio website. Editorial typography, cinematic motion, an interactive portfolio, and a Node.js API — built to feel like an award-winning digital studio, not a SaaS template.

## Stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS 4
- **Motion:** Framer Motion, GSAP ScrollTrigger, Lenis smooth scroll
- **Icons:** Lucide React
- **Backend:** Node.js, Express

## Quick start

```bash
npm install
npm run dev
```

This starts:

- Frontend at [http://localhost:5173](http://localhost:5173)
- API at [http://localhost:5000](http://localhost:5000)

The Vite dev server proxies `/api` to the Express backend.

## Environment

Copy the example file and adjust as needed:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `PORT` | Express port (default `5000`) |
| `MONGODB_URI` | Optional MongoDB connection string. When omitted, the API uses in-memory seed data. |
| `CLIENT_ORIGIN` | CORS origin used in production |
| `VITE_API_URL` | Frontend API base. Default `/api` (proxied in development) |
| `NODE_ENV` | `development` or `production` |

Do not put secrets in the frontend. `VITE_` variables are public.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Run client and server together |
| `npm run dev:client` | Vite only |
| `npm run dev:server` | Express only (with `--watch`) |
| `npm run build` | Production frontend build into `dist/` |
| `npm start` | Serve the API and the built frontend (`NODE_ENV=production`) |
| `npm run preview` | Vite preview of the production build |

## Production

```bash
npm run build
NODE_ENV=production npm start
```

Express serves `dist/` and the `/api` routes from the same origin.

## API

All JSON responses follow `{ success, data }` or `{ success, error }`.

### `GET /api/health`

Service status and storage mode (`memory` or `mysql`).

### `GET /api/projects`

Returns the project archive.

### `GET /api/projects/:id`

Returns a single project. `404` if missing.

### `GET /api/services`

Returns the studio service list.

### `GET /api/testimonials`

Returns editorial testimonials.

### `POST /api/contact`

```json
{
  "name": "Jordan Lee",
  "email": "jordan@example.com",
  "company": "North",
  "message": "We are planning a new digital flagship for next spring."
}
```

Validation:

- `name` required, 2–80 characters
- `email` required, valid address
- `company` optional, max 100 characters
- `message` required, 10–2000 characters

Success: `201` with a confirmation message.  
Failure: `400` with `fields` for invalid input. Contact submissions are rate limited.

### MySQL setup

Copy `.env.example` to `.env`, set the MySQL connection values, and start the server with
`npm run dev:server`. The server creates the `contacts` table automatically.

## Project structure

```text
src/
  components/     UI sections (Hero, Work, Cursor, Loader…)
  pages/          Home, Work, Project, Studio, Contact
  hooks/          mouse, scroll, media query
  data/           local fallbacks
  utils/          API client + animation tokens
  context/        custom cursor state
server/
  server.js
  routes/
  controllers/
  models/
  middleware/
  data/
```

## Motion notes

- Intro loader counts 0–100% then slides away
- Custom cursor is disabled on touch / coarse pointers
- Horizontal process timeline pins on desktop and stacks on mobile
- `prefers-reduced-motion` short-circuits the loader, Lenis, and GSAP pinning

## License

Original studio implementation. Placeholder brands, people and case studies are fictional.
