#!/usr/bin/env bash
set -euo pipefail

: "${BUCKET:?MOCK_DATA_BUCKET must be configured}"

cd "$(dirname "$0")/.."

upload_dir=$(mktemp -d)
cleanup() {
  rm -f \
    "${upload_dir}/position/position.csv" \
    "${upload_dir}/device_activations/device_activations.csv" \
    "${upload_dir}/caseload/caseload.csv" \
    "${upload_dir}/orders_activations_positions/orders_activations_positions.csv"
  rmdir \
    "${upload_dir}/position" \
    "${upload_dir}/device_activations" \
    "${upload_dir}/caseload" \
    "${upload_dir}/orders_activations_positions" \
    "${upload_dir}"
}
trap cleanup EXIT

mkdir -p \
  "${upload_dir}/position" \
  "${upload_dir}/device_activations" \
  "${upload_dir}/caseload" \
  "${upload_dir}/orders_activations_positions"

cp output/positions.csv "${upload_dir}/position/position.csv"
cp output/device_activations.csv "${upload_dir}/device_activations/device_activations.csv"
cp output/caseload.csv "${upload_dir}/caseload/caseload.csv"
cp output/orders_activations_positions.csv \
  "${upload_dir}/orders_activations_positions/orders_activations_positions.csv"

echo "Syncing synthetic data to s3://${BUCKET}"
aws s3 sync "${upload_dir}/" "s3://${BUCKET}/" --only-show-errors
echo "Synthetic data synced to s3://${BUCKET}"
