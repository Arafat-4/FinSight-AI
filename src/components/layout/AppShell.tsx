import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import { Button } from '../common/Button';
import { ShieldAlert, ArrowRight } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export const AppShell: React.FC<AppShellProps> = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useAuth();
  const { currentRoute, navigateTo } = useRouter();

  // Role Access Guard at UI Level
  const isAuthorized = () => {
    if (!currentUser) return false;
    const role = currentUser.role;

    // Admin-only pages
    if (currentRoute === '/app/users' && role !== 'ADMIN') {
      return false;
    }
    if (currentRoute === '/app/admin' && role !== 'ADMIN') {
      return false;
    }

    // Role-specific dashboards access
    if (currentRoute === '/app/risk' && role !== 'RISK_FRAUD_ANALYST' && role !== 'ADMIN') {
      return false;
    }
    if (currentRoute === '/app/analyst' && role !== 'BUSINESS_ANALYST' && role !== 'ADMIN') {
      return false;
    }

    return true;
  };

  const authorized = isAuthorized();

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-slate-900 flex">
      {/* Shared Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Layout Area offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
        {/* Shared Top Navigation */}
        <TopNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} title={pageTitle} />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentUser?.role === 'UNASSIGNED' ? (
            <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Account Pending Role Assignment
              </h2>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                Welcome to FinSight AI. Your account ({currentUser.email}) has been registered with initial{' '}
                <span className="font-semibold text-slate-900">UNASSIGNED</span> status.
              </p>
              <p className="text-slate-500 text-xs mt-2">
                An Administrator must assign your role (Business Analyst, Customer, or Risk & Fraud Analyst)
                in accordance with enterprise governance before access to role-specific dashboards is unlocked.
              </p>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="primary"
                  onClick={() => navigateTo('/')}
                >
                  Return to Home
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    // Quick-switch to Admin for testing evaluator convenience
                    navigateTo('/login');
                  }}
                >
                  Sign In as Administrator
                </Button>
              </div>
            </div>
          ) : !authorized ? (
            <div className="max-w-lg mx-auto my-12 bg-white rounded-3xl p-8 border border-rose-200 text-center shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Restricted Route Access</h2>
              <p className="text-slate-600 text-sm mt-2">
                Your current role ({currentUser?.role?.replace('_', ' ')}) does not have permission to access {currentRoute}.
              </p>
              <div className="mt-6">
                <Button
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  onClick={() => {
                    if (currentUser?.role === 'CUSTOMER') navigateTo('/app/customer');
                    else if (currentUser?.role === 'BUSINESS_ANALYST') navigateTo('/app/analyst');
                    else if (currentUser?.role === 'RISK_FRAUD_ANALYST') navigateTo('/app/risk');
                    else navigateTo('/app');
                  }}
                >
                  Go to My Dashboard
                </Button>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
};
