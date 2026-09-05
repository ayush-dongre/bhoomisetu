import { STATES } from './states';

const DEPARTMENTS = ['National Highways Authority', 'Indian Railways', 'Power Grid Corporation', 'Irrigation Department', 'Urban Development Authority', 'Ministry of Defence', 'Airports Authority of India'];
const PURPOSES = ['Highway Expansion', 'Railway Line Doubling', 'Power Transmission Line', 'Irrigation Canal', 'Smart City Infrastructure', 'Defence Cantonment', 'Airport Expansion', 'Industrial Corridor', 'Metro Rail Corridor', 'Solar Power Park'];
const STAGES = [
  'Land Proposed', 'Preliminary Notification (Sec 11)', 'Final Declaration (Sec 19)',
  'Awards Declared', 'Compensation Assessed', 'Compensation Dispersed', 'Possession Taken', 'R&R Completed',
];
const STATUSES = ['On Track', 'At Risk', 'Delayed', 'Completed'];
const DELAY_REASONS = ['Land Acquisition Delay', 'Compensation Dispute', 'Court Case', 'Environmental Clearance', 'Forest Clearance', 'Utility Shifting'];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateProjects(count = 55) {
  const rand = seededRandom(42);
  const projects = [];
  for (let i = 1; i <= count; i++) {
    const state = STATES[Math.floor(rand() * STATES.length)];
    const district = state.districts[Math.floor(rand() * state.districts.length)];
    const dept = DEPARTMENTS[Math.floor(rand() * DEPARTMENTS.length)];
    const purpose = PURPOSES[Math.floor(rand() * PURPOSES.length)];
    const status = STATUSES[Math.floor(rand() * STATUSES.length)];
    const stageIndex = Math.min(7, Math.floor(rand() * 8));
    const landRequired = Math.round((20 + rand() * 480) * 10) / 10;
    const landAcquired = status === 'Completed' ? landRequired : Math.round(landRequired * (0.2 + rand() * 0.75) * 10) / 10;
    const progress = Math.min(100, Math.round((landAcquired / landRequired) * 100));
    const estimatedCost = Math.round((5 + rand() * 495) * 100) / 100; // crore
    const compensationAmount = Math.round(estimatedCost * (0.3 + rand() * 0.4) * 100) / 100;
    const affectedFamilies = Math.round(50 + rand() * 2000);
    const startYear = 2023 + Math.floor(rand() * 2);
    const startDate = new Date(startYear, Math.floor(rand() * 12), 1 + Math.floor(rand() * 28));
    const durationDays = 365 + Math.floor(rand() * 730);
    const endDate = new Date(startDate.getTime() + durationDays * 86400000);
    const delayDays = status === 'Delayed' ? Math.floor(20 + rand() * 120) : status === 'At Risk' ? Math.floor(5 + rand() * 20) : 0;

    projects.push({
      id: `PRJ-${state.code}-${startYear}-${String(i).padStart(3, '0')}`,
      name: `${purpose} - ${district}`,
      department: dept,
      state: state.name,
      stateCode: state.code,
      district,
      landRequired,
      landAcquired,
      purpose,
      estimatedCost,
      compensationAmount,
      affectedFamilies,
      displacedFamilies: Math.round(affectedFamilies * (0.3 + rand() * 0.4)),
      progress,
      status,
      stage: STAGES[stageIndex],
      stageIndex,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      delayDays,
      delayReason: delayDays > 0 ? DELAY_REASONS[Math.floor(rand() * DELAY_REASONS.length)] : null,
      riskScore: status === 'Delayed' ? Math.round(7 + rand() * 3) : status === 'At Risk' ? Math.round(4 + rand() * 3) : Math.round(1 + rand() * 3),
      lat: null,
      lng: null,
    });
  }
  return projects;
}

export const PROJECTS = generateProjects();

export const PROJECT_STAGES = STAGES;
export const DELAY_REASONS_LIST = DELAY_REASONS;

export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id);
}
