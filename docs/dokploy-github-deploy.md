# Dokploy Deployment Guide (GitHub + GHCR)

This repository supports two deployment models in Dokploy:

1. GitHub source deployment (Dokploy pulls repo and builds from `Dockerfile`)
2. Docker image deployment (Dokploy pulls prebuilt image from `ghcr.io`)

## Prerequisites

- A Dokploy instance already connected to your cluster/server
- This repository pushed to GitHub
- Main branch: `main`
- The GitHub Actions workflows in:
   - `.github/workflows/publish-ghcr.yml` (main branch images)
   - `.github/workflows/publish-ghcr-release.yml` (versioned release images)

## Option A: Deploy via Dokploy GitHub Integration

Reference: <https://docs.dokploy.com/docs/core/github>

1. In Dokploy, open `Git` and select `Github`.
2. Choose account type (`Organization` or `Personal Account`).
3. Click `Create Github App`.
4. Set a unique app name, then click `Create Github App`.
5. Back in Dokploy, click `Install`.
6. In GitHub, select either all repositories or just this repository.
7. Click `Install & Authorize`.
8. In Dokploy, create a new `Application`.
9. Select this repository and the `main` branch.
10. Ensure build method uses `Dockerfile` from repository root.
11. Set runtime port to `3000` (or map to your public port/domain as needed).
12. Deploy.

Notes:

- Dokploy auto deploys on pushes to the selected branch.
- If you need staging and production from the same repo, create separate Dokploy applications with different branches.

## Option B: Deploy via GHCR Image (GitHub Packages)

Reference: <https://docs.dokploy.com/docs/core/Docker>

### 1) Publish image to GHCR

The workflow `.github/workflows/publish-ghcr.yml` publishes image tags on each push to `main`.

The workflow `.github/workflows/publish-ghcr-release.yml` publishes semantic version tags when you push a tag like `v1.2.3` or publish a GitHub Release.

Expected image name:

- `ghcr.io/<github_owner>/dokploy-sample-app:latest`
- `ghcr.io/<github_owner>/dokploy-sample-app:1.2.3` (from tag/release)
- `ghcr.io/<github_owner>/dokploy-sample-app:1.2` (from tag/release)
- `ghcr.io/<github_owner>/dokploy-sample-app:1` (from tag/release)

### 2) Configure Dokploy registry credentials for GHCR

Reference: <https://docs.dokploy.com/docs/core/registry/ghcr>

1. In GitHub, create a Personal Access Token (classic).
2. Recommended scopes:
   - `read:packages` (required for pulling images)
   - `repo` (required for private repositories/packages)
3. In Dokploy, go to `Registry` and add GHCR:
   - Registry URL: `ghcr.io`
   - Username: your GitHub username
   - Password: the token

### 3) Create Docker source app in Dokploy

1. Create an `Application` in Dokploy.
2. Set source to `Docker`.
3. Docker Image: `ghcr.io/<github_owner>/dokploy-sample-app:latest`
4. Registry URL: `ghcr.io`
5. Attach GHCR credentials (username/token).
6. Set container port to `3000`.
7. Deploy.

If you prefer immutable releases in production, use a fixed version tag instead of `latest`, for example:

- `ghcr.io/<github_owner>/dokploy-sample-app:1.2.3`

## Verification

After deployment, verify endpoints:

- `/health` should return `ok`
- `/` should return JSON with app metadata

## Troubleshooting

- Image not found: confirm the workflow ran and package is published in GitHub Packages.
- Unauthorized pull: verify Dokploy GHCR username/token and token scopes.
- Wrong branch auto deploy: ensure Dokploy app is pointed to the intended branch.
