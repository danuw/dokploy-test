# Dokploy Sample App

Sample Node.js app to demonstrate deployment on a Dokploy cluster using:

- Dokploy GitHub integration (build from repo)
- GitHub Container Registry (`ghcr.io`) images published via GitHub Actions

## What this repo includes

- Simple Express app (`src/server.js`)
- Dockerfile for containerized deployment (`Dockerfile`)
- Docker Compose definition for Dokploy Compose source (`docker-compose.yml`)
- GitHub Actions workflow to publish container image to GHCR (`.github/workflows/publish-ghcr.yml`)
- GitHub Actions workflow for release/tag image publishing (`.github/workflows/publish-ghcr-release.yml`)
- Step-by-step Dokploy deployment guide (`docs/dokploy-github-deploy.md`)

## Run locally

```bash
npm install
npm start
```

App runs on `http://localhost:3000`.

## Container image publishing

On each push to `main`, GitHub Actions builds and pushes images to:

- `ghcr.io/<github_owner>/dokploy-sample-app:latest`
- `ghcr.io/<github_owner>/dokploy-sample-app:sha-<commit>`
- `ghcr.io/<github_owner>/dokploy-sample-app:main`

When you create a Git tag like `v1.2.3` (or publish a GitHub Release for that tag), the release workflow also publishes:

- `ghcr.io/<github_owner>/dokploy-sample-app:1.2.3`
- `ghcr.io/<github_owner>/dokploy-sample-app:1.2`
- `ghcr.io/<github_owner>/dokploy-sample-app:1`
- `ghcr.io/<github_owner>/dokploy-sample-app:v1.2.3`

## Deploy on Dokploy

Use the detailed guide:

- `docs/dokploy-github-deploy.md`

Primary Dokploy docs used:

- <https://docs.dokploy.com/docs/core/github>
- <https://docs.dokploy.com/docs/core/Docker>
- <https://docs.dokploy.com/docs/core/registry/ghcr>
