import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  FileSpreadsheet,
  ShieldAlert,
  Sparkles,
  Bot,
  FileText,
  Settings,
  X,
  ArrowUpRight
} from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useAuth } from '../../context/AuthContext';
import { useRouter, AppRoute } from '../../context/RouterContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const { currentUser } = useAuth();
  const { currentRoute, navigateTo } = useRouter();

  // Role-specific navigation items according to specifications
  const getNavItems = () => {
    const role = currentUser?.role || 'BUSINESS_ANALYST';

    switch (role) {
      case 'ADMIN':
        return [
          { label: 'Dashboard', icon: LayoutDashboard, route: '/app/admin' as AppRoute },
          { label: 'Users', icon: Users, route: '/app/users' as AppRoute },
          { label: 'Customers', icon: UserCheck, route: '/app/customers' as AppRoute },
          { label: 'Transactions', icon: CreditCard, route: '/app/transactions' as AppRoute },
          { label: 'Cases', icon: FileSpreadsheet, route: '/app/cases' as AppRoute },
          { label: 'Risk & Fraud', icon: ShieldAlert, route: '/app/risk' as AppRoute },
          { label: 'Recommendations', icon: Sparkles, route: '/app/recommendations' as AppRoute },
          { label: 'AI Assistant', icon: Bot, route: '/app/assistant' as AppRoute },
          { label: 'Documents', icon: FileText, route: '/app/documents' as AppRoute },
          { label: 'Settings', icon: Settings, route: '/app/settings' as AppRoute }
        ];

      case 'BUSINESS_ANALYST':
        return [
          { label: 'Dashboard', icon: LayoutDashboard, route: '/app/analyst' as AppRoute },
          { label: 'Customers', icon: UserCheck, route: '/app/customers' as AppRoute },
          { label: 'Transactions', icon: CreditCard, route: '/app/transactions' as AppRoute },
          { label: 'Cases', icon: FileSpreadsheet, route: '/app/cases' as AppRoute },
          { label: 'Recommendations', icon: Sparkles, route: '/app/recommendations' as AppRoute },
          { label: 'AI Assistant', icon: Bot, route: '/app/assistant' as AppRoute },
          { label: 'Documents', icon: FileText, route: '/app/documents' as AppRoute },
          { label: 'Settings', icon: Settings, route: '/app/settings' as AppRoute }
        ];

      case 'CUSTOMER':
        return [
          { label: 'Dashboard', icon: LayoutDashboard, route: '/app/customer' as AppRoute },
          { label: 'My Transactions', icon: CreditCard, route: '/app/transactions' as AppRoute },
          { label: 'My Cases', icon: FileSpreadsheet, route: '/app/cases' as AppRoute },
          { label: 'My Recommendations', icon: Sparkles, route: '/app/recommendations' as AppRoute },
          { label: 'AI Assistant', icon: Bot, route: '/app/assistant' as AppRoute },
          { label: 'Settings', icon: Settings, route: '/app/settings' as AppRoute }
        ];

      case 'RISK_FRAUD_ANALYST':
        return [
          { label: 'Dashboard', icon: LayoutDashboard, route: '/app/risk' as AppRoute },
          { label: 'Customers', icon: UserCheck, route: '/app/customers' as AppRoute },
          { label: 'Transactions', icon: CreditCard, route: '/app/transactions' as AppRoute },
          { label: 'Cases', icon: FileSpreadsheet, route: '/app/cases' as AppRoute },
          { label: 'Risk & Fraud', icon: ShieldAlert, route: '/app/risk' as AppRoute },
          { label: 'Documents', icon: FileText, route: '/app/documents' as AppRoute },
          { label: 'AI Assistant', icon: Bot, route: '/app/assistant' as AppRoute },
          { label: 'Settings', icon: Settings, route: '/app/settings' as AppRoute }
        ];

      default:
        return [
          { label: 'Home', icon: LayoutDashboard, route: '/' as AppRoute },
          { label: 'Settings', icon: Settings, route: '/app/settings' as AppRoute }
        ];
    }
  };

  const navItems = getNavItems();

  const handleNavClick = (route: AppRoute) => {
    navigateTo(route);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Deep Emerald Sidebar matching Reference Image 3 */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#043E30] text-slate-100 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-emerald-950/60 shadow-xl lg:shadow-none`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-4 py-5">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-6 px-2 border-b border-emerald-800/40">
            <Logo size="md" theme="emerald" />
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800/60"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer group ${
                    isActive
                      ? 'bg-emerald-700/60 text-white font-semibold shadow-inner border border-emerald-600/40'
                      : 'text-emerald-100/80 hover:text-white hover:bg-emerald-800/40'
                  }`}
                >
                  <Icon
                    className={`w-4.5 h-4.5 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-[#D4AF37]' : 'text-emerald-300/80 group-hover:text-emerald-200'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Promo Card from Reference Image 3 */}
        <div className="p-4 border-t border-emerald-800/40">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/90 via-[#064E3B] to-[#022C22] p-4 border border-amber-500/30 shadow-lg text-left">
            <div className="relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                Intelligent Platform
              </span>
              <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                Smarter Financial Decisions with AI
              </h4>
              <p className="text-[11px] text-emerald-200/80 mt-1">
                Phase 0 unified architecture
              </p>
              <button
                type="button"
                onClick={() => handleNavClick('/app/recommendations')}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#F3E5AB] hover:text-white transition-colors cursor-pointer"
              >
                <span>View Insights</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Graphic Accents */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute top-2 right-2 text-amber-400/20 pointer-events-none">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
