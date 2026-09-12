// DEMO DATA ONLY. This shape mirrors a future GeoJSON/PostGIS API response.
export const ACQUISITION_STATUSES = [
  'Proposed', 'Under Scrutiny', 'Approved', 'Notice Issued',
  'Awarded', 'Compensation', 'Possession',
];

export const ACQUISITION_STAGES = [
  'Proposal', 'Scrutiny', 'Approval', 'Notice', 'Award', 'Compensation', 'Possession',
];

export const PARCEL_STATUS_COLORS = {
  Proposed: '#64748b',
  'Under Scrutiny': '#d97706',
  Approved: '#0284c7',
  'Notice Issued': '#ea580c',
  Awarded: '#7c3aed',
  Compensation: '#db2777',
  Possession: '#059669',
};

function square(lng, lat, offset = 0.0022) {
  return [[
    [lng - offset, lat - offset], [lng + offset, lat - offset],
    [lng + offset, lat + offset], [lng - offset, lat + offset], [lng - offset, lat - offset],
  ]];
}

const parcel = (details) => ({
  ownerType: 'Individual',
  khasraNumber: details.surveyNumber,
  khatauniNumber: `KH-${details.id.slice(-3)}`,
  documentStatus: 'Verified',
  geojson: { type: 'Feature', geometry: { type: 'Polygon', coordinates: square(details.lng, details.lat, details.offset) } },
  ...details,
});

