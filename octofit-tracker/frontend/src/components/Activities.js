import DataListView from './DataListView';

export default function Activities() {
  return (
    <DataListView
      title="Activities"
      apiSegment="activities"
      logLabel="Activities"
      headers={['Type', 'Duration (min)', 'User']}
      emptyMessage="No activities returned from the API."
      searchPlaceholder="Search activities…"
      renderRow={(row) => (
        <tr key={String(row.id ?? row._id ?? JSON.stringify(row))}>
          <td>{row.type}</td>
          <td>{row.duration}</td>
          <td>{row.user != null ? String(row.user) : '—'}</td>
        </tr>
      )}
    />
  );
}
