import { Check, FileText, MapPin } from 'lucide-react';
import Badge from '../common/Badge';
import { ACQUISITION_STAGES } from '../../data/parcels';
import { formatLakh } from '../../utils/formatCurrency';

export default function ParcelDetailsPanel({ parcel, onClose }) {
  if (!parcel) return <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">Select a parcel on the map to inspect its acquisition record.</div>;
  const currentStage = ACQUISITION_STAGES.indexOf(parcel.acquisitionStatus === 'Under Scrutiny' ? 'Scrutiny' : parcel.acquisitionStatus);
  const remaining = Math.max(0, parcel.compensationAmount - parcel.amountPaid);
  const rows = [['Parcel ID', parcel.id], ['Survey / Gat No.', parcel.surveyNumber], ['Location', `${parcel.village}, ${parcel.district}`], ['Area', `${parcel.area} Ha`], ['Land owner', parcel.ownerName], ['Project', parcel.projectName]];
  return (
    <section className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div><p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Parcel details</p><h2 className="mt-1 text-lg font-bold text-gray-800">{parcel.id}</h2></div>
        <button type="button" onClick={onClose} className="text-xs font-medium text-navy-700 hover:underline">Clear selection</button>
      </div>
      <div className="flex flex-wrap gap-2"><Badge status={parcel.acquisitionStatus} /><Badge status={parcel.paymentStatus} label={`Payment: ${parcel.paymentStatus}`} /></div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        {rows.map(([label, value]) => <div key={label}><p className="text-xs text-gray-400">{label}</p><p className="mt-0.5 font-medium text-gray-700">{value}</p></div>)}
      </div>
      <div className="rounded-lg bg-gray-50 p-3"><p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Acquisition progress</p><ol className="grid grid-cols-2 gap-2 text-xs">
        {ACQUISITION_STAGES.map((stage, index) => <li key={stage} className={`flex items-center gap-1.5 ${index <= currentStage ? 'font-medium text-navy-800' : 'text-gray-400'}`}><span className={`flex h-4 w-4 items-center justify-center rounded-full ${index <= currentStage ? 'bg-navy-700 text-white' : 'bg-gray-200'}`}>{index <= currentStage ? <Check size={10} /> : index + 1}</span>{stage}</li>)}
      </ol></div>
      <div className="rounded-lg border border-gray-100 p-3"><p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Financial information</p><div className="grid grid-cols-3 gap-2 text-xs"><div><p className="text-gray-400">Estimated</p><p className="mt-1 font-semibold text-gray-800">{formatLakh(parcel.compensationAmount)}</p></div><div><p className="text-gray-400">Paid</p><p className="mt-1 font-semibold text-emerald-700">{formatLakh(parcel.amountPaid)}</p></div><div><p className="text-gray-400">Remaining</p><p className="mt-1 font-semibold text-amber-700">{formatLakh(remaining)}</p></div></div></div>
      <div className="flex items-center gap-2 text-xs text-gray-500"><MapPin size={14} /> Geo-tagged demo record <span className="ml-auto flex items-center gap-1"><FileText size={13} /> {parcel.documentStatus}</span></div>
    </section>
  );
}
