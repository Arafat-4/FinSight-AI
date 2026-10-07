import {
  User,
  Role,
  UserStatus,
  Customer,
  Transaction,
  Case,
  Recommendation,
  RiskAlert,
  PlatformDocument
} from '../types';
import {
  INITIAL_USERS,
  MOCK_CUSTOMERS,
  MOCK_TRANSACTIONS,
  MOCK_CASES,
  MOCK_RECOMMENDATIONS,
  MOCK_RISK_ALERTS,
  MOCK_DOCUMENTS,
  DASHBOARD_KPIS,
  SPENDING_CATEGORIES,
  CUSTOMER_SEGMENTS,
  FRAUD_RISK_DISTRIBUTION,
  TRANSACTION_TREND_DATA
} from '../data/mockData';

// Format currency as Indian Rupee (₹) with Indian numbering format (e.g. ₹ 12,45,230)
export function formatINR(val: number): string {
  const parts = Math.round(val).toString();
  let lastThree = parts.substring(parts.length - 3);
  const otherNumbers = parts.substring(0, parts.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  return `₹ ${formatted}`;
}

export function formatCompactINR(val: number): string {
  if (val >= 10000000) {
    return `₹ ${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹ ${(val / 100000).toFixed(2)} L`;
  }
  if (val >= 1000) {
    return `₹ ${(val / 1000).toFixed(1)}k`;
  }
  return formatINR(val);
}

// In-memory persistent stores during app runtime (backed by localStorage if available)
const STORAGE_PREFIX = 'finsight_demo_';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch {
    // ignore in environments without localStorage
  }
}

// Active data caches
let usersCache: User[] = loadFromStorage('users', INITIAL_USERS);
let customersCache: Customer[] = loadFromStorage('customers', MOCK_CUSTOMERS);
let transactionsCache: Transaction[] = loadFromStorage('transactions', MOCK_TRANSACTIONS);
let casesCache: Case[] = loadFromStorage('cases', MOCK_CASES);
let recommendationsCache: Recommendation[] = loadFromStorage('recommendations', MOCK_RECOMMENDATIONS);
let riskAlertsCache: RiskAlert[] = loadFromStorage('alerts', MOCK_RISK_ALERTS);
let documentsCache: PlatformDocument[] = loadFromStorage('documents', MOCK_DOCUMENTS);

export const dataService = {
  // ---- USERS & ROLE MANAGEMENT ----
  getUsers(): User[] {
    return [...usersCache];
  },

  getUserById(id: string): User | undefined {
    return usersCache.find(u => u.id === id);
  },

  getUserByEmail(email: string): User | undefined {
    return usersCache.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  updateUserRole(userId: string, newRole: Role): { success: boolean; message: string; user?: User } {
    // Admin Rule Enforcements
    if (newRole === 'ADMIN') {
      return { success: false, message: 'Policy Violation: Only exactly ONE Admin is permitted. Cannot promote or assign Admin.' };
    }

    const targetUser = usersCache.find(u => u.id === userId);
    if (!targetUser) {
      return { success: false, message: 'User not found.' };
    }

    if (targetUser.role === 'ADMIN') {
      return { success: false, message: 'System Admin role cannot be modified or revoked.' };
    }

    // Role assignment permitted: UNASSIGNED -> BUSINESS_ANALYST | CUSTOMER | RISK_FRAUD_ANALYST, or changing between them
    targetUser.role = newRole;
    targetUser.status = 'ACTIVE';
    if (newRole === 'CUSTOMER' && !targetUser.customerId) {
      // Link to demo customer profile if needed
      targetUser.customerId = 'CUST-8452';
    }
    saveToStorage('users', usersCache);
    return { success: true, message: `Successfully updated role for ${targetUser.name} to ${newRole.replace('_', ' ')}.`, user: targetUser };
  },

  updateUserStatus(userId: string, status: UserStatus): boolean {
    const target = usersCache.find(u => u.id === userId);
    if (!target || target.role === 'ADMIN') return false;
    target.status = status;
    saveToStorage('users', usersCache);
    return true;
  },

  createUser(name: string, email: string): User {
    const newUser: User = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name,
      email,
      role: 'UNASSIGNED', // strictly UNASSIGNED upon signup
      status: 'PENDING',
      department: 'Pending Admin Assignment',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    usersCache.push(newUser);
    saveToStorage('users', usersCache);
    return newUser;
  },

  // ---- CUSTOMERS ----
  getCustomers(): Customer[] {
    return [...customersCache];
  },

  getCustomerById(id: string): Customer | undefined {
    return customersCache.find(c => c.id === id);
  },

  // ---- TRANSACTIONS ----
  getTransactions(): Transaction[] {
    return [...transactionsCache];
  },

  getTransactionById(id: string): Transaction | undefined {
    return transactionsCache.find(t => t.id === id);
  },

  getCustomerTransactions(customerId: string): Transaction[] {
    return transactionsCache.filter(t => t.customerId === customerId);
  },

  // ---- CASES ----
  getCases(): Case[] {
    return [...casesCache];
  },

  getCaseById(id: string): Case | undefined {
    return casesCache.find(c => c.id === id);
  },

  getCustomerCases(customerId: string): Case[] {
    return casesCache.filter(c => c.customerId === customerId);
  },

  updateCaseStatus(caseId: string, status: Case['status']): boolean {
    const c = casesCache.find(item => item.id === caseId);
    if (!c) return false;
    c.status = status;
    c.updatedAt = new Date().toISOString();
    saveToStorage('cases', casesCache);
    return true;
  },

  // ---- RECOMMENDATIONS ----
  getRecommendations(): Recommendation[] {
    return [...recommendationsCache];
  },

  getCustomerRecommendations(customerId: string): Recommendation[] {
    return recommendationsCache.filter(r => r.customerId === customerId);
  },

  updateRecommendationStatus(id: string, status: Recommendation['status']): boolean {
    const r = recommendationsCache.find(item => item.id === id);
    if (!r) return false;
    r.status = status;
    saveToStorage('recommendations', recommendationsCache);
    return true;
  },

  // ---- RISK ALERTS ----
  getRiskAlerts(): RiskAlert[] {
    return [...riskAlertsCache];
  },

  updateRiskAlertStatus(id: string, status: RiskAlert['status']): boolean {
    const a = riskAlertsCache.find(item => item.id === id);
    if (!a) return false;
    a.status = status;
    saveToStorage('alerts', riskAlertsCache);
    return true;
  },

  // ---- DOCUMENTS ----
  getDocuments(): PlatformDocument[] {
    return [...documentsCache];
  },

  addDocument(doc: Omit<PlatformDocument, 'id' | 'uploadedAt' | 'status'>): PlatformDocument {
    const newDoc: PlatformDocument = {
      ...doc,
      id: `DOC-${Math.floor(200 + Math.random() * 800)}`,
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'Queued'
    };
    documentsCache.unshift(newDoc);
    saveToStorage('documents', documentsCache);
    return newDoc;
  },

  // ---- DASHBOARD DATA & KPIS ----
  getDashboardKPIs() {
    return DASHBOARD_KPIS;
  },

  getSpendingCategories() {
    return SPENDING_CATEGORIES;
  },

  getCustomerSegments() {
    return CUSTOMER_SEGMENTS;
  },

  getFraudRiskDistribution() {
    return FRAUD_RISK_DISTRIBUTION;
  },

  getTransactionTrend() {
    return TRANSACTION_TREND_DATA;
  }
};
