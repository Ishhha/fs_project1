#!/bin/bash
# ------------------------------------------------------------------------------
# seed.sh — Seeds the database with initial fixture data
# ------------------------------------------------------------------------------
# Usage:
#   ./scripts/seed.sh
# ------------------------------------------------------------------------------

echo "🌱 Starting database seeding..."

# Navigate to API root
cd "$(dirname "$0")/../api" || exit 1

# Check if Prisma client exists
if [ ! -d "node_modules/@prisma/client" ]; then
	echo "📦 Installing dependencies..."
	npm install --silent
fi

# Run migrations
echo "🧱 Running Prisma migrations..."
npx prisma migrate dev --name init-seed

# Seed the database using Prisma seed script
echo "📥 Inserting fixture data..."
npm run seed

# Verification query (optional)
echo "🔎 Checking sample data..."
npx prisma db execute --script "SELECT COUNT(*) FROM Customer;"

echo "✅ Seeding complete!"
