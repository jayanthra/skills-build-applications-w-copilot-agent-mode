import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeListData } from '../api';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = getApiBaseUrl();
    const endpoint = `${baseUrl}/api/workouts/`;
    console.log('[Workouts] REST API endpoint:', endpoint);

    setLoading(true);
    setError(null);
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        console.log('[Workouts] fetched data:', data);
        setItems(normalizeListData(data));
      })
      .catch((err) => {
        console.error('[Workouts] fetch error:', err);
        setError(err.message || 'Failed to load workouts');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-muted">Loading workouts…</p>;
  }
  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="mb-3">Workouts</h2>
      {items.length === 0 ? (
        <p className="text-muted">No workouts returned from the API.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={String(row.id ?? row._id ?? JSON.stringify(row))}>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
