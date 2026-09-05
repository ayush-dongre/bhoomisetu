import { PROJECTS } from './projects';
import { STATE_COORDS } from './states';

const OWNER_NAMES = ['Ramesh Patil', 'Sunita Devi', 'Manoj Kumar', 'Lakshmi Reddy', 'Arjun Singh', 'Kavita Sharma', 'Suresh Yadav', 'Anita Joshi', 'Vikram Rao', 'Meena Kumari', 'State Government Land Bank', 'Gram Panchayat'];
const LAND_TYPES = ['Agricultural', 'Residential', 'Commercial', 'Government'];
const PAYMENT_STATUS = ['Pending', 'Partially Paid', 'Paid'];
const ACQ_STATUS = ['Not Started', 'Survey Done', 'Notified', 'Award Declared', 'Compensation Paid', 'Possession Taken'];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateParcels(count = 210) {
  const rand = seededRandom(101);
  const parcels = [];
  for (let i = 1; i <= count; i++) {
    const project = PROJECTS[Math.floor(rand() * PROJECTS.length)];
    const [baseLat, baseLng] = STATE_COORDS[project.stateCode] || [22, 78];
    const area = Math.round((0.2 + rand() * 8) * 100) / 100;
    const ratePerHa = Math.round(15 + rand() * 85); // lakh per ha
    const compensation = Math.round(area * ratePerHa * 100) / 100;
    parcels.push({
      id: `PCL-${String(i).padStart(4, '0')}`,
      projectId: project.id,
      surveyNumber: `SN-${100 + Math.floor(rand() * 900)}/${1 + Math.floor(rand() * 9)}`,
      khasraNumber: `KH-${1000 + Math.floor(rand() * 9000)}`,
      khatauniNumber: `KT-${100 + Math.floor(rand() * 900)}`,
      area,
      landType: LAND_TYPES[Math.floor(rand() * LAND_TYPES.length)],
      ownerName: OWNER_NAMES[Math.floor(rand() * OWNER_NAMES.length)],
      ownerType: rand() > 0.15 ? 'Individual' : 'Government',
      lat: baseLat + (rand() - 0.5) * 1.5,
      lng: baseLng + (rand() - 0.5) * 1.5,
      compensationAmount: compensation, // lakh
      paymentStatus: PAYMENT_STATUS[Math.floor(rand() * PAYMENT_STATUS.length)],
      acquisitionStatus: ACQ_STATUS[Math.floor(rand() * ACQ_STATUS.length)],
      state: project.state,
      district: project.district,
    });
  }
  return parcels;
}

export const PARCELS = generateParcels();

export function getParcelsByProject(projectId) {
  return PARCELS.filter((p) => p.projectId === projectId);
}
