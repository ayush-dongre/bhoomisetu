import SearchBar from '../common/SearchBar';
import Dropdown from '../common/Dropdown';

export default function AlertFilters({ search, setSearch, priority, setPriority, type, setType }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <SearchBar value={search} onChange={setSearch} placeholder="Search alerts..." className="flex-1" />
      <Dropdown value={priority} onChange={setPriority} options={['All', 'High', 'Medium', 'Low']} label="Priority" />
      <Dropdown value={type} onChange={setType} options={['All', 'Pending Approval', 'Compensation Due', 'Possession Deadline', 'R&R Milestone', 'Document Verification']} label="Type" />
    </div>
  );
}
