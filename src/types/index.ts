export type Role = 'ADMIN' | 'BUSINESS_ANALYST' | 'CUSTOMER' | 'RISK_FRAUD_ANALYST' | 'UNASSIGNED';

export type UserStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  avatarUrl?: string;
  department?: string;
  customerId?: string; // If role is CUSTOMER, linked customer entity
  createdAt: string;
  lastLogin: string;
}

export type CustomerSegment = 'High Value' | 'Potential' | 'Regular' | 'At Risk' | 'New';
export type RiskTier = 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Normal';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  age: number;
  creditScore: number;
  accountAgeMonths: number;
  balance: number;
  segment: CustomerSegment;
  riskTier: RiskTier;
  riskScore: number; // 0-100
  totalTransactionsCount: number;
  totalSpend: number;
  averageTransactionAmount: number;
  lastActive: string;
  joinedDate: string;
  preferredPaymentMethod: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  time: string;
  hour: number;
  country: string;
  city: string;
  category: 'Shopping' | 'Food & Dining' | 'Travel' | 'Utilities' | 'Entertainment' | 'Healthcare' | 'Investments';
  paymentMethod: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Digital Wallet';
  device: 'Mobile App (iOS)' | 'Mobile App (Android)' | 'Web Desktop' | 'POS Terminal' | 'ATM';
  age: number;
  creditScore: number;
  accountAge: number;
  balance: number;
  transactionAmount: number;
  previousTransactions: number;
  transactionFrequency: 'High' | 'Medium' | 'Low';
  international: boolean;
  isFlaggedFraud: boolean;
  fraudRiskScore: number; // 0 - 100
  status: 'Completed' | 'Pending Review' | 'Flagged' | 'Declined';
}

export interface Case {
  id: string;
  customerId: string;
  customerName: string;
  caseType: 'High-Value Anomaly' | 'Velocity Spike' | 'Geographic Mismatch' | 'New Device Login' | 'AML Threshold' | 'Chargeback Dispute';
  priority: 'High' | 'Medium' | 'Low' | 'Critical';
  status: 'Open' | 'In Review' | 'Escalated' | 'Resolved' | 'Closed';
  assignedUserId: string;
  assignedUserName: string;
  amountUnderReview: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  findings?: string;
}

export interface Recommendation {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  category: 'Credit & Lending' | 'Investment Portfolio' | 'Spending Optimization' | 'Fraud Shield' | 'Loyalty & Rewards';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending Review' | 'Approved' | 'Sent to Customer' | 'Dismissed';
  createdDate: string;
  reasonContext: string;
  potentialImpact: string;
}

export interface RiskAlert {
  id: string;
  transactionId: string;
  customerId: string;
  customerName: string;
  alertType: 'Unusual Out-of-Country Transaction' | 'Rapid Successive Withdrawals' | 'High Value Transfer at Off-Hours' | 'Credit Score Degradation';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  riskScore: number;
  timestamp: string;
  status: 'Unresolved' | 'Investigating' | 'Dismissed' | 'Escalated';
  amount: number;
}

export interface PlatformDocument {
  id: string;
  title: string;
  category: 'Financial Statement' | 'KYC Verification' | 'Risk Audit' | 'Compliance Report' | 'Transaction Log';
  fileSize: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'Processed' | 'Queued' | 'Review Required';
  tags: string[];
}
