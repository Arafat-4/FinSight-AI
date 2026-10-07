import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Bell,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Shield,
  Briefcase,
  UserCheck,
  Menu,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import { Role } from '../../types';

interface TopNavProps {
  onToggleSidebar?: () => void;
  title?: string;
}

export const TopNav: React.FC<TopNavProps> = ({ onToggleSidebar, title }) => {
  const { currentUser, logout, switchDemoUser } = useAuth();
  const { searchQuery, setSearchQuery, navigateTo } = useRouter();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('Oct 1, 2024 - Oct 31, 2024');

  const getRoleDisplayName = (role?: Role) => {
    switch (role) {
      case 'ADMIN':
        return 'System Administrator';
      case 'BUSINESS_ANALYST':
        return 'Business Analyst';
      case 'CUSTOMER':
        return 'Retail Customer';
      case 'RISK_FRAUD_ANALYST':
        return 'Risk & Fraud Analyst';
      case 'UNASSIGNED':
        return 'Pending Assignment';
      default:
        return 'User';
    }
  };

  const getRoleIcon = (role?: Role) => {
    switch (role) {
      case 'ADMIN':
        return <Shield className="w-3.5 h-3.5 text-rose-600" />;
      case 'BUSINESS_ANALYST':
        return <Briefcase className="w-3.5 h-3.5 text-emerald-600" />;
      case 'CUSTOMER':
        return <UserIcon className="w-3.5 h-3.5 text-blue-600" />;
      case 'RISK_FRAUD_ANALYST':
        return <Shield className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <UserCheck className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const handleRoleSwitch = (role: Role) => {
    switchDemoUser(role);
    setShowProfileMenu(false);
    // Redirect cleanly to their respective dashboard
    if (role === 'ADMIN') navigateTo('/app/admin');
    else if (role === 'BUSINESS_ANALYST') navigateTo('/app/analyst');
    else if (role === 'CUSTOMER') navigateTo('/app/customer');
    else if (role === 'RISK_FRAUD_ANALYST') navigateTo('/app/risk');
    else navigateTo('/app');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FBF9F5] border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Sidebar Trigger & Global Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Box matching Reference Image 3 */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search customers, transactions, insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-xs sm:text-sm pl-10 pr-4 py-2 rounded-xl border border-slate-200/90 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 placeholder-slate-400 shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* Right: Date Range, Notifications & User Profile */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Date Range Selector matching Reference Image 3 */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{selectedDateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showDatePicker && (
              <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-fade-in text-xs">
                <div className="font-semibold px-2 py-1.5 text-slate-400 uppercase tracking-wider text-[10px]">
                  Select Time Range
                </div>
                {[
                  'Today (Oct 25, 2024)',
                  'Last 7 Days (Oct 18 - Oct 25)',
                  'Oct 1, 2024 - Oct 31, 2024',
                  'Last Quarter (Q3 2024)',
                  'Year to Date (FY 2024-25)'
                ].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedDateRange(range);
                      setShowDatePicker(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedDateRange === range
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{range}</span>
                    {selectedDateRange === range && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell matching Reference Image 3 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-1.5 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-fade-in text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2 px-1">
                  <span className="font-bold text-slate-900">Notifications (3 New)</span>
                  <span className="text-[11px] text-emerald-700 font-semibold cursor-pointer">Mark all read</span>
                </div>
                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                  <div className="p-2 rounded-xl bg-rose-50/60 border border-rose-100">
                    <p className="font-semibold text-rose-900 text-xs">Critical Risk Alert: TXN-90413</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">High-value out-of-country transfer flagged in Dubai terminal.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">15 mins ago</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
                    <p className="font-semibold text-emerald-900 text-xs">New AI Recommendation Available</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">Liquid wealth auto-sweep suggested for customer CUST-8452.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="font-semibold text-slate-900 text-xs">Daily Transaction Reconciliation</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">30,000 transactions processed with 99.98% pipeline integrity.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">4 hours ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Area matching Reference Image 3 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 bg-white p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
            >
              {/* Initials Avatar */}
              <div className="w-8 h-8 rounded-full bg-[#064E3B] text-[#F3E5AB] font-bold text-xs flex items-center justify-center shrink-0">
                {currentUser?.name
                  ? currentUser.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                  : 'T'}
              </div>

              {/* Name & Role Text */}
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser?.name || 'T. Gopi Chand'}
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                  {currentUser?.role ? getRoleDisplayName(currentUser.role) : 'Analyst'}
                </span>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-fade-in text-xs">
                <div className="px-2 py-2 border-b border-slate-100">
                  <div className="font-bold text-sm text-slate-900">{currentUser?.name}</div>
                  <div className="text-slate-500 text-[11px]">{currentUser?.email}</div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    {getRoleIcon(currentUser?.role)}
                    <span className="font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                      {getRoleDisplayName(currentUser?.role)}
                    </span>
                  </div>
                </div>

                {/* Quick Role Perspective Switcher for Reviewing all 4 Roles */}
                <div className="my-2 py-2 border-b border-slate-100">
                  <div className="px-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Switch Persona (Phase 0 Review)
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleRoleSwitch('ADMIN')}
                      className={`px-2 py-1.5 rounded-lg text-left flex items-center justify-between cursor-pointer ${
                        currentUser?.role === 'ADMIN'
                          ? 'bg-rose-50 text-rose-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>Admin (System & Roles)</span>
                      {currentUser?.role === 'ADMIN' && <Check className="w-3.5 h-3.5 text-rose-700" />}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('BUSINESS_ANALYST')}
                      className={`px-2 py-1.5 rounded-lg text-left flex items-center justify-between cursor-pointer ${
                        currentUser?.role === 'BUSINESS_ANALYST'
                          ? 'bg-emerald-50 text-emerald-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>Business Analyst (T. Gopi Chand)</span>
                      {currentUser?.role === 'BUSINESS_ANALYST' && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('CUSTOMER')}
                      className={`px-2 py-1.5 rounded-lg text-left flex items-center justify-between cursor-pointer ${
                        currentUser?.role === 'CUSTOMER'
                          ? 'bg-blue-50 text-blue-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>Retail Customer (Rahul Sharma)</span>
                      {currentUser?.role === 'CUSTOMER' && <Check className="w-3.5 h-3.5 text-blue-700" />}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('RISK_FRAUD_ANALYST')}
                      className={`px-2 py-1.5 rounded-lg text-left flex items-center justify-between cursor-pointer ${
                        currentUser?.role === 'RISK_FRAUD_ANALYST'
                          ? 'bg-amber-50 text-amber-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>Risk & Fraud Analyst (Karan Mehta)</span>
                      {currentUser?.role === 'RISK_FRAUD_ANALYST' && <Check className="w-3.5 h-3.5 text-amber-700" />}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('UNASSIGNED')}
                      className={`px-2 py-1.5 rounded-lg text-left flex items-center justify-between cursor-pointer ${
                        currentUser?.role === 'UNASSIGNED'
                          ? 'bg-slate-200 text-slate-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>Unassigned User (Pending Review)</span>
                      {currentUser?.role === 'UNASSIGNED' && <Check className="w-3.5 h-3.5 text-slate-700" />}
                    </button>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigateTo('/app/settings');
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    Platform Settings
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                      navigateTo('/login');
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
