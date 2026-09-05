import { PROJECTS } from './projects';

const CATEGORIES = ['Land Records', 'Notifications', 'Valuation Reports', 'Compensation Documents', 'Approval Documents', 'Legal Documents'];
const DOC_NAMES = {
  'Land Records': ['Khasra Extract', 'Mutation Record', 'Land Title Deed'],
  'Notifications': ['Section 11 Notification', 'Section 19 Declaration', 'Public Notice'],
  'Valuation Reports': ['Circle Rate Valuation', 'Market Value Assessment', 'SIA Report'],
  'Compensation Documents': ['Award Statement', 'Payment Voucher', 'Bank Transfer Confirmation'],
  'Approval Documents': ['District Collector Approval', 'State Nodal Approval', 'Ministry Sanction Order'],
  'Legal Documents': ['Court Order', 'Legal Notice', 'Affidavit'],
};
const UPLOADERS = ['A. Sharma (District Collector)', 'R. Verma (State Nodal Officer)', 'S. Iyer (Field Inspector)', 'P. Nair (Document Officer)', 'M. Gupta (Implementing Agency)'];
const STATUSES = ['Verified', 'Pending Review', 'Rejected'];

function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

function generateDocuments(count = 110) {
  const rand = seededRandom(202);
  const docs = [];
  for (let i = 1; i <= count; i++) {
    const project = PROJECTS[Math.floor(rand() * PROJECTS.length)];
    const category = CATEGORIES[Math.floor(rand() * CATEGORIES.length)];
    const nameOptions = DOC_NAMES[category];
    const name = nameOptions[Math.floor(rand() * nameOptions.length)];
    const version = `v${1 + Math.floor(rand() * 2)}.${Math.floor(rand() * 3)}`;
    const year = 2024 + Math.floor(rand() * 2);
    docs.push({
      id: `DOC-${String(i).padStart(4, '0')}`,
      projectId: project.id,
      name: `${name} - ${project.district}`,
      category,
      uploadedBy: UPLOADERS[Math.floor(rand() * UPLOADERS.length)],
      uploadDate: `${year}-${String(1 + Math.floor(rand() * 12)).padStart(2, '0')}-${String(1 + Math.floor(rand() * 27)).padStart(2, '0')}`,
      version,
      status: STATUSES[Math.floor(rand() * STATUSES.length)],
      fileSizeKb: Math.round(150 + rand() * 4800),
      fileType: rand() > 0.4 ? 'PDF' : 'Image (JPG)',
    });
  }
  return docs;
}

export const DOCUMENTS = generateDocuments();
export const DOCUMENT_CATEGORIES = CATEGORIES;
