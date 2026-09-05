import { ShieldCheck, Lock } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, permissions } = useAuth();
  if (!user) return null;

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
        <p className="text-sm text-gray-400">Officer account details and access permissions</p>
      </div>

      <Card>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-navy-100 text-navy-700 flex items-center justify-center text-xl font-bold">
            {user.name[0]}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
            <div className="mt-1"><Badge status="On Track" label={user.role} /></div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
          <div><p className="text-xs text-gray-400">Officer ID</p><p className="font-medium text-gray-700">{user.officerId}</p></div>
          <div><p className="text-xs text-gray-400">Department</p><p className="font-medium text-gray-700">{user.department}</p></div>
          <div><p className="text-xs text-gray-400">State</p><p className="font-medium text-gray-700">{user.state}</p></div>
          <div><p className="text-xs text-gray-400">District</p><p className="font-medium text-gray-700">{user.district}</p></div>
        </div>
      </Card>

      <Card title="Permissions">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Object.entries(permissions).map(([perm, allowed]) => (
            <div key={perm} className={`p-3 rounded-lg text-center text-xs font-medium ${allowed ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>
              <ShieldCheck size={16} className="mx-auto mb-1" />
              {perm.charAt(0).toUpperCase() + perm.slice(1)}
              <p className="mt-1">{allowed ? 'Allowed' : 'Restricted'}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Security">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Lock size={15} /> Two-factor authentication is enabled for this account. Session auto-expires after 30 minutes of inactivity.
        </div>
      </Card>
    </div>
  );
}
