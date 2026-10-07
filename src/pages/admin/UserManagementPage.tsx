import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { User, Role, UserStatus } from '../../types';
import {
  Users,
  Search,
  Shield,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Filter,
  RefreshCw,
  Mail,
  Calendar,
  Lock
} from 'lucide-react';

export const UserManagementPage: React.FC = () => {
  const { currentUser, refreshCurrentUser } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [targetRole, setTargetRole] = useState<Role>('BUSINESS_ANALYST');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadUsers = () => {
    setUsers(dataService.getUsers());
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpenAssignModal = (user: User) => {
    setSelectedUser(user);
    setTargetRole(user.role === 'UNASSIGNED' ? 'BUSINESS_ANALYST' : user.role);
    setFeedback(null);
  };

  const handleAssignRole = () => {
    if (!selectedUser) return;

    const res = dataService.updateUserRole(selectedUser.id, targetRole);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      loadUsers();
      refreshCurrentUser();
      setTimeout(() => {
        setSelectedUser(null);
      }, 900);
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const handleToggleStatus = (user: User) => {
    if (user.role === 'ADMIN') return;
    const nextStatus: UserStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    dataService.updateUserStatus(user.id, nextStatus);
    loadUsers();
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case 'ADMIN':
        return <Badge variant="rose">Admin (System)</Badge>;
      case 'BUSINESS_ANALYST':
        return <Badge variant="emerald">Business Analyst</Badge>;
      case 'CUSTOMER':
        return <Badge variant="blue">Customer</Badge>;
      case 'RISK_FRAUD_ANALYST':
        return <Badge variant="amber">Risk Analyst</Badge>;
      case 'UNASSIGNED':
      default:
        return <Badge variant="slate">Unassigned</Badge>;
    }
  };

  return (
    <AppShell pageTitle="User & Role Management">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                User & Role Governance
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                Admin Exclusive
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Assign roles, control authorization boundaries, and maintain single-admin enterprise compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={loadUsers}
            >
              Refresh Directory
            </Button>
          </div>
        </div>

        {/* Admin Policy Notice */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex items-start gap-3 text-xs text-amber-900">
          <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold block">Enterprise Single-Admin Constraint (Active)</span>
            Only exactly <strong>ONE Administrator</strong> exists ({currentUser?.email}). Normal accounts cannot be granted Admin privileges. As Administrator, you may assign or reassign accounts between <strong>Business Analyst</strong>, <strong>Retail Customer</strong>, and <strong>Risk & Fraud Analyst</strong>.
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search user name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="ALL">All Roles ({users.length})</option>
              <option value="UNASSIGNED">Unassigned Only</option>
              <option value="BUSINESS_ANALYST">Business Analyst</option>
              <option value="CUSTOMER">Retail Customer</option>
              <option value="RISK_FRAUD_ANALYST">Risk & Fraud Analyst</option>
              <option value="ADMIN">System Admin</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F5] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200/80">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">User ID</th>
                  <th className="py-3 px-4">Current Role</th>
                  <th className="py-3 px-4">Department / Cohort</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* User Identity */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#064E3B] text-[#F3E5AB] font-bold text-xs flex items-center justify-center shrink-0">
                          {u.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{u.name}</div>
                          <div className="text-[11px] text-slate-400">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono text-slate-600">{u.id}</td>

                    {/* Role */}
                    <td className="py-3.5 px-4">{getRoleBadge(u.role)}</td>

                    {/* Department */}
                    <td className="py-3.5 px-4 text-slate-600">{u.department || 'General'}</td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {u.status === 'ACTIVE' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          Active
                        </span>
                      ) : u.status === 'PENDING' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          Pending Role
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                          Suspended
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      {u.role === 'ADMIN' ? (
                        <span className="text-[11px] text-slate-400 italic">Protected Super-Admin</span>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleOpenAssignModal(u)}
                          >
                            Assign / Change Role
                          </Button>
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(u)}
                            className={`p-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                              u.status === 'ACTIVE'
                                ? 'border-rose-200 text-rose-700 hover:bg-rose-50'
                                : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                            }`}
                            title={u.status === 'ACTIVE' ? 'Suspend access' : 'Activate access'}
                          >
                            {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">No users match the search criteria.</p>
            </div>
          )}
        </div>

        {/* Role Assignment Modal */}
        <Modal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          title={`Assign Role — ${selectedUser?.name}`}
          subtitle={`User ID: ${selectedUser?.id} • ${selectedUser?.email}`}
          maxWidth="md"
        >
          {selectedUser && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                Current Role: <strong>{selectedUser.role.replace('_', ' ')}</strong>
              </div>

              {feedback && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select New Role Assignment:
                </label>
                <div className="space-y-2">
                  {[
                    {
                      role: 'BUSINESS_ANALYST' as Role,
                      title: 'Business Analyst',
                      desc: 'Customer segmentation, transaction trends, spending patterns, and analytics.'
                    },
                    {
                      role: 'CUSTOMER' as Role,
                      title: 'Retail Customer',
                      desc: 'Personal account summary, private transactions, and personal recommendations.'
                    },
                    {
                      role: 'RISK_FRAUD_ANALYST' as Role,
                      title: 'Risk & Fraud Analyst',
                      desc: 'Fraud monitoring, risk anomaly alerts, case management, and investigation.'
                    }
                  ].map((option) => (
                    <label
                      key={option.role}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        targetRole === option.role
                          ? 'border-emerald-600 bg-emerald-50/50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="assignRole"
                        value={option.role}
                        checked={targetRole === option.role}
                        onChange={() => setTargetRole(option.role)}
                        className="mt-0.5 text-emerald-700 focus:ring-emerald-500"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{option.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() => setSelectedUser(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleAssignRole}>
                  Confirm Role Assignment
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AppShell>
  );
};
