import DataListView from './DataListView';

export default function Workouts() {
  return (
    <DataListView
      title="Workouts"
      apiSegment="workouts"
      logLabel="Workouts"
      headers={['Name', 'Description']}
      emptyMessage="No workouts returned from the API."
      searchPlaceholder="Search workouts…"
      renderRow={(row) => (
        <tr key={String(row.id ?? row._id ?? JSON.stringify(row))}>
          <td className="text-nowrap">{row.name}</td>
          <td className="octo-col-description">{row.description}</td>
        </tr>
      )}
    />
  );
}
