import { useState } from 'react';
import Card from '../components/common/Card';
import Pagination from '../components/common/Pagination';
import ParcelFilters from '../components/parcels/ParcelFilters';
import ParcelTable from '../components/parcels/ParcelTable';
import ParcelDetails from '../components/parcels/ParcelDetails';
import Modal from '../components/common/Modal';
import { useFilters } from '../hooks/useFilters';
import { useApp } from '../context/AppContext';

export default function Parcels() {
  const { parcels } = useApp();
  const { search, setSearch, filters, setFilter, paginated, page, setPage, totalPages, total } =
    useFilters(parcels, { searchKeys: ['id', 'surveyNumber', 'ownerName', 'district', 'state'], pageSize: 12 });
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Land Parcels</h1>
        <p className="text-sm text-gray-400">{parcels.length} geo-tagged land parcels across all active projects</p>
      </div>

      <Card>
        <ParcelFilters
          search={search} setSearch={setSearch}
          landType={filters.landType || 'All'} setLandType={(v) => setFilter('landType', v)}
          status={filters.acquisitionStatus || 'All'} setStatus={(v) => setFilter('acquisitionStatus', v)}
        />
        <ParcelTable parcels={paginated} onSelect={setSelected} />
        <Pagination page={page} totalPages={totalPages} onChange={setPage} total={total} />
      </Card>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected ? `Parcel ${selected.id}` : ''} size="lg">
        <ParcelDetails parcel={selected} />
      </Modal>
    </div>
  );
}

