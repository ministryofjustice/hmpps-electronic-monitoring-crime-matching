#!/usr/bin/env bash

set -euo pipefail

readonly NAMESPACE="hmpps-electronic-monitoring-crime-matching-dev"
readonly OS_MAPS_SECRET="hmpps-electronic-monitoring-crime-matching-ui-os-maps"
readonly UI_AUTH_CODE_SECRET="hmpps-electronic-monitoring-crime-matching-ui-auth-code"
readonly UI_CLIENT_CREDS_SECRET="hmpps-electronic-monitoring-crime-matching-ui-client-creds"
readonly ALGO_CLIENT_CREDS_SECRET="hmpps-electronic-monitoring-crime-matching-algorithm-client-creds"
readonly DATASTORE_SECRET="athena-roles"

clone_repo() {
    local url="$1"
    local directory="$2"

    if [[ -d "$directory" ]]; then
        echo "Skipped cloning $directory, directory already exists"
        return
    fi

    echo "Cloning $directory..."
    git clone -q "$url" "$directory"
}

get_secret() {
    local secret_name="$1"
    local key="$2"
    local encoded_value

    encoded_value="$(
        kubectl -n "$NAMESPACE" get secret "$secret_name" -o json |
            jq -er --arg key "$key" '.data[$key]'
    )"

    printf '%s' "$encoded_value" | base64 -d
}

set_env() {
    local file="$1"
    local key="$2"
    local value="$3"
    local escaped_value

    # Escape characters that have special meaning in a sed replacement.
    escaped_value=$(printf '%s' "$value" | sed 's/[&|\]/\\&/g')

    if grep -q "^${key}=" "$file"; then
        sed -i '' "s|^${key}=.*|${key}=${escaped_value}|" "$file"
    else
        printf '%s=%s\n' "$key" "$value" >> "$file"
    fi
}

clone_repo \
    "git@github.com:ministryofjustice/hmpps-electronic-monitoring-crime-matching-api.git" \
    "api"

clone_repo \
    "git@github.com:ministryofjustice/hmpps-electronic-monitoring-crime-matching-ui.git" \
    "ui"

clone_repo \
    "git@github.com:ministryofjustice/hmpps-electronic-monitoring-crime-matching-algorithm.git" \
    "algorithm"

echo "Creating .env..."
cp .env.example .env

echo "Populating ordnance survey secrets from dev namespace..."

set_env \
    ".env" \
    "UI__OS_MAPS_API_KEY" \
    "$(get_secret "$OS_MAPS_SECRET" "OS_MAPS_API_KEY")"

set_env \
    ".env" \
    "UI__OS_MAPS_API_SECRET" \
    "$(get_secret "$OS_MAPS_SECRET" "OS_MAPS_API_SECRET")"

echo "Populating UI auth client secrets from dev namespace..."

set_env \
    ".env" \
    "UI__AUTH_CODE_CLIENT_ID" \
    "$(get_secret "$UI_AUTH_CODE_SECRET" "AUTH_CODE_CLIENT_ID")"

set_env \
    ".env" \
    "UI__AUTH_CODE_CLIENT_SECRET" \
    "$(get_secret "$UI_AUTH_CODE_SECRET" "AUTH_CODE_CLIENT_SECRET")"

set_env \
    ".env" \
    "UI__CLIENT_CREDS_CLIENT_ID" \
    "$(get_secret "$UI_CLIENT_CREDS_SECRET" "CLIENT_CREDS_CLIENT_ID")"

set_env \
    ".env" \
    "UI__CLIENT_CREDS_CLIENT_SECRET" \
    "$(get_secret "$UI_CLIENT_CREDS_SECRET" "CLIENT_CREDS_CLIENT_SECRET")"

echo "Populating algorithm auth client secrets from dev namespace..."

set_env \
    ".env" \
    "ALGO__CLIENT_CREDS_CLIENT_ID" \
    "$(get_secret "$ALGO_CLIENT_CREDS_SECRET" "CLIENT_CREDS_CLIENT_ID")"

set_env \
    ".env" \
    "ALGO__CLIENT_CREDS_CLIENT_SECRET" \
    "$(get_secret "$ALGO_CLIENT_CREDS_SECRET" "CLIENT_CREDS_CLIENT_SECRET")"

echo "Populating datastore secrets from dev namespace..."

set_env \
    ".env" \
    "DATASTORE__ROLE_ARN" \
    "$(get_secret "$DATASTORE_SECRET" "general_role_arn")"

echo ".env created successfully"