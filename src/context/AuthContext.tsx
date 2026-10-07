import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { dataService } from '../services/dataService';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => { success: boolean; message: string; user?: User };
  signup: (name: string, email: string, pass: string) => { success: boolean; message: string; user?: User };
  logout: () => void;
  switchDemoUser: (role: Role) => void;
  refreshCurrentUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Business Analyst (T. Gopi Chand from reference) or Admin
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedId = localStorage.getItem('finsight_current_user_id');
    const allUsers = dataService.getUsers();
    if (savedId) {
      const match = allUsers.find(u => u.id === savedId);
      if (match) return match;
    }
    // Default to Business Analyst as shown in reference design
    return allUsers.find(u => u.role === 'BUSINESS_ANALYST') || allUsers[0];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('finsight_current_user_id', currentUser.id);
    } else {
      localStorage.removeItem('finsight_current_user_id');
    }
  }, [currentUser]);

  const refreshCurrentUser = () => {
    if (!currentUser) return;
    const fresh = dataService.getUserById(currentUser.id);
    if (fresh) setCurrentUser({ ...fresh });
  };

  const login = (email: string, _pass: string) => {
    const user = dataService.getUserByEmail(email);
    if (!user) {
      return { success: false, message: 'Invalid credentials. User with this email does not exist.' };
    }
    if (user.status === 'SUSPENDED') {
      return { success: false, message: 'Account is suspended. Please contact the System Administrator.' };
    }
    setCurrentUser(user);
    return { success: true, message: 'Login successful.', user };
  };

  const signup = (name: string, email: string, _pass: string) => {
    const existing = dataService.getUserByEmail(email);
    if (existing) {
      return { success: false, message: 'An account with this email address already exists.' };
    }
    const newUser = dataService.createUser(name, email);
    setCurrentUser(newUser);
    return { success: true, message: 'Account registered successfully with UNASSIGNED status.', user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchDemoUser = (role: Role) => {
    const users = dataService.getUsers();
    const match = users.find(u => u.role === role);
    if (match) {
      setCurrentUser(match);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        switchDemoUser,
        refreshCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
