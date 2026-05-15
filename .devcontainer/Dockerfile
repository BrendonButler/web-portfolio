# ──────────────────────────────────────────────────────────────────────────────
# web-portfolio — Dev Container Image
#
# Base: node:20-bookworm-slim (Debian Bookworm, minimal surface area)
# User: node (UID 1000, pre-created by the base image — never run as root)
# ──────────────────────────────────────────────────────────────────────────────
FROM node:20-bookworm-slim

# Install system-level tooling needed for development and IntelliJ IDEA Gateway.
# Keep the layer small: no recommends, clean apt cache in the same layer.
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    wget \
    procps \
    less \
    openssh-client \
    ca-certificates \
    gnupg \
    lsb-release \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Global npm tools that should be available everywhere in the container.
# ci-info, npm-check-updates — lightweight and commonly needed.
# Do NOT install packages here that are project-specific (use postCreateCommand).
RUN npm install -g npm@latest npm-check-updates

# Use the pre-existing non-root 'node' user (UID/GID 1000).
USER node

# Set the workspace directory. The devcontainer runtime (or K8s hostPath mount)
# will bind the repo root here at container start.
WORKDIR /workspace

# Expose the ports used during development:
#   5173  — Vite dev server
#   4173  — Vite preview (vite preview)
#   6006  — Storybook
EXPOSE 5173 4173 6006
