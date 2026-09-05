import { useMemo, useState } from 'react';

// Generic list filter/search/paginate hook.
// filterFns: object of { key: (item, value) => boolean }
export function useFilters(items, { searchKeys = [], pageSize = 10 } = {}) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !search ||
        searchKeys.some((key) =>
          String(item[key] ?? '').toLowerCase().includes(search.toLowerCase())
        );
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value || value === 'All') return true;
        return item[key] === value;
      });
      return matchesSearch && matchesFilters;
    });
  }, [items, search, filters, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  return {
    search, setSearch: (v) => { setSearch(v); setPage(1); },
    filters, setFilter,
    filtered, paginated,
    page, setPage, totalPages,
    total: filtered.length,
  };
}
