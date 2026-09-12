import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { ALERTS as INITIAL_ALERTS } from '../data/alerts';
import { PROJECTS as INITIAL_PROJECTS } from '../data/projects';
import { DOCUMENTS as INITIAL_DOCUMENTS } from '../data/documents';
import { PARCELS as INITIAL_PARCELS } from '../data/parcels';
import { COMPENSATION_RECORDS as INITIAL_COMPENSATION } from '../data/compensation';
import { STATES } from '../data/states';

const AppContext = createContext(null);

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'mr', label: 'मराठी' },
];

function loadStored(key, initial) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  } catch {
    return initial;
  }
}

function loadGeoParcels() {
  const saved = loadStored('bhoomisetu_parcels', INITIAL_PARCELS);
  return Array.isArray(saved) && saved.every((parcel) => parcel.geojson?.geometry?.type === 'Polygon')
    ? saved
    : INITIAL_PARCELS;
}

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [highContrast, setHighContrast] = useState(false);
  const [alerts, setAlerts] = useState(() => loadStored('bhoomisetu_alerts', INITIAL_ALERTS));
  const [toasts, setToasts] = useState([]);
  const [online, setOnline] = useState(true);

  // Persistent CRUD Data State
  const [projects, setProjects] = useState(() => loadStored('bhoomisetu_projects', INITIAL_PROJECTS));
  const [documents, setDocuments] = useState(() => loadStored('bhoomisetu_docs', INITIAL_DOCUMENTS));
  const [parcels] = useState(loadGeoParcels);
  const [compensation, setCompensation] = useState(() => loadStored('bhoomisetu_compensation', INITIAL_COMPENSATION));

  useEffect(() => { localStorage.setItem('bhoomisetu_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('bhoomisetu_docs', JSON.stringify(documents)); }, [documents]);
  useEffect(() => { localStorage.setItem('bhoomisetu_parcels', JSON.stringify(parcels)); }, [parcels]);
  useEffect(() => { localStorage.setItem('bhoomisetu_compensation', JSON.stringify(compensation)); }, [compensation]);
  useEffect(() => { localStorage.setItem('bhoomisetu_alerts', JSON.stringify(alerts)); }, [alerts]);

  const unreadCount = useMemo(() => alerts.filter((a) => !a.read).length, [alerts]);

  const markAlertRead = useCallback((id) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  }, []);

  const markAllRead = useCallback(() => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  }, []);

  const pushToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // CRUD Operations
  const addProject = useCallback((formData) => {
    const stateObj = STATES.find((s) => s.name === formData.state) || STATES[0];
    const year = new Date().getFullYear();
    const newId = `PRJ-${stateObj.code}-${year}-${String(projects.length + 1).padStart(3, '0')}`;
    const landReq = parseFloat(formData.land) || 50;
    const cost = parseFloat(formData.cost) || 10;
    const comp = Math.round(cost * 0.4 * 100) / 100;
    const affected = Math.round(landReq * 4);

    const newProject = {
      id: newId,
      name: formData.name || `Project ${newId}`,
      department: formData.department || 'State Revenue Dept',
      state: formData.state,
      stateCode: stateObj.code,
      district: formData.district,
      landRequired: landReq,
      landAcquired: 0,
      purpose: formData.purpose || 'Infrastructure',
      estimatedCost: cost,
      compensationAmount: comp,
      affectedFamilies: affected,
      displacedFamilies: Math.round(affected * 0.4),
      progress: 0,
      status: 'On Track',
      stage: 'Land Proposed',
      stageIndex: 0,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
      delayDays: 0,
      delayReason: null,
      riskScore: 2,
      lat: null,
      lng: null,
    };

    setProjects((prev) => [newProject, ...prev]);

    const newAlert = {
      id: `ALT-${String(alerts.length + 1).padStart(4, '0')}`,
      type: 'Pending Approval',
      priority: 'High',
      title: `New Project Submitted: ${newProject.name}`,
      message: `Project ${newProject.id} submitted for clearance in ${newProject.district}, ${newProject.state}.`,
      projectId: newProject.id,
      read: false,
      createdAt: new Date().toISOString().slice(0, 10),
      actionRequired: true,
    };
    setAlerts((prev) => [newAlert, ...prev]);

    pushToast(`Project "${newProject.name}" submitted successfully. Assigned ID: ${newProject.id}`, 'success');
    return newProject;
  }, [projects.length, alerts.length, pushToast]);

  const addDocument = useCallback((docData) => {
    const newDoc = {
      id: `DOC-${String(documents.length + 1).padStart(4, '0')}`,
      projectId: docData.projectId || projects[0]?.id || 'PRJ-MH-2026-001',
      name: docData.name || 'Untitled Document',
      category: docData.category || 'Land Records',
      uploadedBy: docData.uploadedBy || 'Field Officer',
      uploadDate: new Date().toISOString().slice(0, 10),
      version: 'v1.0',
      status: 'Pending Review',
      fileSizeKb: docData.fileSizeKb || Math.round(250 + Math.random() * 1200),
      fileType: docData.fileType || 'PDF',
    };
    setDocuments((prev) => [newDoc, ...prev]);
    pushToast(`Document "${newDoc.name}" uploaded successfully and queued for review.`, 'success');
    return newDoc;
  }, [documents.length, projects, pushToast]);

  const updateDocumentStatus = useCallback((id, status) => {
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    pushToast(`Document status updated to ${status}.`, 'info');
  }, [pushToast]);

  const updateProjectStatus = useCallback((id, status) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    pushToast(`Project ${id} status updated to ${status}.`, 'info');
  }, [pushToast]);

  const updateCompensationStatus = useCallback((id, status) => {
    setCompensation((prev) => prev.map((c) => (c.id === id ? { ...c, paymentStatus: status, amountPaid: status === 'Paid' ? c.amountAssessed : status === 'Partially Paid' ? Math.round(c.amountAssessed * 0.5) : 0 } : c)));
    pushToast(`Compensation record ${id} status updated to ${status}.`, 'info');
  }, [pushToast]);

  return (
    <AppContext.Provider
      value={{
        language, setLanguage, LANGUAGES,
        highContrast, setHighContrast,
        alerts, unreadCount, markAlertRead, markAllRead,
        toasts, pushToast, dismissToast,
        online, setOnline,
        projects, addProject, updateProjectStatus,
        documents, addDocument, updateDocumentStatus,
        parcels,
        compensation, updateCompensationStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
