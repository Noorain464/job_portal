#!/usr/bin/env bash
# End-to-end user journey through the Ingress: register -> login -> authenticated read.
# Creates ONE fake user (devops-test-<timestamp>@example.com) in the database.
set -euo pipefail

BASE=${BASE:-http://localhost}
HOST_HEADER=${HOST_HEADER:-api.job-portal.local}
EMAIL="devops-test-$(date -u +%Y%m%d%H%M%S)@example.com"
PASS=$(openssl rand -hex 8)          # random, never printed or stored
JAR=$(mktemp); BODY=$(mktemp); IMG=$(mktemp).png
trap 'rm -f "$JAR" "$BODY" "$IMG"' EXIT
echo "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" | base64 -d > "$IMG"

req() { curl -sS -m 15 -H "Host: $HOST_HEADER" "$@"; }

call() {  # call <expected-code-regex> <label> <curl args...>
  local want=$1 label=$2; shift 2
  local code; code=$(req -o "$BODY" -w '%{http_code}' "$@")
  echo "[$label] HTTP $code (expected $want)"
  head -c 300 "$BODY" | sed -E 's/("token"[[:space:]]*:[[:space:]]*")[^"]+/\1***/g'; echo
  [[ "$code" =~ ^($want)$ ]] || { echo "FAIL: $label"; exit 1; }
}

echo "time:           $(date -u +%FT%TZ)"
echo "version before: $(req "$BASE/version")"

call "200|201" "1 register" -X POST "$BASE/api/user/register" \
  -F fullname="DevOps Test" -F email="$EMAIL" -F phoneNumber=9999999999 \
  -F password="$PASS" -F role=student -F "file=@$IMG;type=image/png"

call "200" "2 login" -c "$JAR" -X POST "$BASE/api/user/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"role\":\"student\"}"

call "200" "3 list jobs (with session cookie)" -b "$JAR" "$BASE/api/job/get"

call "401" "4 list jobs (no cookie, must be rejected)" "$BASE/api/job/get"

echo "version after:  $(req "$BASE/version")"
echo "JOURNEY OK"
