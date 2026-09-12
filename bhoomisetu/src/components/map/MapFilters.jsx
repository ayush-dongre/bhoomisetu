import Dropdown from '../common/Dropdown';
import SearchBar from '../common/SearchBar';

export default function MapFilters({ filters, onChange, states, districts, projects }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <SearchBar
        value={filters.search}
        onChange={(value) => onChange('search', value)}
        placeholder="Parcel ID or Survey No."
        className="sm:col-span-2 xl:col-span-1"
      />
      <Dropdown value={filters.state} onChange={(value) => onChange('state', value)} options={['All', ...states]} label="State" />
      <Dropdown value={filters.district} onChange={(value) => onChange('district', value)} options={['All', ...districts]} label="District" />
      <Dropdown value={filters.project} onChange={(value) => onChange('project', value)} options={['All', ...projects]} label="Project" />
      <Dropdown value={filters.status} onChange={(value) => onChange('status', value)} options={['All', 'Proposed', 'Under Scrutiny', 'Approved', 'Notice Issued', 'Awarded', 'Compensation', 'Possession']} label="Acquisition status" />
      <Dropdown value={filters.landType} onChange={(value) => onChange('landType', value)} options={['All', 'Agricultural', 'Residential', 'Commercial', 'Industrial', 'Government']} label="Land type" />
      <Dropdown value={filters.paymentStatus} onChange={(value) => onChange('paymentStatus', value)} options={['All', 'Pending', 'Partially Paid', 'Paid']} label="Compensation status" />
    </div>
  );
}
