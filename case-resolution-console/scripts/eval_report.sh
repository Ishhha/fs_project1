#!/bin/bash
# ------------------------------------------------------------------------------
# eval_report.sh — Runs CLI evaluation suite and generates summary report
# ------------------------------------------------------------------------------
# Usage:
#   ./scripts/eval_report.sh
# ------------------------------------------------------------------------------

EVAL_DIR="../fixtures/evals"
REPORT_FILE="../reports/eval_summary_$(date +%Y%m%d_%H%M%S).txt"

echo "🧠 Running evaluation tests..."
cd "$(dirname "$0")/../api" || exit 1

# Ensure CLI eval script exists
if [ ! -f "src/cli/eval.ts" ]; then
	echo "❌ CLI evaluation script not found (src/cli/eval.ts)."
	exit 1
fi

# Compile CLI if needed
if [ ! -d "node_modules" ]; then
	npm install --silent
fi

echo "📊 Evaluating golden cases from $EVAL_DIR"

# Create report directory
mkdir -p ../reports

# Execute evaluation via ts-node
npx ts-node src/cli/eval.ts --path "$EVAL_DIR" | tee "$REPORT_FILE"

echo "✅ Evaluation complete!"
echo "📁 Report saved to: $REPORT_FILE"
