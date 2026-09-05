import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title = 'No data found', message = 'Try adjusting your filters or search.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
        <Icon size={24} className="text-gray-400" />
      </div>
      <p className="font-medium text-gray-700">{title}</p>
      <p className="text-sm text-gray-400 mt-1">{message}</p>
    </div>
  );
}
