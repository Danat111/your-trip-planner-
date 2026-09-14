# Trip Planner API (Backend)

Real backend that fixes the critical issue in the original prototype: all
third-party API keys (Amadeus, Google Places, OpenWeatherMap) and the
Anthropic API key now live only on the server, in environment variables.
The frontend (web + mobile) talks only to this API — it never sees a secret.

## What's implemented
- `POST /api/auth/register`, `POST /api/auth/login` — JWT-based auth, bcrypt password hashing
- `POST /api/trip-planner/generate` — looks up the destination, fetches live weather + attractions,
  then calls **Claude** to generate a real, reasoned day-by-day itinerary (JSON)
- `GET/POST/DELETE /api/trips` — authenticated CRUD for saving a user's generated trips
- Security: `helmet`, CORS allow-list, rate limiting, zod input validation everywhere

## Setup

```bash
npm install
cp .env.example .env   # fill in ANTHROPIC_API_KEY at minimum; others are optional (degrade gracefully)
npx prisma generate
npx prisma migrate dev --name init
npm run dev             # http://localhost:4000
```

> Note: `prisma generate` downloads a small engine binary from
> `binaries.prisma.sh` the first time. If you're running this inside a
> network-restricted sandbox, that domain needs to be allow-listed; on a
> normal machine, CI runner, or any standard hosting provider this works
> out of the box with no extra configuration.

## Environment variables
See `.env.example`. Only `JWT_SECRET` and `ANTHROPIC_API_KEY` are required
for the core flow to work end-to-end. The travel-data providers
(Amadeus / Google Places / OpenWeatherMap) are optional — if a key is
missing, that provider is skipped and the AI still generates a plan using
whatever data is available, just with less real-time detail.

## Production checklist
- Switch `datasource db` in `prisma/schema.prisma` from `sqlite` to `postgresql`
  and point `DATABASE_URL` at a managed Postgres instance.
- Put this behind HTTPS (e.g. a reverse proxy / managed platform like
  Render, Fly.io, Railway, or a container on AWS/GCP).
- Rotate `JWT_SECRET` and all provider keys before going live; never commit `.env`.
- Consider moving the Amadeus OAuth token cache to Redis if you run multiple instances.
