import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { dataService, formatINR } from '../../services/dataService';
import { Case } from '../../types';
import {
  FileSpreadsheet,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Clock,
  UserCheck
} from 'lucide-react';

export const CasesPage: React.FC = () => {
  const [cases, setCases] = useState<Case[]>(() => dataService.getCases());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  const handleUpdateStatus = (caseId: string, status: Case['status']) => {
    dataService.updateCaseStatus(caseId, status);
    setCases(dataService.getCases());
    setStatusFeedback(`Case ${caseId} updated to ${status}.`);
    setTimeout(() => {
      setSelectedCase(null);
      setStatusFeedback(null);
    }, 700);
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.assignedUserName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppShell pageTitle="Cases">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Forensic Case Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Active fraud investigations, chargeback disputes, AML thresholds, and anomaly tracking queues.
            </p>
          </div>

          <div className="text-xs font-mono font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
            {cases.filter(c => c.status !== 'Closed').length} Active Inquiries
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search case ID, customer, investigator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="ALL">All Statuses ({cases.length})</option>
              <option value="Open">Open</option>
              <option value="In Review">In Review</option>
              <option value="Escalated">Escalated</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Case List Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#FAF9F5] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Case ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Anomaly Type</th>
                  <th className="py-3 px-3">Priority</th>
                  <th className="py-3 px-3 text-right">Value Under Review</th>
                  <th className="py-3 px-3">Assigned Investigator</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Updated Date</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{c.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{c.customerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{c.customerId}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-800 font-medium">{c.caseType}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          c.priority === 'Critical'
                            ? 'bg-rose-50 text-rose-700 font-bold'
                            : c.priority === 'High'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {c.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {formatINR(c.amountUnderReview)}
                    </td>
                    <td className="py-3 px-3 text-slate-700">{c.assignedUserName}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                          c.status === 'Open'
                            ? 'bg-rose-50 text-rose-700'
                            : c.status === 'In Review'
                            ? 'bg-amber-50 text-amber-700'
                            : c.status === 'Resolved'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                      {new Date(c.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => setSelectedCase(c)}
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Case Inspection & Status Update Modal */}
        <Modal
          isOpen={!!selectedCase}
          onClose={() => setSelectedCase(null)}
          title={`Forensic Case Record — ${selectedCase?.id}`}
          subtitle={`Customer: ${selectedCase?.customerName} (${selectedCase?.customerId})`}
          maxWidth="lg"
        >
          {selectedCase && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Case Type</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedCase.caseType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Priority</span>
                  <span className="font-bold text-rose-600 mt-0.5 block">{selectedCase.priority}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Investigator</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">{selectedCase.assignedUserName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Amount Under Review</span>
                  <span className="font-bold font-mono text-slate-900 mt-0.5 block">
                    {formatINR(selectedCase.amountUnderReview)}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">Case Description</span>
                <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {selectedCase.description}
                </p>
              </div>

              {selectedCase.findings && (
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-1">Forensic Findings</span>
                  <p className="text-xs text-slate-600 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                    {selectedCase.findings}
                  </p>
                </div>
              )}

              {statusFeedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{statusFeedback}</span>
                </div>
              )}

              {/* Status Update Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-slate-400">Current Status: <strong>{selectedCase.status}</strong></span>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCase(null)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedCase.id, 'In Review')}
                  >
                    Mark In Review
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedCase.id, 'Resolved')}
                  >
                    Resolve Case
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AppShell>
  );
};
