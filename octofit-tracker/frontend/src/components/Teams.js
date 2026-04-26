import DataListView from './DataListView';

export default function Teams() {
  return (
    <DataListView
      title="Teams"
      apiSegment="teams"
      logLabel="Teams"
      headers={['Name']}
      emptyMessage="No teams returned from the API."
      searchPlaceholder="Search teams…"
      renderRow={(row) => (
        <tr key={String(row.id ?? row._id ?? JSON.stringify(row))}>
          <td>{row.name}</td>
        </tr>
      )}
    />
  );
}
