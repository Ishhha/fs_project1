#!/bin/bash
# ------------------------------------------------------------------------------
# loadtest.sh — Lightweight API load test using curl or autocannon
# ------------------------------------------------------------------------------
# Usage:
#   ./scripts/loadtest.sh
# ------------------------------------------------------------------------------

API_URL="http://localhost:4000/api/triage/start"
API_KEY="local-dev-key"
REQS=20

echo "🔬 Running load test against $API_URL"

# Check backend health
if ! curl -s "$API_URL" >/dev/null; then
	echo "❌ API not reachable. Start backend before running loadtest."
	exit 1
fi

# Option 1: simple concurrent curl test
for i in $(seq 1 $REQS); do
	curl -s -X POST "$API_URL" \
		-H "x-api-key: $API_KEY" \
		-H "Content-Type: application/json" \
		-d '{"customerId":"cust_001"}' >/dev/null &
done

wait
echo "✅ $REQS concurrent requests completed."

# Option 2 (optional): using autocannon if installed
if command -v npx >/dev/null; then
	echo "⚡ Running stress test (autocannon)..."
	npx autocannon -c 10 -d 10 -p 1 "$API_URL"
fi

echo "📊 Load test complete!"
