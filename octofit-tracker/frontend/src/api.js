/**
 * Base URL for the Django REST API.
 * In GitHub Codespaces, set REACT_APP_CODESPACE_NAME in the frontend env (see GitHub docs for forwarded ports).
 */
export function getApiBaseUrl() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://127.0.0.1:8000';
}

/** DRF pagination returns { results: [...] }; some endpoints may return a bare array. */
export function normalizeListData(payload) {
  if (payload == null) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.results)) return payload.results;
  return [];
}
