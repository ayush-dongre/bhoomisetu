import { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Dropdown from '../components/common/Dropdown';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { language, setLanguage, LANGUAGES, highContrast, setHighContrast, pushToast } = useApp();
  const [notifs, setNotifs] = useState({ approvals: true, compensation: true, deadlines: true, rr: false, documents: true });

  const toggle = (key) => setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-400">Manage language, accessibility, and notification preferences</p>
      </div>

      <Card title="Language">
        <Dropdown
          value={LANGUAGES.find((l) => l.code === language)?.label}
          onChange={(label) => setLanguage(LANGUAGES.find((l) => l.label === label)?.code)}
          options={LANGUAGES.map((l) => l.label)}
        />
      </Card>

      <Card title="Accessibility">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-700">High-contrast mode</span>
          <input type="checkbox" checked={highContrast} onChange={() => setHighContrast((v) => !v)} className="w-4 h-4 accent-navy-600" />
        </label>
        <p className="text-xs text-gray-400 mt-2">Keyboard navigation, screen-reader labels, and skip-to-content links are enabled throughout BHOOMISETU by default.</p>
      </Card>

      <Card title="Notification Preferences">
        <div className="space-y-3">
          {[
            ['approvals', 'Pending Approvals'],
            ['compensation', 'Compensation Due'],
            ['deadlines', 'Possession Deadlines'],
            ['rr', 'R&R Milestones'],
            ['documents', 'Document Verification'],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700">{label}</span>
              <input type="checkbox" checked={notifs[key]} onChange={() => toggle(key)} className="w-4 h-4 accent-navy-600" />
            </label>
          ))}
        </div>
      </Card>

      <Button onClick={() => pushToast('Settings saved.', 'success')}>Save Settings</Button>
    </div>
  );
}
