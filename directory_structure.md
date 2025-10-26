case-resolution-console/
│
├── api/                             # Backend service (Node/Express)
│   ├── src/
│   │   ├── controllers/             # Route controllers (triage, customers, actions, etc.)
│   │   ├── services/                # Business logic & multi-agent orchestration
│   │   ├── agents/                  # Sub-agents (Insights, Fraud, Compliance, KB, etc.)
│   │   ├── utils/                   # Helper functions (pagination, redaction, rate limiter)
│   │   ├── middleware/              # Auth, rate limit, logging, error handling
│   │   ├── models/                  # ORM / database models
│   │   ├── routes/                  # Express routes definitions
│   │   ├── jobs/                    # Background jobs, retries, circuit breaker
│   │   ├── config/                  # Config files (DB, Redis, environment)
│   │   ├── cli/                     # CLI evaluation tool for golden cases
│   │   ├── metrics/                 # Prometheus metrics collection
│   │   ├── index.ts                 # API entrypoint
│   │   └── app.ts                   # Express app setup
│   │
│   ├── tests/                       # Unit & integration tests
│   ├── prisma/                      # Prisma schema & migrations (if using Prisma)
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── web/                             # Frontend (React + Tailwind)
│   ├── src/
│   │   ├── components/              # UI components (tables, modals, drawers)
│   │   ├── routes/                  # React Router pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Alerts.tsx
│   │   │   ├── Customer.tsx
│   │   │   ├── Eval.tsx
│   │   │   └── NotFound.tsx
│   │   ├── hooks/                   # Custom hooks (SSE, pagination, a11y)
│   │   ├── utils/                   # Helper utilities
│   │   ├── context/                 # Global context (auth, triage session)
│   │   ├── assets/                  # Logos, icons, static images
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   ├── package.json
│   └── README.md
│
├── fixtures/                        # Data fixtures for seeding and evaluation
│   ├── customers.json
│   ├── cards.json
│   ├── accounts.json
│   ├── transactions.json
│   ├── alerts.json
│   ├── kb_docs.json
│   ├── policies.json
│   ├── devices.json
│   ├── chargebacks.json
│   └── evals/
│       ├── case_freeze_otp.json
│       ├── case_dispute.json
│       ├── duplicate_charge.json
│       ├── fallback_timeout.json
│       ├── rate_limit_429.json
│       ├── pii_redaction.json
│       └── ...
│
├── scripts/                         # Utility scripts (seed, migrate, test, demo)
│   ├── seed.sh
│   ├── migrate.sh
│   ├── loadtest.sh
│   └── eval_report.sh
│
├── docs/                            # Documentation
│   ├── README.md                    # High-level overview
│   ├── ADR.md                       # Architecture decisions log
│   ├── API_SPEC.md                  # API contract
│   ├── ARCHITECTURE.md              # Diagrams and data flow
│   ├── EVAL_GUIDE.md                # How to run eval CLI
│   ├── TEST_PLAN.md                 # Acceptance and performance tests
│   └── DEMO_SCRIPT.md               # 8-minute demo walkthrough
│
├── docker-compose.yml               # Compose file to run Postgres, Redis, API, Web
├── .env.example                     # Environment variables template
├── .gitignore
└── README.md                        # Root README (run in 3 commands)
