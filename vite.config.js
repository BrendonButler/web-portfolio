export default {
  build: {
    minify: 'terser'
  },
  server: {
    // Bind to all interfaces so the dev server is reachable from outside the
    // container (devcontainer port-forwarding and Kubernetes NodePort both
    // require 0.0.0.0 rather than the default 127.0.0.1).
    host: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
};