export const PARCELS = [
  parcel({ id: 'PCL-001', surveyNumber: '245/1A', village: 'Wagholi', district: 'Pune', state: 'Maharashtra', lat: 18.579, lng: 73.978, offset: 0.0020, area: 1.84, ownerName: 'Ramesh Patil', landType: 'Agricultural', acquisitionStatus: 'Proposed', projectId: 'PRJ-MH-2026-001', projectName: 'Pune Ring Road - Eastern Corridor', compensationAmount: 82.8, amountPaid: 0, paymentStatus: 'Pending' }),
  parcel({ id: 'PCL-002', surveyNumber: '245/2', village: 'Wagholi', district: 'Pune', state: 'Maharashtra', lat: 18.579, lng: 73.983, offset: 0.0018, area: 1.25, ownerName: 'Sunita Jadhav', landType: 'Agricultural', acquisitionStatus: 'Under Scrutiny', projectId: 'PRJ-MH-2026-001', projectName: 'Pune Ring Road - Eastern Corridor', compensationAmount: 56.25, amountPaid: 0, paymentStatus: 'Pending' }),
  parcel({ id: 'PCL-003', surveyNumber: '247/3B', village: 'Kesnand', district: 'Pune', state: 'Maharashtra', lat: 18.572, lng: 73.991, offset: 0.0023, area: 2.14, ownerName: 'Mahadev Koli', landType: 'Agricultural', acquisitionStatus: 'Approved', projectId: 'PRJ-MH-2026-001', projectName: 'Pune Ring Road - Eastern Corridor', compensationAmount: 107, amountPaid: 0, paymentStatus: 'Pending' }),
  parcel({ id: 'PCL-004', surveyNumber: '118/4', village: 'Lohegaon', district: 'Pune', state: 'Maharashtra', lat: 18.596, lng: 73.914, offset: 0.0017, area: 0.92, ownerName: 'Asha Kulkarni', landType: 'Residential', acquisitionStatus: 'Notice Issued', projectId: 'PRJ-MH-2025-014', projectName: 'Pune Airport Access Road', compensationAmount: 96.6, amountPaid: 0, paymentStatus: 'Pending' }),
  parcel({ id: 'PCL-005', surveyNumber: '118/7A', village: 'Lohegaon', district: 'Pune', state: 'Maharashtra', lat: 18.592, lng: 73.920, offset: 0.0016, area: 0.74, ownerName: 'Vijay Shinde', landType: 'Commercial', acquisitionStatus: 'Awarded', projectId: 'PRJ-MH-2025-014', projectName: 'Pune Airport Access Road', compensationAmount: 111, amountPaid: 0, paymentStatus: 'Pending' }),
  parcel({ id: 'PCL-006', surveyNumber: '78/2C', village: 'Chakan', district: 'Pune', state: 'Maharashtra', lat: 18.755, lng: 73.861, offset: 0.0025, area: 3.12, ownerName: 'Bharat Pawar', landType: 'Industrial', acquisitionStatus: 'Compensation', projectId: 'PRJ-MH-2025-022', projectName: 'Chakan Industrial Connector', compensationAmount: 140.4, amountPaid: 70.2, paymentStatus: 'Partially Paid' }),
  parcel({ id: 'PCL-007', surveyNumber: '79/1', village: 'Chakan', district: 'Pune', state: 'Maharashtra', lat: 18.760, lng: 73.867, offset: 0.0021, area: 1.68, ownerName: 'Nirmala More', landType: 'Agricultural', acquisitionStatus: 'Possession', projectId: 'PRJ-MH-2025-022', projectName: 'Chakan Industrial Connector', compensationAmount: 75.6, amountPaid: 75.6, paymentStatus: 'Paid' }),
  parcel({ id: 'PCL-008', surveyNumber: '320/6', village: 'Ranjangaon', district: 'Pune', state: 'Maharashtra', lat: 18.796, lng: 74.114, offset: 0.0028, area: 4.05, ownerName: 'Kisan Bhosale', landType: 'Agricultural', acquisitionStatus: 'Under Scrutiny', projectId: 'PRJ-MH-2026-031', projectName: 'Ranjangaon Logistics Park Link', compensationAmount: 162, amountPaid: 0, paymentStatus: 'Pending' }),
  parcel({ id: 'PCL-009', surveyNumber: '51/3', village: 'Talegaon', district: 'Pune', state: 'Maharashtra', lat: 18.731, lng: 73.672, offset: 0.0019, area: 1.38, ownerName: 'Ganesh Deshmukh', landType: 'Government', ownerType: 'Government', acquisitionStatus: 'Approved', projectId: 'PRJ-MH-2026-044', projectName: 'Pimpri-Chinchwad Metro Depot', compensationAmount: 41.4, amountPaid: 0, paymentStatus: 'Pending' }),
  parcel({ id: 'PCL-010', surveyNumber: '11/2A', village: 'Hinjawadi', district: 'Pune', state: 'Maharashtra', lat: 18.591, lng: 73.738, offset: 0.0017, area: 0.88, ownerName: 'Suresh Gaikwad', landType: 'Residential', acquisitionStatus: 'Notice Issued', projectId: 'PRJ-MH-2026-044', projectName: 'Pimpri-Chinchwad Metro Depot', compensationAmount: 105.6, amountPaid: 0, paymentStatus: 'Pending' }),
  parcel({ id: 'PCL-011', surveyNumber: '89/5', village: 'Khed', district: 'Pune', state: 'Maharashtra', lat: 18.845, lng: 73.889, offset: 0.0022, area: 2.36, ownerName: 'Lata Chavan', landType: 'Agricultural', acquisitionStatus: 'Awarded', projectId: 'PRJ-MH-2025-022', projectName: 'Chakan Industrial Connector', compensationAmount: 94.4, amountPaid: 0, paymentStatus: 'Pending' }),
  parcel({ id: 'PCL-012', surveyNumber: '90/1B', village: 'Khed', district: 'Pune', state: 'Maharashtra', lat: 18.850, lng: 73.895, offset: 0.0020, area: 1.57, ownerName: 'Sanjay Dhumal', landType: 'Agricultural', acquisitionStatus: 'Compensation', projectId: 'PRJ-MH-2025-022', projectName: 'Chakan Industrial Connector', compensationAmount: 62.8, amountPaid: 62.8, paymentStatus: 'Paid' }),
];

export function getParcelsByProject(projectId) {
  return PARCELS.filter((parcel) => parcel.projectId === projectId);
}
