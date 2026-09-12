import { useMemo, useState } from 'react';
import { Layers3, SearchX } from 'lucide-react';
import Card from '../components/common/Card';
import MapFilters from '../components/map/MapFilters';
import MapLegend from '../components/map/MapLegend';
import ParcelMap from '../components/map/ParcelMap';
import ParcelDetailsPanel from '../components/map/ParcelDetailsPanel';
import { useApp } from '../context/AppContext';

const INITIAL_FILTERS = { search: '', state: 'All', district: 'All', project: 'All', status: 'All', landType: 'All', paymentStatus: 'All' };

export default function NationalMap() {
  const { parcels } = useApp();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selected, setSelected] = useState(null);
  const onFilterChange = (key, value) => setFilters((current) => ({ ...current, [key]: value, ...(key === 'state' ? { district: 'All' } : {}) }));

  const states = useMemo(() => [...new Set(parcels.map((parcel) => parcel.state))], [parcels]);
  const districts = useMemo(() => [...new Set(parcels.filter((parcel) => filters.state === 'All' || parcel.state === filters.state).map((parcel) => parcel.district))], [parcels, filters.state]);
  const projects = useMemo(() => [...new Set(parcels.map((parcel) => parcel.projectName))], [parcels]);
  const displayedParcels = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    return parcels.filter((parcel) => (
      (!term || [parcel.id, parcel.surveyNumber, parcel.ownerName, parcel.village].some((value) => value.toLowerCase().includes(term))) &&
      (filters.state === 'All' || parcel.state === filters.state) &&
      (filters.district === 'All' || parcel.district === filters.district) &&
      (filters.project === 'All' || parcel.projectName === filters.project) &&
      (filters.status === 'All' || parcel.acquisitionStatus === filters.status) &&
      (filters.landType === 'All' || parcel.landType === filters.landType) &&
      (filters.paymentStatus === 'All' || parcel.paymentStatus === filters.paymentStatus)
    ));
  }, [filters, parcels]);

  const selectedIsVisible = selected && displayedParcels.some((parcel) => parcel.id === selected.id);
  const activeParcel = selectedIsVisible ? selected : (filters.search.trim() ? displayedParcels[0] : null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-600">GIS land intelligence</p>
          <h1 className="mt-1 text-xl font-bold text-gray-800">Land Parcel Map</h1>
          <p className="text-sm text-gray-400">Demo GeoJSON parcels for acquisition monitoring. Not for legal or survey use.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50 px-3 py-2 text-xs font-medium text-navy-800"><Layers3 size={15} /> {displayedParcels.length} of {parcels.length} parcels displayed</div>
      </div>

      <Card className="p-4" noPadding>
        <div className="border-b border-gray-100 p-4"><MapFilters filters={filters} onChange={onFilterChange} states={states} districts={districts} projects={projects} /></div>
        <div className="border-b border-gray-100 px-4 py-3"><MapLegend /></div>
        <div className="grid xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 p-3 sm:p-4">
            {displayedParcels.length ? <ParcelMap parcels={displayedParcels} selectedParcel={activeParcel} onSelect={setSelected} /> : <div className="flex h-[440px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-center text-sm text-gray-500"><SearchX size={28} className="mb-3 text-gray-400" />No parcels match the selected filters.<button type="button" className="mt-2 font-medium text-navy-700 hover:underline" onClick={() => setFilters(INITIAL_FILTERS)}>Clear all filters</button></div>}
          </div>
          <aside className="border-t border-gray-100 p-4 xl:border-l xl:border-t-0"><ParcelDetailsPanel parcel={activeParcel} onClose={() => setSelected(null)} /></aside>
        </div>
      </Card>
    </div>
  );
}
