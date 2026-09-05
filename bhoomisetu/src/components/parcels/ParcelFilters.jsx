import SearchBar from '../common/SearchBar';
import Dropdown from '../common/Dropdown';

export default function ParcelFilters({ search, setSearch, landType, setLandType, status, setStatus }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <SearchBar value={search} onChange={setSearch} placeholder="Search by parcel ID, survey number, or owner..." className="flex-1" />
      <Dropdown value={landType} onChange={setLandType} options={['All', 'Agricultural', 'Residential', 'Commercial', 'Government']} label="Land type" />
      <Dropdown value={status} onChange={setStatus} options={['All', 'Not Started', 'Survey Done', 'Notified', 'Award Declared', 'Compensation Paid', 'Possession Taken']} label="Acquisition status" />
    </div>
  );
}
