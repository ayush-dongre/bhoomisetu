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
import { DOCUMENT_CATEGORIES } from '../data/documents';
import { useApp } from '../context/AppContext';

export default function Documents() {
  const { documents, addDocument, projects } = useApp();
  const { search, setSearch, filters, setFilter, paginated, page, setPage, totalPages, total } =
    useFilters(documents, { searchKeys: ['id', 'name', 'category', 'projectId'], pageSize: 10 });
  const [viewing, setViewing] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [docForm, setDocForm] = useState({
    name: '',
    category: DOCUMENT_CATEGORIES[0],
    projectId: projects[0]?.id || '',
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    addDocument(docForm);
    setUploadOpen(false);
    setDocForm({ name: '', category: DOCUMENT_CATEGORIES[0], projectId: projects[0]?.id || '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Document Management</h1>
          <p className="text-sm text-gray-400">{documents.length} documents across land records, notifications & approvals</p>
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
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Document Title</label>
            <input
              required
              value={docForm.name}
              onChange={(e) => setDocForm({ ...docForm, name: e.target.value })}
              placeholder="e.g. Land Title Deed - Plot 42"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Category</label>
            <select
              value={docForm.category}
              onChange={(e) => setDocForm({ ...docForm, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {DOCUMENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Link to Project</label>
            <select
              value={docForm.projectId}
              onChange={(e) => setDocForm({ ...docForm, projectId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.id} · {p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">File</label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg py-8 text-center text-sm text-gray-400 hover:border-navy-300 cursor-pointer">
              Drag & drop file here, or click to browse (PDF, JPG, PNG)
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button type="submit">Upload Document</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

