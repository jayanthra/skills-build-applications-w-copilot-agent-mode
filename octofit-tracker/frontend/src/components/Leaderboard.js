import DataListView from './DataListView';

export default function Leaderboard() {
  return (
    <DataListView
      title="Leaderboard"
      apiSegment="leaderboard"
      logLabel="Leaderboard"
      headers={['Score', 'User']}
      emptyMessage="No leaderboard entries returned from the API."
      searchPlaceholder="Search leaderboard…"
      renderRow={(row) => (
        <tr key={String(row.id ?? row._id ?? JSON.stringify(row))}>
          <td>{row.score}</td>
          <td>{row.user != null ? String(row.user) : '—'}</td>
        </tr>
      )}
    />
  );
}
