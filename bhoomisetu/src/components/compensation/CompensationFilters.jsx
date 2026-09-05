import SearchBar from '../common/SearchBar';
import Dropdown from '../common/Dropdown';

export default function CompensationFilters({ search, setSearch, status, setStatus }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <SearchBar value={search} onChange={setSearch} placeholder="Search by owner, parcel ID..." className="flex-1" />
      <Dropdown value={status} onChange={setStatus} options={['All', 'Pending', 'Partially Paid', 'Paid']} label="Payment status" />
    </div>
  );
}
