#!/usr/bin/env bash
#
# Generates the synthetic crime matching data and uploads the electronic monitoring
# CSVs to the S3 bucket backing the mock Datastore (Athena) used by the dev environment.
#
# Temporary credentials are obtained by assuming the mock datastore role from inside the
# namespace's service pod, as the pod's service account is the principal trusted by the role.
#
# Usage: ./scripts/deploy-synthetic-data.sh [--dry-run] [--skip-generate]
#
# Requires: kubectl (authenticated against the dev namespace), jq, aws, npm
#
set -euo pipefail

NAMESPACE="${NAMESPACE:-hmpps-electronic-monitoring-crime-matching-dev}"
BUCKET="${BUCKET:-crime-matching-mock-datastore-test-data}"
ROLE_SECRET="${ROLE_SECRET:-mock-datastore-roles}"
SERVICE_POD_LABEL="${SERVICE_POD_LABEL:-name=hmpps-em-crime-matching-dev-service-pod}"
export AWS_REGION="${AWS_REGION:-eu-west-2}"

# Local file in ./output -> S3 key in the bucket (one folder per Athena table)
UPLOADS=(
  "positions.csv:position/position.csv"
  "device_activations.csv:device_activations/device_activations.csv"
  "caseload.csv:caseload/caseload.csv"
  "orders_activations_positions.csv:orders_activations_positions/orders_activations_positions.csv"
)

DRY_RUN=false
SKIP_GENERATE=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --skip-generate) SKIP_GENERATE=true ;;
    -h | --help)
      sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      exit 1
      ;;
  esac
done

log() { echo "==> $*"; }

require() {
  for cmd in "$@"; do
    command -v "$cmd" >/dev/null 2>&1 || { echo "Required command not found: $cmd" >&2; exit 1; }
  done
}

mask() {
  if [[ "${GITHUB_ACTIONS:-}" == "true" ]]; then
    echo "::add-mask::$1"
  fi
}

cd "$(dirname "$0")/.."

if [[ "$SKIP_GENERATE" == false ]]; then
  require npm
  log "Building and generating synthetic data"
  npm run --silent build
  npm run --silent create-synthetic-data
fi

for upload in "${UPLOADS[@]}"; do
  file="./output/${upload%%:*}"
  [[ -s "$file" ]] || { echo "Missing or empty output file: $file" >&2; exit 1; }
done

if [[ "$DRY_RUN" == true ]]; then
  log "Dry run - the following files would be uploaded:"
  for upload in "${UPLOADS[@]}"; do
    echo "  ./output/${upload%%:*} -> s3://${BUCKET}/${upload#*:}"
  done
  exit 0
fi

require kubectl jq aws

log "Looking up mock datastore role in namespace ${NAMESPACE}"
ROLE_ARN=$(kubectl -n "$NAMESPACE" get secret "$ROLE_SECRET" -o json | jq -r '.data.general_role_arn // empty' | base64 --decode)
[[ -n "$ROLE_ARN" ]] || { echo "Could not read general_role_arn from secret ${ROLE_SECRET}" >&2; exit 1; }

POD=$(kubectl -n "$NAMESPACE" get pods -l "$SERVICE_POD_LABEL" --field-selector=status.phase=Running -o json | jq -r '.items[0].metadata.name // empty')
[[ -n "$POD" ]] || { echo "No running service pod found with label ${SERVICE_POD_LABEL}" >&2; exit 1; }

SESSION_NAME=$(printf 'synthetic-data-%s-%s' "${GITHUB_ACTOR:-${USER:-unknown}}" "$(date +%s)" | tr -c 'A-Za-z0-9+=,.@_-' '-' | cut -c1-64)

log "Assuming role via service pod ${POD}"
CREDENTIALS=$(kubectl -n "$NAMESPACE" exec "$POD" -- \
  aws sts assume-role --role-arn "$ROLE_ARN" --role-session-name "$SESSION_NAME" --output json)

AWS_ACCESS_KEY_ID=$(jq -r '.Credentials.AccessKeyId' <<<"$CREDENTIALS")
AWS_SECRET_ACCESS_KEY=$(jq -r '.Credentials.SecretAccessKey' <<<"$CREDENTIALS")
AWS_SESSION_TOKEN=$(jq -r '.Credentials.SessionToken' <<<"$CREDENTIALS")
unset CREDENTIALS
mask "$AWS_ACCESS_KEY_ID"
mask "$AWS_SECRET_ACCESS_KEY"
mask "$AWS_SESSION_TOKEN"
export AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN
unset AWS_PROFILE

for upload in "${UPLOADS[@]}"; do
  file="./output/${upload%%:*}"
  destination="s3://${BUCKET}/${upload#*:}"
  log "Uploading ${file} -> ${destination}"
  aws s3 cp --only-show-errors "$file" "$destination"
done

log "Synthetic data deployed to s3://${BUCKET}"
