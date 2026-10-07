import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { KpiCard } from '../../components/common/KpiCard';
import { Button } from '../../components/common/Button';
import { DonutChart } from '../../components/charts/DonutChart';
import { Modal } from '../../components/common/Modal';
import { useRouter } from '../../context/RouterContext';
import { dataService, formatINR } from '../../services/dataService';
import { RiskAlert, Transaction, Case } from '../../types';
import {
  ShieldAlert,
  AlertTriangle,
  FileSpreadsheet,
  Globe,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const RiskDashboard: React.FC = () => {
  const { navigateTo } = useRouter();

  const [alerts, setAlerts] = useState<RiskAlert[]>(() => dataService.getRiskAlerts());
  const [selectedAlert, setSelectedAlert] = useState<RiskAlert | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const fraudRiskDist = dataService.getFraudRiskDistribution();
  const cases = dataService.getCases();
  const allTxns = dataService.getTransactions();
  const flaggedTxns = allTxns.filter((t) => t.isFlaggedFraud);

  const handleUpdateAlertStatus = (id: string, status: RiskAlert['status']) => {
    dataService.updateRiskAlertStatus(id, status);
    setAlerts(dataService.getRiskAlerts());
    setActionFeedback(`Alert ${id} updated to ${status}.`);
    setTimeout(() => {
      setSelectedAlert(null);
      setActionFeedback(null);
    }, 800);
  };

  return (
    <AppShell pageTitle="Risk & Fraud Forensics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Risk & Fraud Monitoring Console
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                Risk Analyst
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real-time anomaly surveillance, high-risk flags, geographic mismatches, and forensic investigation queues.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={<FileSpreadsheet className="w-3.5 h-3.5" />}
              onClick={() => navigateTo('/app/cases')}
            >
              Forensic Cases ({cases.length})
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={() => setAlerts(dataService.getRiskAlerts())}
            >
              Sync Alerts
            </Button>
          </div>
        </div>

        {/* 4 Risk Specific KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Active Fraud Alerts"
            value={alerts.filter(a => a.status !== 'Dismissed').length.toString()}
            change="4 High Risk"
            isWarning={true}
            trendDirection="up"
            icon={<ShieldAlert className="w-5 h-5 text-rose-700" />}
            iconBg="bg-rose-50"
            onClickDetails={() => navigateTo('/app/transactions')}
          />
          <KpiCard
            title="Flagged Transactions"
            value={flaggedTxns.length.toString()}
            change="1 Pending Settlement"
            isWarning={true}
            icon={<AlertTriangle className="w-5 h-5 text-amber-700" />}
            iconBg="bg-amber-50"
            onClickDetails={() => navigateTo('/app/transactions')}
          />
          <KpiCard
            title="Active Forensic Cases"
            value={cases.filter(c => c.status !== 'Closed').length.toString()}
            change="2 In Review"
            icon={<FileSpreadsheet className="w-5 h-5 text-amber-700" />}
            iconBg="bg-amber-50"
            onClickDetails={() => navigateTo('/app/cases')}
          />
          <KpiCard
            title="Clean Settlement Rate"
            value="99.21%"
            change="Normal Tolerance"
            icon={<ShieldCheck className="w-5 h-5 text-emerald-800" />}
            iconBg="bg-emerald-50"
            onClickDetails={() => navigateTo('/app/transactions')}
          />
        </div>

        {/* Risk Distribution and Geographic Anomalies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <DonutChart
              title="Transaction Risk Classification"
              centerValue="238"
              centerLabel="High Risk"
              segments={fraudRiskDist}
              showLegendPercentages={false}
            />
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Geographic & Temporal Velocity Anomalies
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Live Queue</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/80 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-rose-900">
                      Cross-Border Session Jump (Dubai, UAE ⇄ Ahmedabad, India)
                    </span>
                    <p className="text-slate-600 mt-0.5">
                      Customer Rajesh Patel (CUST-8454): Outbound ₹1,85,000 transfer initiated from UAE IP within 4 hours of physical domestic card swipe.
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      const alert = alerts.find(a => a.id === 'ALT-501');
                      if (alert) setSelectedAlert(alert);
                    }}
                  >
                    Investigate
                  </Button>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-amber-900">
                      Off-Peak Velocity Spike (02:44 AM Window)
                    </span>
                    <p className="text-slate-600 mt-0.5">
                      Customer Siddharth Verma (CUST-8460): Transaction amount ₹45,000 exceeds 140% of 30-day average during off-peak sleep interval.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const alert = alerts.find(a => a.id === 'ALT-502');
                      if (alert) setSelectedAlert(alert);
                    }}
                  >
                    Review
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
              <span>Rule Engine: 12 Anomaly Heuristics Active</span>
              <button
                onClick={() => navigateTo('/app/transactions')}
                className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>Filter Suspicious Transactions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Alerts Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                High-Priority Anomaly Alerts
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Investigate, escalate, or clear transaction risk alerts.
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {alerts.length} Total Alerts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F5] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Alert ID</th>
                  <th className="py-2.5 px-3">Transaction</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Anomaly Type</th>
                  <th className="py-2.5 px-3">Risk Score</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {alerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-800">{alert.id}</td>
                    <td className="py-3 px-3 font-mono text-slate-600">{alert.transactionId}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-900">{alert.customerName}</span>
                      <span className="block text-[10px] text-slate-400 font-mono">{alert.customerId}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-800 font-medium">{alert.alertType}</td>
                    <td className="py-3 px-3">
                      <span className={`font-mono font-bold ${alert.riskScore >= 80 ? 'text-rose-600' : 'text-amber-600'}`}>
                        {alert.riskScore}/100
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">{alert.timestamp}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                        alert.status === 'Investigating'
                          ? 'bg-amber-50 text-amber-800'
                          : alert.status === 'Escalated'
                          ? 'bg-rose-50 text-rose-800'
                          : alert.status === 'Dismissed'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedAlert(alert)}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alert Investigation Modal */}
        <Modal
          isOpen={!!selectedAlert}
          onClose={() => setSelectedAlert(null)}
          title={`Forensic Investigation — ${selectedAlert?.id}`}
          subtitle={`Transaction: ${selectedAlert?.transactionId} • ${selectedAlert?.timestamp}`}
          maxWidth="lg"
        >
          {selectedAlert && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Customer</span>
                    <span className="font-bold text-slate-900 text-sm mt-0.5 block">{selectedAlert.customerName}</span>
                    <span className="font-mono text-slate-500 text-[11px]">{selectedAlert.customerId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Risk Score</span>
                    <span className="font-bold text-rose-600 font-mono text-sm mt-0.5 block">
                      {selectedAlert.riskScore}/100 ({selectedAlert.severity})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Anomaly Category</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">{selectedAlert.alertType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Flagged Value</span>
                    <span className="font-bold font-mono text-slate-900 mt-0.5 block">
                      {selectedAlert.amount ? formatINR(selectedAlert.amount) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {actionFeedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{actionFeedback}</span>
                </div>
              )}

              <div className="text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">Forensic Analysis Protocol:</span>
                Determine whether the recorded transaction demonstrates intentional authorization or malicious token interception. You may escalate for customer identity reverification or dismiss the flag if verified by 2FA token.
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAlert(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleUpdateAlertStatus(selectedAlert.id, 'Dismissed')}
                >
                  Dismiss Flag (Cleared)
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateAlertStatus(selectedAlert.id, 'Investigating')}
                >
                  Mark Under Investigation
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleUpdateAlertStatus(selectedAlert.id, 'Escalated')}
                >
                  Escalate Case
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AppShell>
  );
};
