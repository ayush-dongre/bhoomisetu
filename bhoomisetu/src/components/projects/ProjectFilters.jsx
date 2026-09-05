import SearchBar from '../common/SearchBar';
import Dropdown from '../common/Dropdown';
import { STATES } from '../../data/states';

export default function ProjectFilters({ search, setSearch, stateFilter, setStateFilter, statusFilter, setStatusFilter }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <SearchBar value={search} onChange={setSearch} placeholder="Search by project name, ID, or district..." className="flex-1" />
      <Dropdown value={stateFilter} onChange={setStateFilter} options={['All', ...STATES.map((s) => s.name)]} label="Filter by state" />
      <Dropdown value={statusFilter} onChange={setStatusFilter} options={['All', 'On Track', 'At Risk', 'Delayed', 'Completed']} label="Filter by status" />
    </div>
  );
}
