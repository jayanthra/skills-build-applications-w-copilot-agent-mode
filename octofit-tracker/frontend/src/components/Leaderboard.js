import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeListData } from '../api';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = getApiBaseUrl();
    const endpoint = `${baseUrl}/api/leaderboard/`;
    console.log('[Leaderboard] REST API endpoint:', endpoint);

    setLoading(true);
    setError(null);
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        console.log('[Leaderboard] fetched data:', data);
        setItems(normalizeListData(data));
      })
      .catch((err) => {
        console.error('[Leaderboard] fetch error:', err);
        setError(err.message || 'Failed to load leaderboard');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-muted">Loading leaderboard…</p>;
  }
  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="mb-3">Leaderboard</h2>
      {items.length === 0 ? (
        <p className="text-muted">No leaderboard entries returned from the API.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Score</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={String(row.id ?? row._id ?? JSON.stringify(row))}>
                  <td>{row.score}</td>
                  <td>{row.user != null ? String(row.user) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
