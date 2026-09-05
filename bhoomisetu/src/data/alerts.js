import { PROJECTS } from './projects';

const ALERT_TYPES = [
  { type: 'Pending Approval', priority: 'High' },
  { type: 'Compensation Due', priority: 'High' },
  { type: 'Possession Deadline', priority: 'Medium' },
  { type: 'R&R Milestone', priority: 'Medium' },
  { type: 'Document Verification', priority: 'Low' },
];

function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

function generateAlerts(count = 55) {
  const rand = seededRandom(303);
  const alerts = [];
  for (let i = 1; i <= count; i++) {
    const project = PROJECTS[Math.floor(rand() * PROJECTS.length)];
    const at = ALERT_TYPES[Math.floor(rand() * ALERT_TYPES.length)];
    const daysAgo = Math.floor(rand() * 20);
    const created = new Date(Date.now() - daysAgo * 86400000);
    alerts.push({
      id: `ALT-${String(i).padStart(4, '0')}`,
      type: at.type,
      priority: at.priority,
      title: `${at.type}: ${project.name}`,
      message: `${at.type} required for project ${project.id} in ${project.district}, ${project.state}.`,
      projectId: project.id,
      read: rand() > 0.5,
      createdAt: created.toISOString().slice(0, 10),
      actionRequired: rand() > 0.3,
    });
  }
  return alerts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export const ALERTS = generateAlerts();

export const ESCALATIONS = PROJECTS.filter((p) => p.status === 'Delayed').slice(0, 12).map((p, idx) => ({
  id: `ESC-${String(idx + 1).padStart(3, '0')}`,
  projectId: p.id,
  level: p.delayDays > 60 ? 3 : p.delayDays > 30 ? 2 : 1,
  from: p.delayDays > 60 ? 'Central Ministry' : p.delayDays > 30 ? 'State Nodal Officer' : 'District Collector',
  to: p.delayDays > 60 ? 'Minister' : p.delayDays > 30 ? 'Central Ministry' : 'State Nodal Officer',
  reason: p.delayReason,
  daysOverdue: p.delayDays,
}));
