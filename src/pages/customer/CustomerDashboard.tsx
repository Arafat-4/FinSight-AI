import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { KpiCard } from '../../components/common/KpiCard';
import { Button } from '../../components/common/Button';
import { SpendingBarChart } from '../../components/charts/SpendingBarChart';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import { dataService, formatINR } from '../../services/dataService';
import {
  Wallet,
  CreditCard,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Bot,
  ShoppingBag,
  ExternalLink,
  Lock
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { navigateTo } = useRouter();

  // Customer isolation simulated for Phase 0
  const customerId = currentUser?.customerId || 'CUST-8452';
  const customer = dataService.getCustomerById(customerId) || dataService.getCustomers()[0];
  const transactions = dataService.getCustomerTransactions(customerId);
  const recommendations = dataService.getCustomerRecommendations(customerId);

  const personalSpending = [
    { name: 'Shopping', percentage: 38, amount: 184000 },
    { name: 'Food & Dining', percentage: 24, amount: 116400 },
    { name: 'Utilities', percentage: 18, amount: 87300 },
    { name: 'Travel', percentage: 12, amount: 58200 },
    { name: 'Entertainment', percentage: 8, amount: 39300 }
  ];

  return (
    <AppShell pageTitle="Personal Account Dashboard">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 to-[#064E3B] text-white p-6 rounded-3xl shadow-md border border-emerald-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-[#F3E5AB] text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Account • {customer.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {customer.name}
            </h1>
            <p className="text-emerald-100/80 text-xs sm:text-sm mt-1">
              Your personalized AI financial dashboard and liquidity overview.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="gold"
              size="sm"
              icon={<Bot className="w-4 h-4 text-slate-900" />}
              onClick={() => navigateTo('/app/assistant')}
            >
              Ask FinSight
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigateTo('/app/transactions')}
            >
              My Transactions
            </Button>
          </div>
        </div>

        {/* Account Financial Overview KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Available Balance"
            value={formatINR(customer.balance)}
            change="+4.2%"
            timeframe="vs last month"
            icon={<Wallet className="w-5 h-5 text-emerald-800" />}
            iconBg="bg-emerald-50"
            onClickDetails={() => navigateTo('/app/transactions')}
          />
          <KpiCard
            title="Total Spend (30 Days)"
            value={formatINR(customer.totalSpend / 3)}
            change="-8.5%"
            timeframe="reduced burn"
            icon={<CreditCard className="w-5 h-5 text-amber-800" />}
            iconBg="bg-amber-50"
            onClickDetails={() => navigateTo('/app/transactions')}
          />
          <KpiCard
            title="Credit Health Score"
            value={`${customer.creditScore} / 900`}
            change="Excellent"
            icon={<TrendingUp className="w-5 h-5 text-emerald-800" />}
            iconBg="bg-emerald-50"
            onClickDetails={() => navigateTo('/app/recommendations')}
          />
          <KpiCard
            title="Account Security Status"
            value="Protected"
            change="0 Active Alerts"
            icon={<ShieldCheck className="w-5 h-5 text-blue-800" />}
            iconBg="bg-blue-50"
            onClickDetails={() => navigateTo('/app/settings')}
          />
        </div>

        {/* Spending Breakdown & Smart Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spending categories */}
          <div className="lg:col-span-2">
            <SpendingBarChart
              categories={personalSpending}
              title="My Monthly Spending Breakdown"
            />
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight mb-4">
                Personal Quick Actions
              </h3>
              <div className="space-y-2.5">
                <button
                  onClick={() => navigateTo('/app/transactions')}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-800">Analyze My Spending</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => navigateTo('/app/recommendations')}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-800">View Active Suggestions</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => navigateTo('/app/assistant')}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-800">Ask FinSight AI Assistant</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => navigateTo('/app/cases')}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/40 text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-800">Track Inquiries & Cases</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
              <span className="font-bold block">Smart Savings Insight</span>
              Auto-sweep liquid wealth recommendation could generate +₹ 18,500 annual returns.
            </div>
          </div>
        </div>

        {/* Customer's Personalized Recommendations */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Personalized Recommendations for You
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Curated insights tailored to your {customer.segment} relationship profile.
              </p>
            </div>
            <button
              onClick={() => navigateTo('/app/recommendations')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.slice(0, 2).map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/20 transition-all text-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {rec.category}
                  </span>
                  <span className="font-mono text-slate-400">{rec.createdDate}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{rec.title}</h4>
                <p className="text-slate-600 mt-1 leading-relaxed">{rec.description}</p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-emerald-700">{rec.potentialImpact}</span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigateTo('/app/recommendations')}
                  >
                    Review Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Recent Transactions Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              My Recent Transactions
            </h3>
            <button
              onClick={() => navigateTo('/app/transactions')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Transaction History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F5] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Transaction ID</th>
                  <th className="py-2.5 px-3">Date & Time</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.slice(0, 5).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">{t.id}</td>
                    <td className="py-3 px-3 text-slate-600">
                      {t.date} · {t.time}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium text-slate-800">{t.category}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{t.paymentMethod}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {formatINR(t.transactionAmount)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
