#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

if [[ "$(git branch --show-current)" != "personal" ]]; then
  echo "Run this script from the personal branch." >&2
  exit 1
fi

if command -v tnpm >/dev/null 2>&1; then
  package_manager=tnpm
else
  package_manager=npm
fi

"$package_manager" install
"$package_manager" run build
"$package_manager" link

echo "Installed $(ft --version) from $repo_root"
