import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { KpiCard } from '../../components/common/KpiCard';
import { TrendChart } from '../../components/charts/TrendChart';
import { DonutChart } from '../../components/charts/DonutChart';
import { SpendingBarChart } from '../../components/charts/SpendingBarChart';
import { useRouter } from '../../context/RouterContext';
import { dataService, formatINR } from '../../services/dataService';
import {
  Coins,
  Wallet,
  Users,
  ShieldCheck,
  ChevronRight,
  Target,
  AlertTriangle,
  Megaphone,
  TrendingUp
} from 'lucide-react';

export const AnalystDashboard: React.FC = () => {
  const { navigateTo } = useRouter();

  const kpis = dataService.getDashboardKPIs();
  const trendData = dataService.getTransactionTrend();
  const spendingCats = dataService.getSpendingCategories();
  const customerSegs = dataService.getCustomerSegments();
  const fraudRiskDist = dataService.getFraudRiskDistribution();

  return (
    <AppShell pageTitle="Dashboard">
      <div className="space-y-6">
        {/* Header matching Reference Image 3 */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Get a comprehensive view of your financial data and AI-driven insights.
          </p>
        </div>

        {/* 4 Primary KPI Cards matching Reference Image 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Transactions"
            value="30,000"
            change="12.5%"
            timeframe="vs last month"
            icon={<Coins className="w-5 h-5 text-amber-700" />}
            iconBg="bg-amber-50"
            onClickDetails={() => navigateTo('/app/transactions')}
          />
          <KpiCard
            title="Total Amount"
            value="₹ 12,45,230"
            change="8.3%"
            timeframe="vs last month"
            icon={<Wallet className="w-5 h-5 text-amber-700" />}
            iconBg="bg-amber-50"
            onClickDetails={() => navigateTo('/app/transactions')}
          />
          <KpiCard
            title="Total Customers"
            value="8,452"
            change="10.1%"
            timeframe="vs last month"
            icon={<Users className="w-5 h-5 text-amber-700" />}
            iconBg="bg-amber-50"
            onClickDetails={() => navigateTo('/app/customers')}
          />
          <KpiCard
            title="Fraud Risk Transactions"
            value="238"
            change="2.4%"
            timeframe="vs last month"
            isWarning={true}
            trendDirection="up"
            icon={<ShieldCheck className="w-5 h-5 text-amber-700" />}
            iconBg="bg-amber-50"
            onClickDetails={() => navigateTo('/app/risk')}
          />
        </div>

        {/* Chart Row 1: Transaction Trend & Customer Segmentation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TrendChart data={trendData} title="Transaction Trend" />
          </div>

          <div>
            <DonutChart
              title="Customer Segmentation"
              centerValue="8,452"
              centerLabel="Customers"
              segments={customerSegs}
            />
          </div>
        </div>

        {/* Chart Row 2: Top Spending, Fraud Risk Analysis & AI Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top Spending Categories */}
          <SpendingBarChart
            categories={spendingCats}
            title="Top Spending Categories"
          />

          {/* Fraud Risk Analysis Donut */}
          <DonutChart
            title="Fraud Risk Analysis"
            centerValue="238"
            centerLabel="High Risk"
            segments={fraudRiskDist}
            showLegendPercentages={false}
          />

          {/* AI Recommendations Cards matching Reference Image 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  AI Recommendations
                </h3>
                <button
                  type="button"
                  onClick={() => navigateTo('/app/recommendations')}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Recommendation Item List from Reference Image 3 */}
              <div className="space-y-2.5">
                {[
                  {
                    title: 'Target potential high-value customers',
                    desc: '250 customers show high growth potential',
                    icon: Target,
                    color: 'text-emerald-700 bg-emerald-50'
                  },
                  {
                    title: 'Flag unusual transactions',
                    desc: '15 transactions require review',
                    icon: AlertTriangle,
                    color: 'text-rose-700 bg-rose-50'
                  },
                  {
                    title: 'Recommend personalized offers',
                    desc: 'Increase customer engagement by 18%',
                    icon: Megaphone,
                    color: 'text-amber-700 bg-amber-50'
                  },
                  {
                    title: 'Optimize credit risk model',
                    desc: 'Reduce default risk by 12%',
                    icon: TrendingUp,
                    color: 'text-emerald-700 bg-emerald-50'
                  }
                ].map((rec, idx) => {
                  const Icon = rec.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => navigateTo('/app/recommendations')}
                      className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 flex items-center justify-between gap-3 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${rec.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 leading-tight">
                            {rec.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {rec.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
              Generated via central synthetic analytics layer
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
