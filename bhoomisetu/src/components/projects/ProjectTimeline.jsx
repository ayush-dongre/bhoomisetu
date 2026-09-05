import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { PROJECT_STAGES } from '../../data/projects';

export default function ProjectTimeline({ stageIndex }) {
  return (
    <div className="space-y-0">
      {PROJECT_STAGES.map((stage, i) => {
        const done = i < stageIndex;
        const current = i === stageIndex;
        return (
          <div key={stage} className="flex gap-3">
            <div className="flex flex-col items-center">
              {done ? <CheckCircle2 size={20} className="text-green-500" /> : current ? <Clock size={20} className="text-saffron-600" /> : <Circle size={20} className="text-gray-300" />}
              {i < PROJECT_STAGES.length - 1 && <div className={`w-0.5 flex-1 min-h-[24px] ${done ? 'bg-green-300' : 'bg-gray-200'}`} />}
            </div>
            <div className="pb-6">
              <p className={`text-sm font-medium ${current ? 'text-saffron-700' : done ? 'text-gray-700' : 'text-gray-400'}`}>{stage}</p>
              {current && <p className="text-xs text-gray-400 mt-0.5">Currently in progress</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
