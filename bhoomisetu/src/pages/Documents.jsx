import { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Pagination from '../components/common/Pagination';
import DocumentFilters from '../components/documents/DocumentFilters';
import DocumentTable from '../components/documents/DocumentTable';
import DocumentViewer from '../components/documents/DocumentViewer';
import Modal from '../components/common/Modal';
import { useFilters } from '../hooks/useFilters';
import { DOCUMENTS } from '../data/documents';
import { useApp } from '../context/AppContext';

export default function Documents() {
  const { search, setSearch, filters, setFilter, paginated, page, setPage, totalPages, total } =
    useFilters(DOCUMENTS, { searchKeys: ['id', 'name'], pageSize: 10 });
  const [viewing, setViewing] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const { pushToast } = useApp();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Document Management</h1>
          <p className="text-sm text-gray-400">{DOCUMENTS.length} documents across land records, notifications & approvals</p>
        </div>
        <Button icon={UploadCloud} onClick={() => setUploadOpen(true)}>Upload Document</Button>
      </div>

      <Card>
        <DocumentFilters
          search={search} setSearch={setSearch}
          category={filters.category || 'All'} setCategory={(v) => setFilter('category', v)}
          status={filters.status || 'All'} setStatus={(v) => setFilter('status', v)}
        />
        <DocumentTable documents={paginated} onView={setViewing} />
        <Pagination page={page} totalPages={totalPages} onChange={setPage} total={total} />
      </Card>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title={viewing?.name} size="lg">
        <DocumentViewer document={viewing} />
      </Modal>

      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload Document">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-200 rounded-lg py-10 text-center text-sm text-gray-400 hover:border-navy-300 cursor-pointer">
            Drag & drop files here, or click to browse (PDF, JPG, PNG)
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button onClick={() => { setUploadOpen(false); pushToast('Document uploaded and queued for verification.', 'success'); }}>Upload</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
