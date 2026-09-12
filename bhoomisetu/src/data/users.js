export const ROLES = [
  'Central Ministry',
  'State Nodal Officer',
  'District Collector',
  'Implementing Agency',
  'Field Inspector',
  'Citizen',
];

export const ROLE_PERMISSIONS = {
  'Central Ministry': { view: true, create: true, edit: true, delete: true, approve: true },
  'State Nodal Officer': { view: true, create: true, edit: true, delete: false, approve: true },
  'District Collector': { view: true, create: true, edit: true, delete: false, approve: true },
  'Implementing Agency': { view: true, create: true, edit: true, delete: false, approve: false },
  'Field Inspector': { view: true, create: true, edit: false, delete: false, approve: false },
  'Citizen': { view: true, create: false, edit: false, delete: false, approve: false },
};

export const USERS = [
  { id: 'USR-001', name: 'shivam kuche', email: 'alexclothan@gmail.com', officerId: 'CM-2026-001', role: 'Central Ministry', state: 'All India', district: '-', department: 'Ministry of Rural Development' },
  { id: 'USR-002', name: 'Sunita Rao', email: 'sunita.rao@gov.in', officerId: 'SNO-MH-014', role: 'State Nodal Officer', state: 'Maharashtra', district: '-', department: 'State Revenue Department' },
  { id: 'USR-003', name: 'Anil Deshmukh', email: 'anil.deshmukh@gov.in', officerId: 'DC-PUN-007', role: 'District Collector', state: 'Maharashtra', district: 'Pune', department: 'District Administration' },
  { id: 'USR-004', name: 'Kiran Bhatt', email: 'kiran.bhatt@nhai.gov.in', officerId: 'IA-NHAI-032', role: 'Implementing Agency', state: 'Gujarat', district: 'Surat', department: 'NHAI' },
  { id: 'USR-005', name: 'Priya Nambiar', email: 'priya.nambiar@gov.in', officerId: 'FI-TN-019', role: 'Field Inspector', state: 'Tamil Nadu', district: 'Coimbatore', department: 'Survey & Settlement' },
  { id: 'USR-006', name: 'Public User', email: 'citizen@example.com', officerId: '-', role: 'Citizen', state: '-', district: '-', department: '-' },
];

export function findUserByEmail(email) {
  return USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
}
