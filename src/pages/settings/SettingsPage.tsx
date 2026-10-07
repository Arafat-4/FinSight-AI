import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import {
  Settings,
  User,
  Shield,
  Bell,
  CheckCircle2,
  Lock,
  Globe,
  Sliders
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentUser } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [email] = useState(currentUser?.email || '');
  const [department, setDepartment] = useState(currentUser?.department || '');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [fraudPushAlerts, setFraudPushAlerts] = useState(true);
  const [currencySymbol, setCurrencySymbol] = useState('INR (₹)');
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedFeedback('Settings and profile preferences updated successfully.');
    setTimeout(() => setSavedFeedback(null), 3000);
  };

  return (
    <AppShell pageTitle="Settings">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Platform Settings & Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your user profile, alert preferences, and review your assigned role permissions.
          </p>
        </div>

        {savedFeedback && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{savedFeedback}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* User Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-emerald-800" />
              <h3 className="text-sm font-bold text-slate-900">User Profile</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Department / Organization</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Display Currency</label>
                <select
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="INR (₹)">Indian Rupee — INR (₹)</option>
                  <option value="USD ($)">US Dollar — USD ($)</option>
                  <option value="EUR (€)">Euro — EUR (€)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Assigned Role & Access Foundation */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Shield className="w-4 h-4 text-emerald-800" />
              <h3 className="text-sm font-bold text-slate-900">Role & Security Governance</h3>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Assigned Enterprise Role</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                  {currentUser?.role?.replace('_', ' ') || 'Unassigned'}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  System User ID: {currentUser?.id} • Status: {currentUser?.status}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Role Governed by System Administrator
                </span>
              </div>
            </div>
          </div>

          {/* Notifications Foundation */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Bell className="w-4 h-4 text-emerald-800" />
              <h3 className="text-sm font-bold text-slate-900">Notification Preferences</h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
                <div>
                  <span className="font-bold text-slate-800 block">High-Priority Fraud Alerts</span>
                  <span className="text-slate-500 text-[11px]">Receive instantaneous notifications when a transaction triggers risk score &gt; 80</span>
                </div>
                <input
                  type="checkbox"
                  checked={fraudPushAlerts}
                  onChange={(e) => setFraudPushAlerts(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
                <div>
                  <span className="font-bold text-slate-800 block">Weekly Digest & Analytics Reports</span>
                  <span className="text-slate-500 text-[11px]">Receive summary reports on customer segmentation and transaction volume</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="primary" size="md" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
};
