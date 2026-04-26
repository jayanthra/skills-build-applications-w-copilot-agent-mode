import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeListData } from '../api';

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = getApiBaseUrl();
    const endpoint = `${baseUrl}/api/users/`;
    console.log('[Users] REST API endpoint:', endpoint);

    setLoading(true);
    setError(null);
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        console.log('[Users] fetched data:', data);
        setItems(normalizeListData(data));
      })
      .catch((err) => {
        console.error('[Users] fetch error:', err);
        setError(err.message || 'Failed to load users');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-muted">Loading users…</p>;
  }
  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="mb-3">Users</h2>
      {items.length === 0 ? (
        <p className="text-muted">No users returned from the API.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={String(row.id ?? row._id ?? JSON.stringify(row))}>
                  <td>{row.username}</td>
                  <td>{row.email}</td>
                  <td>{row.team != null ? String(row.team) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
