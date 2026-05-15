#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# setup-local-cluster.sh
#
# Bootstraps a local minikube-based Kubernetes dev environment for web-portfolio.
#
# What this script does:
#   1. Starts (or reuses) a minikube cluster named 'web-portfolio-dev'
#   2. Writes an ISOLATED kubeconfig so your existing homelab kubectl config
#      is never touched
#   3. Builds the devcontainer Docker image and loads it into minikube
#   4. Applies all Kubernetes manifests via kustomize
#   5. Waits for the pod to be ready and prints access URLs
#
# Requirements:
#   - minikube   (https://minikube.sigs.k8s.io/docs/start/)
#   - kubectl    (https://kubernetes.io/docs/tasks/tools/)
#   - docker     (for building the image)
#
# Usage:
#   bash k8s/scripts/setup-local-cluster.sh
#
# To tear down:
#   minikube delete --profile web-portfolio-dev
#   rm -f ~/.kube/web-portfolio-dev.kubeconfig
# ──────────────────────────────────────────────────────────────────────────────
set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
PROFILE="web-portfolio-dev"
NAMESPACE="web-portfolio-dev"
IMAGE_NAME="web-portfolio-devcontainer"
IMAGE_TAG="dev"

# Path to the isolated kubeconfig for this cluster.
# This file is SEPARATE from ~/.kube/config, so your homelab context is safe.
DEV_KUBECONFIG="${HOME}/.kube/${PROFILE}.kubeconfig"

# Resolve repo root (parent of k8s/scripts/)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

# ── Helpers ───────────────────────────────────────────────────────────────────
log() { echo "── $* ─────────────────────────────────────────────────────────────"; }
require() {
  if ! command -v "$1" &>/dev/null; then
    echo "ERROR: '$1' is required but not found. Please install it and retry."
    exit 1
  fi
}

# ── Pre-flight checks ─────────────────────────────────────────────────────────
require minikube
require kubectl
require docker

# ── 1. Start or reuse the minikube cluster ───────────────────────────────────
log "Starting minikube cluster (profile: ${PROFILE})"

if minikube status --profile "${PROFILE}" &>/dev/null; then
  echo "  Cluster '${PROFILE}' already running — skipping start."
else
  minikube start \
    --profile "${PROFILE}" \
    --driver=docker \
    --cpus=2 \
    --memory=4096 \
    --disk-size=20g \
    --kubernetes-version=stable
fi

# ── 2. Write isolated kubeconfig ─────────────────────────────────────────────
log "Writing isolated kubeconfig to ${DEV_KUBECONFIG}"

# Export the kubeconfig for this profile into its own file.
# Your existing ~/.kube/config (and homelab context) is NOT modified.
KUBECONFIG="${DEV_KUBECONFIG}" minikube update-context --profile "${PROFILE}"

echo ""
echo "  Isolated kubeconfig written: ${DEV_KUBECONFIG}"
echo ""
echo "  To use this cluster in your current shell:"
echo "    export KUBECONFIG=\"${DEV_KUBECONFIG}\""
echo ""
echo "  To temporarily MERGE with your existing contexts (read-only safe):"
echo "    export KUBECONFIG=\"${DEV_KUBECONFIG}:\${HOME}/.kube/config\""
echo ""
echo "  To switch back to your default context:"
echo "    unset KUBECONFIG  (or close the terminal)"
echo ""

# Use the isolated kubeconfig for the rest of this script.
export KUBECONFIG="${DEV_KUBECONFIG}"

# ── 3. Build the devcontainer image and load it into minikube ─────────────────
log "Building devcontainer image (${IMAGE_NAME}:${IMAGE_TAG})"

docker build \
  --file "${REPO_ROOT}/.devcontainer/Dockerfile" \
  --tag "${IMAGE_NAME}:${IMAGE_TAG}" \
  "${REPO_ROOT}"

log "Loading image into minikube (avoids needing a registry)"
minikube image load "${IMAGE_NAME}:${IMAGE_TAG}" --profile "${PROFILE}"

# ── 4. Configure the hostPath to point at the repo on your machine ────────────
# On macOS, minikube (docker driver) requires explicit mounting of the host
# directory into the minikube VM. The /Users path is not auto-mounted with
# the docker driver the way it is with the hyperkit/virtualbox drivers.
#
# We use 'minikube mount' in the background. On Intel/M-series Macs with the
# Docker driver, this is typically needed.
log "Mounting repo into minikube VM"

MOUNT_SOURCE="${REPO_ROOT}"
MOUNT_TARGET="/workspace/web-portfolio"

# Check if already mounted (by looking for an existing mount process).
if pgrep -f "minikube mount.*${PROFILE}" &>/dev/null; then
  echo "  Mount already active — skipping."
else
  echo "  Starting minikube mount in background..."
  echo "  ${MOUNT_SOURCE} → ${MOUNT_TARGET}"
  nohup minikube mount "${MOUNT_SOURCE}:${MOUNT_TARGET}" \
    --profile "${PROFILE}" \
    > /tmp/minikube-mount-${PROFILE}.log 2>&1 &
  echo "  Mount PID: $!"
  echo "  Log: /tmp/minikube-mount-${PROFILE}.log"
  sleep 2  # Give the mount a moment to establish
fi

# ── 5. Apply Kubernetes manifests ────────────────────────────────────────────
log "Applying manifests (kubectl apply -k k8s/dev/)"

kubectl apply -k "${REPO_ROOT}/k8s/dev/"

# ── 6. Wait for pod readiness ────────────────────────────────────────────────
log "Waiting for dev pod to be ready (timeout: 120s)"

kubectl rollout status deployment/web-portfolio-dev \
  --namespace "${NAMESPACE}" \
  --timeout=120s

# ── 7. Print access information ──────────────────────────────────────────────
MINIKUBE_IP=$(minikube ip --profile "${PROFILE}")

echo ""
echo "══════════════════════════════════════════════════════════════════════════════"
echo " web-portfolio dev environment is ready!"
echo "══════════════════════════════════════════════════════════════════════════════"
echo ""
echo " Isolated kubeconfig : ${DEV_KUBECONFIG}"
echo " Activate with       : export KUBECONFIG=\"${DEV_KUBECONFIG}\""
echo ""
echo " Pod access (after starting services inside the pod):"
echo "   Vite dev server  : http://${MINIKUBE_IP}:30173"
echo "   Vite preview     : http://${MINIKUBE_IP}:30174"
echo "   Storybook        : http://${MINIKUBE_IP}:30606"
echo ""
echo " Exec into the pod   :"
POD_NAME=$(kubectl get pod -n "${NAMESPACE}" -l app=web-portfolio-dev -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || echo "<pod-name>")
echo "   kubectl exec -it ${POD_NAME} -n ${NAMESPACE} -- bash"
echo ""
echo " Or connect via IntelliJ Gateway:"
echo "   1. Open IntelliJ Gateway → 'Connect via SSH' or 'Dev Containers'"
echo "   2. Use 'kubectl port-forward' to expose SSH if needed"
echo ""
echo " To stop the cluster  : minikube stop --profile ${PROFILE}"
echo " To delete everything  : minikube delete --profile ${PROFILE}"
echo "══════════════════════════════════════════════════════════════════════════════"
