import Dropdown from '../common/Dropdown';

export default function MapFilters({ layer, setLayer, statusFilter, setStatusFilter }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Dropdown value={layer} onChange={setLayer} options={['Projects', 'Parcels', 'Compensation', 'Delays']} label="Map layer" />
      <Dropdown value={statusFilter} onChange={setStatusFilter} options={['All', 'On Track', 'At Risk', 'Delayed', 'Completed']} label="Status" />
    </div>
  );
}
