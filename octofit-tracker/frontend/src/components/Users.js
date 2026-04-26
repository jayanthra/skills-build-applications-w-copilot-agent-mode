import DataListView from './DataListView';

export default function Users() {
  return (
    <DataListView
      title="Users"
      apiSegment="users"
      logLabel="Users"
      headers={['Username', 'Email', 'Team']}
      emptyMessage="No users returned from the API."
      searchPlaceholder="Search users…"
      renderRow={(row) => (
        <tr key={String(row.id ?? row._id ?? JSON.stringify(row))}>
          <td>{row.username}</td>
          <td>{row.email}</td>
          <td>{row.team != null ? String(row.team) : '—'}</td>
        </tr>
      )}
    />
  );
}
