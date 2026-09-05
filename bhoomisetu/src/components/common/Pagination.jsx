import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, onChange, total }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-1 py-3 text-sm text-gray-500">
      <span>Page {page} of {totalPages}{total !== undefined ? ` · ${total} results` : ''}</span>
      <div className="flex gap-1">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
