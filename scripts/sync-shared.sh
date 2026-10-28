#!/usr/bin/env bash
# Copies shared/ into every app, or with --check fails if any copy differs.
set -euo pipefail
cd "$(dirname "$0")/.."

apps=(movie-cards-library recipe-app starwars-planets trivia trybetunes trybewallet tryunfo)
# "source in shared/:destination" pairs; Trybewarts is plain HTML, so it only takes the bar's CSS.
copies=("ProjectBar.css:trybewarts/project-bar.css")
for app in "${apps[@]}"; do
  copies+=(
    "i18n.js:$app/src/i18n.js"
    "ProjectBar.jsx:$app/src/components/ProjectBar.jsx"
    "ProjectBar.css:$app/src/components/ProjectBar.css"
  )
done

status=0
for pair in "${copies[@]}"; do
  src="shared/${pair%%:*}"
  dest="${pair#*:}"
  if [ "${1:-}" = "--check" ]; then
    cmp -s "$src" "$dest" || { echo "$dest differs from $src; run scripts/sync-shared.sh"; status=1; }
  else
    mkdir -p "$(dirname "$dest")"
    cp "$src" "$dest"
  fi
done
exit "$status"
