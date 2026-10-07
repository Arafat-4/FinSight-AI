import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { KpiCard } from '../../components/common/KpiCard';
import { Button } from '../../components/common/Button';
import { TrendChart } from '../../components/charts/TrendChart';
import { DonutChart } from '../../components/charts/DonutChart';
import { useRouter } from '../../context/RouterContext';
import { dataService, formatINR } from '../../services/dataService';
import {
  Users,
  CreditCard,
  Wallet,
  ShieldAlert,
  FileSpreadsheet,
  Sparkles,
  ArrowRight,
  UserCheck,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Settings
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { navigateTo } = useRouter();

  const kpis = dataService.getDashboardKPIs();
  const trendData = dataService.getTransactionTrend();
  const riskDist = dataService.getFraudRiskDistribution();
  const customerSegs = dataService.getCustomerSegments();
  const users = dataService.getUsers();
  const alerts = dataService.getRiskAlerts();

  return (
    <AppShell pageTitle="System Administration">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Platform Administration & System Governance
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Consolidated enterprise monitoring, user directory management, and system-level risk metrics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="primary"
              size="sm"
              icon={<Users className="w-3.5 h-3.5" />}
              onClick={() => navigateTo('/app/users')}
            >
              Manage Users & Roles
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={<Settings className="w-3.5 h-3.5" />}
              onClick={() => navigateTo('/app/settings')}
            >
              System Settings
            </Button>
          </div>
        </div>

        {/* Top 8 KPI Grid for Administrator */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Customers"
            value={kpis.totalCustomers.toLocaleString()}
            change="+10.1%"
            icon={<UserCheck className="w-5 h-5 text-emerald-800" />}
            iconBg="bg-emerald-50"
            onClickDetails={() => navigateTo('/app/customers')}
          />
          <KpiCard
            title="Total Transactions"
            value={kpis.totalTransactions.toLocaleString()}
            change="+12.5%"
            icon={<CreditCard className="w-5 h-5 text-amber-800" />}
            iconBg="bg-amber-50"
            onClickDetails={() => navigateTo('/app/transactions')}
          />
          <KpiCard
            title="Transaction Volume"
            value={formatINR(kpis.totalAmount)}
            change="+8.3%"
            icon={<Wallet className="w-5 h-5 text-emerald-800" />}
            iconBg="bg-emerald-50"
            onClickDetails={() => navigateTo('/app/transactions')}
          />
          <KpiCard
            title="Fraud Alerts"
            value={kpis.fraudRiskTransactions.toString()}
            change="+2.4%"
            isWarning={true}
            trendDirection="up"
            icon={<ShieldAlert className="w-5 h-5 text-rose-700" />}
            iconBg="bg-rose-50"
            onClickDetails={() => navigateTo('/app/risk')}
          />
          <KpiCard
            title="Active Platform Users"
            value={users.filter(u => u.status === 'ACTIVE').length.toString()}
            change="1 Pending"
            icon={<Users className="w-5 h-5 text-blue-800" />}
            iconBg="bg-blue-50"
            onClickDetails={() => navigateTo('/app/users')}
          />
          <KpiCard
            title="Open Forensic Cases"
            value={kpis.openCases.toString()}
            change="2 Critical"
            isWarning={true}
            icon={<FileSpreadsheet className="w-5 h-5 text-amber-800" />}
            iconBg="bg-amber-50"
            onClickDetails={() => navigateTo('/app/cases')}
          />
          <KpiCard
            title="High-Risk Customers"
            value={kpis.highRiskCustomers.toString()}
            change="0.5% of total"
            icon={<AlertTriangle className="w-5 h-5 text-rose-700" />}
            iconBg="bg-rose-50"
            onClickDetails={() => navigateTo('/app/customers')}
          />
          <KpiCard
            title="Recommendation Queue"
            value={kpis.recommendationActivity.toString()}
            change="76% approved"
            icon={<Sparkles className="w-5 h-5 text-emerald-800" />}
            iconBg="bg-emerald-50"
            onClickDetails={() => navigateTo('/app/recommendations')}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TrendChart data={trendData} title="System Transaction Ingestion Trend" />
          </div>

          <div>
            <DonutChart
              title="Risk Distribution by Tier"
              centerValue="28,000"
              centerLabel="Normal Txns"
              segments={riskDist}
            />
          </div>
        </div>

        {/* Quick Actions & Recent Platform Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 tracking-tight mb-4">
              Governance & Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => navigateTo('/app/users')}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                    Manage Users & Roles
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Assign Analyst, Customer, or Risk roles to users.
                </p>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('/app/risk')}
                className="p-4 rounded-xl border border-slate-200 hover:border-rose-400 hover:bg-rose-50/40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 group-hover:text-rose-800">
                    Review Fraud Queue
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Examine flagged transaction anomalies and active cases.
                </p>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('/app/customers')}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                    Customer Directory
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Audit 8,452 customer records, segments, and risk scores.
                </p>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('/app/documents')}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                    Document Repository
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Inspect KYC proofs, AML guidelines, and audit reports.
                </p>
              </button>
            </div>
          </div>

          {/* Active System Security Alerts */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  High-Priority Risk Alerts
                </h3>
                <span className="text-xs font-mono font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  {alerts.length} Active
                </span>
              </div>

              <div className="space-y-2.5">
                {alerts.slice(0, 3).map((a) => (
                  <div
                    key={a.id}
                    onClick={() => navigateTo('/app/risk')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-between gap-3 transition-colors cursor-pointer text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{a.alertType}</div>
                      <div className="text-slate-500 text-[11px]">
                        Customer: {a.customerName} • {a.transactionId}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono font-bold text-rose-600">
                        Risk {a.riskScore}/100
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{a.amount ? formatINR(a.amount) : ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500">System Status: Operational</span>
              <button
                onClick={() => navigateTo('/app/risk')}
                className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>View all alerts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
