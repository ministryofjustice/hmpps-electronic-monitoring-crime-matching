#!/usr/bin/env bash
set -euo pipefail

: "${BUCKET:?MOCK_DATA_BUCKET must be configured}"

cd "$(dirname "$0")/.."

echo "Syncing synthetic data to s3://${BUCKET}"
aws s3 sync output/s3/ "s3://${BUCKET}/" --only-show-errors
echo "Synthetic data synced to s3://${BUCKET}"
