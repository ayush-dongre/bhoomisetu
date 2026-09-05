import { FileText } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatDate';

export default function DocumentViewer({ document }) {
  if (!document) return null;
  return (
    <div className="space-y-4">
      <div className="aspect-[4/3] bg-gray-50 border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-300">
        <FileText size={48} />
        <p className="text-xs mt-2">Preview simulated for demo (OCR text extraction available)</p>
      </div>
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
        <div><p className="text-xs text-gray-400">Category</p><p className="font-medium text-gray-800">{document.category}</p></div>
        <div><p className="text-xs text-gray-400">Version</p><p className="font-medium text-gray-800">{document.version}</p></div>
        <div><p className="text-xs text-gray-400">Uploaded By</p><p className="font-medium text-gray-800">{document.uploadedBy}</p></div>
        <div><p className="text-xs text-gray-400">Upload Date</p><p className="font-medium text-gray-800">{formatDate(document.uploadDate)}</p></div>
        <div><p className="text-xs text-gray-400">File Size</p><p className="font-medium text-gray-800">{document.fileSizeKb} KB</p></div>
        <div><p className="text-xs text-gray-400">Linked Project</p><p className="font-medium text-navy-600">{document.projectId}</p></div>
      </div>
      <Badge status={document.status} />
    </div>
  );
}
