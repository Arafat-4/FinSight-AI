import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RouterProvider, useRouter } from './context/RouterContext';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { AnalystDashboard } from './pages/analyst/AnalystDashboard';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { RiskDashboard } from './pages/risk/RiskDashboard';
import { TransactionsPage } from './pages/transactions/TransactionsPage';
import { CustomersPage } from './pages/customers/CustomersPage';
import { CasesPage } from './pages/cases/CasesPage';
import { RecommendationsPage } from './pages/recommendations/RecommendationsPage';
import { AssistantPage } from './pages/assistant/AssistantPage';
import { DocumentsPage } from './pages/documents/DocumentsPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { AppShell } from './components/layout/AppShell';

const AppRoutes: React.FC = () => {
  const { currentRoute } = useRouter();
  const { currentUser } = useAuth();

  // Route Router matching exact 16 routes
  switch (currentRoute) {
    case '/':
      return <HomePage />;

    case '/login':
      return <LoginPage />;

    case '/signup':
      return <SignupPage />;

    case '/app':
      // Route dispatcher for /app based on user role
      if (currentUser?.role === 'ADMIN') return <AdminDashboard />;
      if (currentUser?.role === 'BUSINESS_ANALYST') return <AnalystDashboard />;
      if (currentUser?.role === 'CUSTOMER') return <CustomerDashboard />;
      if (currentUser?.role === 'RISK_FRAUD_ANALYST') return <RiskDashboard />;
      // If UNASSIGNED or no role, wrap in AppShell to show "Account Pending Role Assignment"
      return (
        <AppShell pageTitle="FinSight AI Portal">
          <div />
        </AppShell>
      );

    case '/app/admin':
      return <AdminDashboard />;

    case '/app/analyst':
      return <AnalystDashboard />;

    case '/app/customer':
      return <CustomerDashboard />;

    case '/app/risk':
      return <RiskDashboard />;

    case '/app/users':
      return <UserManagementPage />;

    case '/app/transactions':
      return <TransactionsPage />;

    case '/app/customers':
      return <CustomersPage />;

    case '/app/cases':
      return <CasesPage />;

    case '/app/recommendations':
      return <RecommendationsPage />;

    case '/app/assistant':
      return <AssistantPage />;

    case '/app/documents':
      return <DocumentsPage />;

    case '/app/settings':
      return <SettingsPage />;

    default:
      return <HomePage />;
  }
};

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <AppRoutes />
      </RouterProvider>
    </AuthProvider>
  );
}
