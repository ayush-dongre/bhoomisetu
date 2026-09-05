import { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Pagination from '../components/common/Pagination';
import ProjectFilters from '../components/projects/ProjectFilters';
import ProjectTable from '../components/projects/ProjectTable';
import ProjectCard from '../components/projects/ProjectCard';
import Modal from '../components/common/Modal';
import { useProjects } from '../hooks/useProjects';
import { useApp } from '../context/AppContext';
import { STATES } from '../data/states';
import { LayoutGrid, List } from 'lucide-react';

export default function Projects() {
  const {
    projects, total, search, setSearch, stateFilter, setStateFilter,
    statusFilter, setStatusFilter, sortKey, sortDir, toggleSort,
  } = useProjects();
  const { pushToast } = useApp();
  const [view, setView] = useState('table');
  const [showNew, setShowNew] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const paged = projects.slice((page - 1) * pageSize, page * pageSize);

  const [form, setForm] = useState({ name: '', department: '', state: STATES[0].name, district: STATES[0].districts[0], land: '', purpose: '', cost: '' });

  const submitProject = (e) => {
    e.preventDefault();
    setShowNew(false);
    pushToast(`Project "${form.name || 'Untitled'}" submitted for approval. Auto-generated ID assigned.`, 'success');
    setForm({ name: '', department: '', state: STATES[0].name, district: STATES[0].districts[0], land: '', purpose: '', cost: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Projects</h1>
          <p className="text-sm text-gray-400">{total} land acquisition projects across 10 states</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setView('table')} className={`p-2 ${view === 'table' ? 'bg-navy-50 text-navy-600' : 'text-gray-400'}`}><List size={16} /></button>
            <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-navy-50 text-navy-600' : 'text-gray-400'}`}><LayoutGrid size={16} /></button>
          </div>
          <Button icon={Plus} onClick={() => setShowNew(true)}>New Project</Button>
        </div>
      </div>

      <Card>
        <ProjectFilters
          search={search} setSearch={setSearch}
          stateFilter={stateFilter} setStateFilter={setStateFilter}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        />
        {view === 'table' ? (
          <ProjectTable projects={paged} sortKey={sortKey} sortDir={sortDir} toggleSort={toggleSort} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paged.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
        <Pagination page={page} totalPages={totalPages} onChange={setPage} total={projects.length} />
      </Card>

      <Modal open={showNew} onClose={() => setShowNew(false)} title="Submit New Project Proposal" size="lg">
        <form onSubmit={submitProject} className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">Project Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="e.g. NH-48 Expansion Phase 2" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Department</label>
            <input required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="e.g. NHAI" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Purpose</label>
            <input required value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="e.g. Highway Expansion" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">State</label>
            <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value, district: STATES.find(s => s.name === e.target.value).districts[0] })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
              {STATES.map((s) => <option key={s.code} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">District</label>
            <select value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
              {STATES.find((s) => s.name === form.state)?.districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Land Required (Ha)</label>
            <input required type="number" min="0" step="0.1" value={form.land} onChange={(e) => setForm({ ...form, land: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="e.g. 120.5" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Estimated Cost (₹ Cr)</label>
            <input required type="number" min="0" step="0.01" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="e.g. 85.2" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">Supporting Documents</label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg py-6 text-center text-sm text-gray-400 hover:border-navy-300 cursor-pointer">
              Drag & drop PDF / images here, or click to browse
            </div>
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
            <Button type="submit">Submit for Approval</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
