import Badge from '../common/Badge';

export default function AlertDetails({ alert }) {
  if (!alert) return null;
  return (
    <div className="space-y-3 text-sm">
      <div className="flex gap-2"><Badge status={alert.priority} /><Badge status={alert.type} label={alert.type} /></div>
      <p className="text-gray-700">{alert.message}</p>
      <div className="grid grid-cols-2 gap-y-2">
        <div><p className="text-xs text-gray-400">Project</p><p className="font-medium text-navy-600">{alert.projectId}</p></div>
        <div><p className="text-xs text-gray-400">Created</p><p className="font-medium text-gray-700">{alert.createdAt}</p></div>
        <div><p className="text-xs text-gray-400">Action Required</p><p className="font-medium text-gray-700">{alert.actionRequired ? 'Yes' : 'No'}</p></div>
        <div><p className="text-xs text-gray-400">Read</p><p className="font-medium text-gray-700">{alert.read ? 'Yes' : 'No'}</p></div>
      </div>
    </div>
  );
}
