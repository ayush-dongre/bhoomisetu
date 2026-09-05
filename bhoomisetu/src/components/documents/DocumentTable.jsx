import { FileText, Image, Download, Eye } from 'lucide-react';
import EmptyState from '../common/EmptyState';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatDate';

export default function DocumentTable({ documents, onView }) {
  if (documents.length === 0) return <EmptyState title="No documents found" />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-100">
            <th className="py-2.5 pr-4 font-medium">Document</th>
            <th className="py-2.5 pr-4 font-medium">Category</th>
            <th className="py-2.5 pr-4 font-medium">Version</th>
            <th className="py-2.5 pr-4 font-medium">Uploaded By</th>
            <th className="py-2.5 pr-4 font-medium">Date</th>
            <th className="py-2.5 pr-4 font-medium">Status</th>
            <th className="py-2.5 pr-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((d) => {
            const Icon = d.fileType === 'PDF' ? FileText : Image;
            return (
              <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50/70">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2 max-w-[260px]">
                    <Icon size={15} className="text-gray-400 shrink-0" />
                    <span className="text-gray-800 truncate">{d.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{d.category}</td>
                <td className="py-3 pr-4 text-gray-500 font-mono text-xs">{d.version}</td>
                <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{d.uploadedBy}</td>
                <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{formatDate(d.uploadDate)}</td>
                <td className="py-3 pr-4"><Badge status={d.status} /></td>
                <td className="py-3 pr-4">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => onView(d)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><Eye size={15} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><Download size={15} /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
