import { useCallback, useEffect, useMemo, useState } from 'react';
import { getApiBaseUrl, normalizeListData } from '../api';

const TABLE_CLASS =
  'table table-hover table-striped table-bordered align-middle mb-0';

function defaultSearchableText(row) {
  return [row.name, row.username, row.email, row.type, row.score, row.duration, row.description, row.user, row.team]
    .filter((v) => v != null && v !== '')
    .join(' ')
    .toLowerCase();
}

/**
 * Shared layout: Bootstrap card, heading, search form, buttons, table, and API details modal.
 */
export default function DataListView({
  title,
  apiSegment,
  logLabel,
  headers,
  renderRow,
  emptyMessage,
  searchPlaceholder = 'Search…',
  getSearchableText = defaultSearchableText,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const modalId = `api-modal-${apiSegment}`;

  const endpoint = useMemo(() => {
    const baseUrl = getApiBaseUrl();
    return `${baseUrl}/api/${apiSegment}/`;
  }, [apiSegment]);

  const loadData = useCallback(() => {
    console.log(`[${logLabel}] REST API endpoint:`, endpoint);
    setLoading(true);
    setError(null);
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        console.log(`[${logLabel}] fetched data:`, data);
        setItems(normalizeListData(data));
      })
      .catch((err) => {
        console.error(`[${logLabel}] fetch error:`, err);
        setError(err.message || `Failed to load ${apiSegment}`);
      })
      .finally(() => setLoading(false));
  }, [endpoint, logLabel, apiSegment]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter((row) => getSearchableText(row).toLowerCase().includes(q));
  }, [items, searchQuery, getSearchableText]);

  const searchFieldId = `search-${apiSegment}`;

  return (
    <div className="octo-data-page">
      <div className="card shadow-sm border-0 octo-data-card">
        <div className="card-header bg-white py-3 border-bottom">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <h1 className="h2 mb-0 fw-semibold text-body">{title}</h1>
          </div>
        </div>
        <div className="card-body p-3 p-md-4">
          <form
            className="row g-2 g-md-3 mb-4 align-items-end"
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label={`Filter ${title}`}
          >
            <div className="col-12 col-md">
              <label htmlFor={searchFieldId} className="form-label small text-muted mb-1">
                Search
              </label>
              <input
                id={searchFieldId}
                type="search"
                className="form-control"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="col-12 col-md-auto d-flex flex-wrap gap-2">
              <button type="button" className="btn btn-primary" onClick={loadData} disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Refreshing
                  </>
                ) : (
                  <>Refresh</>
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
              >
                API details
              </button>
            </div>
          </form>

          {loading && items.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center py-5 gap-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading…</span>
              </div>
              <p className="text-muted mb-0 small">Loading data from the REST API…</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger d-flex flex-column flex-sm-row align-items-sm-center gap-3 mb-0">
              <span>{error}</span>
              <button type="button" className="btn btn-danger ms-sm-auto" onClick={loadData}>
                Try again
              </button>
            </div>
          ) : filteredItems.length === 0 ? (
            <p className="text-muted mb-0">
              {items.length === 0 ? emptyMessage : 'No rows match your search.'}
            </p>
          ) : (
            <div className="table-responsive rounded-3 border octo-table-wrap">
              <table className={TABLE_CLASS}>
                <thead className="table-light">
                  <tr>
                    {headers.map((label) => (
                      <th key={label} scope="col">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>{filteredItems.map((row) => renderRow(row))}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        aria-labelledby={`${modalId}-label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5 mb-0" id={`${modalId}-label`}>
                REST API — {title}
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p className="small text-muted mb-2">Endpoint used by this page:</p>
              <p className="mb-3">
                <a className="link-primary link-break" href={endpoint} target="_blank" rel="noopener noreferrer">
                  {endpoint}
                </a>
              </p>
              <p className="small text-muted mb-0">
                Open the link in a new tab to inspect JSON from the Django REST Framework backend.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <a className="btn btn-primary" href={endpoint} target="_blank" rel="noopener noreferrer">
                Open in new tab
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
