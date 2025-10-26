#!/bin/bash
# ------------------------------------------------------------------------------
# migrate.sh — Runs database migrations safely
# ------------------------------------------------------------------------------
# Usage:
#   ./scripts/migrate.sh
# ------------------------------------------------------------------------------

echo "🚀 Starting migration process..."

cd "$(dirname "$0")/../api" || exit 1

# Ensure dependencies
if [ ! -d "node_modules" ]; then
	npm install --silent
fi

# Run Prisma migration
echo "📜 Applying migrations to Postgres..."
npx prisma migrate deploy

# Generate updated Prisma client
echo "⚙️ Regenerating Prisma client..."
npx prisma generate

echo "✅ Migration successful!"
