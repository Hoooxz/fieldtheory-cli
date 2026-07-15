# Hoooxz fork maintenance

This fork keeps the official project history and personal changes separate:

- `main` mirrors `afar1/fieldtheory-cli:main`.
- `personal` contains the small Hoooxz-only patch set and is the daily branch.
- `archive/proxy-v1.3.9` preserves the original proxy commit from the old fork.

## Install the personal build

```bash
git switch personal
./scripts/install-personal.sh
ft --version
```

The version output ends in `-hoooxz.1`, which makes it easy to distinguish this
build from the npm release.

## Merge an upstream update

Start on a clean `personal` branch and run:

```bash
./scripts/sync-upstream.sh
tnpm run test
tnpm run build
git push origin main personal
./scripts/install-personal.sh
```

The sync script only fetches and merges locally. It never pushes by itself, so
conflicts and test results can be reviewed before the fork changes remotely.

## Cookie configuration

Create `~/.fieldtheory/bookmarks/.env.local` with permissions `600`:

```dotenv
FT_CT0=<ct0>
FT_AUTH_TOKEN=<auth_token>
```

Resolution order: CLI `--cookies`, env cookies, then browser extraction.
