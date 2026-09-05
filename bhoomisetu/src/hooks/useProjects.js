import { useMemo, useState } from 'react';
import { PROJECTS } from '../data/projects';

export function useProjects() {
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  const filtered = useMemo(() => {
    let result = PROJECTS.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.district.toLowerCase().includes(search.toLowerCase());
      const matchesState = stateFilter === 'All' || p.state === stateFilter;
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesState && matchesStatus;
    });

    result = [...result].sort((a, b) => {
      let va = a[sortKey];
      let vb = b[sortKey];
      if (typeof va === 'string') {
        va = va.toLowerCase();
        vb = vb.toLowerCase();
      }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [search, stateFilter, statusFilter, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return {
    projects: filtered,
    total: PROJECTS.length,
    search, setSearch,
    stateFilter, setStateFilter,
    statusFilter, setStatusFilter,
    sortKey, sortDir, toggleSort,
  };
}
