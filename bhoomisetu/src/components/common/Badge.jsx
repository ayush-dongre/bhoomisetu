import { getStatusStyle } from '../../utils/statusHelper';

export default function Badge({ status, label }) {
  const style = getStatusStyle(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {label || status}
    </span>
  );
}
