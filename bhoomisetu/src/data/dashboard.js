import { PROJECTS } from './projects';
import { STATES } from './states';
import { COMPENSATION_RECORDS, affectedFamiliesTotal } from './compensation';

export function getNationalOverview() {
  const totalProjects = PROJECTS.length;
  const completed = PROJECTS.filter((p) => p.status === 'Completed').length;
  const onTrack = PROJECTS.filter((p) => p.status === 'On Track').length;
  const atRisk = PROJECTS.filter((p) => p.status === 'At Risk').length;
  const delayed = PROJECTS.filter((p) => p.status === 'Delayed').length;
  const totalLandRequired = PROJECTS.reduce((s, p) => s + p.landRequired, 0);
  const totalLandAcquired = PROJECTS.reduce((s, p) => s + p.landAcquired, 0);
  const totalCompensation = COMPENSATION_RECORDS.reduce((s, r) => s + r.amountAssessed, 0);
  const totalPaid = COMPENSATION_RECORDS.reduce((s, r) => s + r.amountPaid, 0);
  return {
    totalProjects, completed, onTrack, atRisk, delayed,
    totalLandRequired: Math.round(totalLandRequired),
    totalLandAcquired: Math.round(totalLandAcquired),
    totalCompensation: Math.round(totalCompensation),
    totalPaid: Math.round(totalPaid),
    affectedFamilies: affectedFamiliesTotal,
  };
}

export function getStateProgress() {
  return STATES.map((s) => {
    const stateProjects = PROJECTS.filter((p) => p.stateCode === s.code);
    const avgProgress = stateProjects.length
      ? Math.round(stateProjects.reduce((sum, p) => sum + p.progress, 0) / stateProjects.length)
      : 0;
    return { state: s.name, code: s.code, projects: stateProjects.length, avgProgress };
  }).sort((a, b) => b.avgProgress - a.avgProgress);
}

export function getStatusDistribution() {
  const overview = getNationalOverview();
  return [
    { name: 'On Track', value: overview.onTrack, color: '#22c55e' },
    { name: 'At Risk', value: overview.atRisk, color: '#eab308' },
    { name: 'Delayed', value: overview.delayed, color: '#ef4444' },
    { name: 'Completed', value: overview.completed, color: '#1e40d9' },
  ];
}

export function getMonthlyTrend() {
  // Simulated 12-month cumulative acquisition progress trend
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let base = 20;
  return months.map((m, i) => {
    base += 4 + (i % 3) * 2;
    return { month: m, progress: Math.min(100, base), lastYear: Math.min(100, base - 8) };
  });
}
