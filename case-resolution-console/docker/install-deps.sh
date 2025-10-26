#!/bin/bash
set -e

echo "Installing API dependencies..."
cd /workspace/api && npm ci --ignore-scripts

echo "Installing Web dependencies..."
cd /workspace/web && npm ci --ignore-scripts

echo "Done."
