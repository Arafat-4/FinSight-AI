import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

export type AppRoute =
  | '/'
  | '/login'
  | '/signup'
  | '/app'
  | '/app/admin'
  | '/app/analyst'
  | '/app/customer'
  | '/app/risk'
  | '/app/users'
  | '/app/transactions'
  | '/app/customers'
  | '/app/cases'
  | '/app/recommendations'
  | '/app/assistant'
  | '/app/documents'
  | '/app/settings';

interface RouterContextType {
  currentRoute: AppRoute;
  navigateTo: (route: AppRoute) => void;
  getRoleDashboardRoute: () => AppRoute;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    const path = window.location.pathname;
    const validRoutes: AppRoute[] = [
      '/',
      '/login',
      '/signup',
      '/app',
      '/app/admin',
      '/app/analyst',
      '/app/customer',
      '/app/risk',
      '/app/users',
      '/app/transactions',
      '/app/customers',
      '/app/cases',
      '/app/recommendations',
      '/app/assistant',
      '/app/documents',
      '/app/settings'
    ];
    if (validRoutes.includes(path as AppRoute)) {
      return path as AppRoute;
    }
    return '/';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  const getRoleDashboardRoute = useCallback((): AppRoute => {
    if (!currentUser) return '/login';
    switch (currentUser.role) {
      case 'ADMIN':
        return '/app/admin';
      case 'BUSINESS_ANALYST':
        return '/app/analyst';
      case 'CUSTOMER':
        return '/app/customer';
      case 'RISK_FRAUD_ANALYST':
        return '/app/risk';
      case 'UNASSIGNED':
      default:
        return '/app';
    }
  }, [currentUser]);

  const navigateTo = useCallback((route: AppRoute) => {
    let target = route;
    // Resolve /app shortcut dynamically based on current user role
    if (route === '/app') {
      target = getRoleDashboardRoute();
    }
    setCurrentRoute(target);
    try {
      window.history.pushState({}, '', target);
    } catch {
      // In sandbox if pushState restricted
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [getRoleDashboardRoute]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as AppRoute;
      setCurrentRoute(path || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <RouterContext.Provider
      value={{
        currentRoute,
        navigateTo,
        getRoleDashboardRoute,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
