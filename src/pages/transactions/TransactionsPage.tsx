import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { dataService, formatINR } from '../../services/dataService';
import { Transaction } from '../../types';
import {
  CreditCard,
  Search,
  Filter,
  Eye,
  Globe,
  Smartphone,
  Laptop,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowUpDown
} from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const [transactions] = useState<Transaction[]>(() => dataService.getTransactions());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  const filteredTxns = transactions.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || t.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <AppShell pageTitle="Transactions">
      <div className="space-y-6">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Transaction Intelligence Ledger
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Multi-channel financial transactions with dimensional attributes, device metadata, and fraud risk scores.
            </p>
          </div>

          <div className="text-xs font-mono font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
            Showing {filteredTxns.length} of {transactions.length} Records
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search ID, customer, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Category:</span>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="Shopping">Shopping</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Travel">Travel</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Investments">Investments</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>
        </div>

        {/* Centralized Transactions Table with Full Project Columns */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#FAF9F5] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Transaction ID</th>
                  <th className="py-3 px-3">Customer ID</th>
                  <th className="py-3 px-3">Customer Name</th>
                  <th className="py-3 px-3">Date & Time</th>
                  <th className="py-3 px-3">Hour</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Payment Method</th>
                  <th className="py-3 px-3">Device</th>
                  <th className="py-3 px-3 text-right">Amount</th>
                  <th className="py-3 px-3 text-right">Balance</th>
                  <th className="py-3 px-3">Risk Score</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredTxns.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{t.id}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{t.customerId}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">{t.customerName}</td>
                    <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                      {t.date} · {t.time}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500">{t.hour}:00</td>
                    <td className="py-3 px-3 text-slate-700">
                      <span>{t.city}, {t.country}</span>
                      {t.international && (
                        <span className="ml-1.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          INTL
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">{t.category}</td>
                    <td className="py-3 px-3 text-slate-600">{t.paymentMethod}</td>
                    <td className="py-3 px-3 text-slate-500">{t.device}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {formatINR(t.transactionAmount)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-600 tabular-nums">
                      {formatINR(t.balance)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-mono font-bold ${t.fraudRiskScore >= 70 ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {t.fraudRiskScore}/100
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                          t.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : t.status === 'Flagged'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => setSelectedTxn(t)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTxns.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">No transactions matched your filters.</p>
            </div>
          )}
        </div>

        {/* Transaction Detail Modal */}
        <Modal
          isOpen={!!selectedTxn}
          onClose={() => setSelectedTxn(null)}
          title={`Transaction Audit — ${selectedTxn?.id}`}
          subtitle={`Customer ID: ${selectedTxn?.customerId} • ${selectedTxn?.customerName}`}
          maxWidth="lg"
        >
          {selectedTxn && (
            <div className="space-y-5">
              {/* Top Banner */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block uppercase">
                    Transaction Amount
                  </span>
                  <span className="text-2xl font-extrabold font-mono text-slate-900 tabular-nums">
                    {formatINR(selectedTxn.transactionAmount)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 font-semibold block uppercase">
                    Risk Assessment
                  </span>
                  <span className={`text-base font-bold font-mono ${selectedTxn.fraudRiskScore >= 70 ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {selectedTxn.fraudRiskScore}/100 ({selectedTxn.status})
                  </span>
                </div>
              </div>

              {/* Complete Project Attributes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Category</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedTxn.category}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Payment Method</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedTxn.paymentMethod}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Device Channel</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedTxn.device}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Location</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedTxn.city}, {selectedTxn.country}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Date & Hour</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedTxn.date} @ {selectedTxn.time} ({selectedTxn.hour}:00)</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Account Balance</span>
                  <span className="font-bold font-mono text-slate-900 mt-0.5 block">{formatINR(selectedTxn.balance)}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Credit Score</span>
                  <span className="font-bold font-mono text-slate-900 mt-0.5 block">{selectedTxn.creditScore}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Account Age</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedTxn.accountAge} Months</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Prior Txns Count</span>
                  <span className="font-bold font-mono text-slate-900 mt-0.5 block">{selectedTxn.previousTransactions} Txns ({selectedTxn.transactionFrequency} Freq)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <Button variant="primary" size="sm" onClick={() => setSelectedTxn(null)}>
                  Close Record
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AppShell>
  );
};
