import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NationalMap from '../pages/NationalMap';
import Projects from '../pages/Projects';
import ProjectDetails from '../pages/ProjectDetails';
import Parcels from '../pages/Parcels';
import Compensation from '../pages/Compensation';
import Documents from '../pages/Documents';
import Analytics from '../pages/Analytics';
import Alerts from '../pages/Alerts';
import Reports from '../pages/Reports';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Help from '../pages/Help';
import NotFound from '../pages/NotFound';
import MockupViewer from '../components/MockupViewer';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="map" element={<NationalMap />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="parcels" element={<Parcels />} />
        <Route path="compensation" element={<Compensation />} />
        <Route path="documents" element={<Documents />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="mockups/:name" element={<MockupViewer />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
