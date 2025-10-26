# 🧠 Case Resolution Console — API Service

This service provides the backend for the **Case Resolution Console** project.  
It runs locally using Docker or directly with Node/TypeScript.

===

## 🚀 Features

- Express + TypeScript backend
- PostgreSQL + Redis integration
- Modular sub-agents (fraud, insights, compliance, KB)
- SSE-based triage event streaming
- Rate limiting, redaction, and metrics
- CLI evaluation tool
- Jest-based unit & integration tests
- Prisma ORM schema + seeding

===

## 🧩 Project Structure

```
src/
controllers/   → Route handlers
services/      → Business logic (multi-agent orchestration)
agents/        → Insights, Fraud, Compliance, KB agents
utils/         → Helpers (logging, redaction, SSE, etc.)
middleware/    → Auth, rate limiting, request IDs
models/        → Database repositories
routes/        → Express routers
metrics/       → Prometheus-style metrics
cli/           → Eval CLI for golden cases
```

===

## 🧱 Setup

### 1️⃣ Install dependencies
```bash
cd api
npm install
```

### 2️⃣ Setup environment variables

Create `.env` in `api/`:

```
NODE_ENV=development
PORT=4000
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DATABASE=case_resolution
REDIS_URL=redis://localhost:6379
API_KEY=local-dev-key
```

### 3️⃣ Database (Postgres)

```bash
npx prisma migrate dev
npm run seed
```

### 4️⃣ Run the API

```bash
npm run dev
```

### 5️⃣ Test endpoints

```bash
curl http://localhost:4000/api/customers/1 -H "x-api-key: local-dev-key"
curl -N -H "x-api-key: local-dev-key" -X POST http://localhost:4000/api/triage/start -d '{"customerId": "1"}'
```

### 6️⃣ Run tests

```bash
npm test
```

===

## 🧪 Useful Commands

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Run API in dev mode (ts-node) |
| `npm run build`   | Build JS into `dist/`         |
| `npm start`       | Run compiled server           |
| `npm run seed`    | Populate DB with sample data  |
| `npm run migrate` | Run Prisma migrations         |
| `npm test`        | Execute Jest tests            |

===

## 🧾 Metrics

The service exposes a `/metrics` endpoint in Prometheus format:

```bash
curl http://localhost:4000/metrics
```

===

## 🧰 Troubleshooting

* **Port in use** → Change `PORT` in `.env`
* **DB connection error** → Check `DATABASE_URL` or Postgres container
* **Rate limit (429)** → Reduce request rate or adjust `RATE_LIMIT_MAX` in `.env`

===

© 2025 — Built for Zeta Fullstack+AI Assignment
# API (placeholder)

This folder contains a minimal placeholder API (Express + TypeScript).

Run:

npm install
npm run start
