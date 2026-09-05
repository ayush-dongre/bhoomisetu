import SearchBar from '../common/SearchBar';
import Dropdown from '../common/Dropdown';
import { DOCUMENT_CATEGORIES } from '../../data/documents';

export default function DocumentFilters({ search, setSearch, category, setCategory, status, setStatus }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <SearchBar value={search} onChange={setSearch} placeholder="Search documents by name..." className="flex-1" />
      <Dropdown value={category} onChange={setCategory} options={['All', ...DOCUMENT_CATEGORIES]} label="Category" />
      <Dropdown value={status} onChange={setStatus} options={['All', 'Verified', 'Pending Review', 'Rejected']} label="Status" />
    </div>
  );
}
