#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# post-create.sh — Runs once after the dev container is first created.
#
# This script is executed as the 'node' user inside the container.
# Keep it idempotent: safe to re-run if the container is rebuilt.
# ──────────────────────────────────────────────────────────────────────────────
set -euo pipefail

echo "── web-portfolio devcontainer: post-create setup ──────────────────────────"

# ── 1. Install dependencies ──────────────────────────────────────────────────
echo "[1/3] Installing npm dependencies (npm ci)..."
npm ci

# ── 2. Git safety: mark the workspace as a safe directory ───────────────────
# Required when the repo is owned by a different UID on the host (common in
# Docker-on-Linux and Kubernetes hostPath mounts).
echo "[2/3] Configuring git safe directory..."
git config --global --add safe.directory /workspace

# ── 3. Confirm tooling versions ─────────────────────────────────────────────
echo "[3/3] Environment summary:"
echo "  Node  : $(node --version)"
echo "  npm   : $(npm --version)"
echo "  TypeScript: $(npx tsc --version)"

echo ""
echo "── Dev container ready. Available commands: ────────────────────────────────"
echo "  npm start          → Vite dev server  (http://localhost:5173)"
echo "  npm run preview    → Vite preview     (http://localhost:4173)"
echo "  npm run storybook  → Storybook        (http://localhost:6006)"
echo "  npm test           → Cypress component tests"
echo "────────────────────────────────────────────────────────────────────────────"
