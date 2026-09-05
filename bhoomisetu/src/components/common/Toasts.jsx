import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const ICONS = { success: CheckCircle2, warning: AlertTriangle, info: Info, error: AlertTriangle };
const COLORS = {
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  info: 'bg-navy-50 text-navy-700 border-navy-100',
  error: 'bg-red-50 text-red-700 border-red-200',
};

export default function Toasts() {
  const { toasts, dismissToast } = useApp();
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => {
        const Icon = ICONS[t.type] || Info;
        return (
          <div key={t.id} className={`flex items-start gap-2 px-4 py-3 rounded-lg border shadow-md text-sm animate-fade-in ${COLORS[t.type] || COLORS.info}`}>
            <Icon size={16} className="mt-0.5 shrink-0" />
            <span className="flex-1">{t.message}</span>
            <button onClick={() => dismissToast(t.id)}><X size={14} /></button>
          </div>
        );
      })}
    </div>
  );
}
