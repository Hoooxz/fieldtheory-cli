#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

if [[ "$(git branch --show-current)" != "personal" ]]; then
  echo "Run this script from the personal branch." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash changes first." >&2
  exit 1
fi

if ! git remote get-url upstream >/dev/null 2>&1; then
  git remote add upstream https://github.com/afar1/fieldtheory-cli.git
fi

git fetch --prune upstream
git switch main
git merge --ff-only upstream/main
git switch personal
git merge --no-edit main

echo "Upstream merged locally. Review, test, then push main and personal."
