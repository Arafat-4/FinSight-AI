import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useRouter } from '../../context/RouterContext';
import { dataService, formatINR } from '../../services/dataService';
import { Customer, Transaction } from '../../types';
import {
  Users,
  Search,
  Filter,
  Eye,
  TrendingUp,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export const CustomersPage: React.FC = () => {
  const { navigateTo } = useRouter();

  const [customers] = useState<Customer[]>(() => dataService.getCustomers());
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerTxns, setCustomerTxns] = useState<Transaction[]>([]);

  const handleSelectCustomer = (c: Customer) => {
    setSelectedCustomer(c);
    setCustomerTxns(dataService.getCustomerTransactions(c.id));
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSegment = segmentFilter === 'ALL' || c.segment === segmentFilter;
    const matchesRisk = riskFilter === 'ALL' || c.riskTier === riskFilter;

    return matchesSearch && matchesSegment && matchesRisk;
  });

  return (
    <AppShell pageTitle="Customers">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Customer Intelligence Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Analyze behavioral cohorts, spending velocity, credit scores, and customer lifetime value.
            </p>
          </div>

          <div className="text-xs font-mono font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
            Showing {filteredCustomers.length} of {customers.length} Profiles
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search customer name, ID, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Segment:</span>
            </div>
            <select
              value={segmentFilter}
              onChange={(e) => setSegmentFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="ALL">All Segments</option>
              <option value="High Value">High Value</option>
              <option value="Potential">Potential</option>
              <option value="Regular">Regular</option>
              <option value="At Risk">At Risk</option>
              <option value="New">New</option>
            </select>

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="Normal">Normal</option>
              <option value="Low Risk">Low Risk</option>
              <option value="Medium Risk">Medium Risk</option>
              <option value="High Risk">High Risk</option>
            </select>
          </div>
        </div>

        {/* Customer Directory Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#FAF9F5] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Customer ID</th>
                  <th className="py-3 px-3">Customer Name</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Age</th>
                  <th className="py-3 px-3">Credit Score</th>
                  <th className="py-3 px-3">Segment</th>
                  <th className="py-3 px-3 text-right">Balance</th>
                  <th className="py-3 px-3 text-right">Total Spend</th>
                  <th className="py-3 px-3">Risk Tier</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{c.id}</td>
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-400">{c.email}</div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700">{c.city}, {c.country}</td>
                    <td className="py-3.5 px-3 font-mono text-slate-600">{c.age} yrs</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-800">{c.creditScore}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          c.segment === 'High Value'
                            ? 'bg-emerald-50 text-emerald-800'
                            : c.segment === 'Potential'
                            ? 'bg-emerald-50/60 text-emerald-700'
                            : c.segment === 'At Risk'
                            ? 'bg-rose-50 text-rose-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {c.segment}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {formatINR(c.balance)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-700 tabular-nums">
                      {formatINR(c.totalSpend)}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                          c.riskTier === 'High Risk'
                            ? 'bg-rose-50 text-rose-700'
                            : c.riskTier === 'Medium Risk'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {c.riskTier}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<Eye className="w-3.5 h-3.5" />}
                          onClick={() => handleSelectCustomer(c)}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Detailed Profile Modal */}
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title={`Customer 360° Profile — ${selectedCustomer?.name}`}
          subtitle={`ID: ${selectedCustomer?.id} • Member Since ${selectedCustomer?.joinedDate}`}
          maxWidth="xl"
        >
          {selectedCustomer && (
            <div className="space-y-5">
              {/* Profile KPI Banner */}
              <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Balance</span>
                  <span className="font-bold font-mono text-slate-900 text-base mt-0.5 block tabular-nums">
                    {formatINR(selectedCustomer.balance)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Credit Score</span>
                  <span className="font-bold font-mono text-emerald-700 text-base mt-0.5 block">
                    {selectedCustomer.creditScore} / 900
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Segment</span>
                  <span className="font-bold text-slate-900 text-base mt-0.5 block">
                    {selectedCustomer.segment}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Risk Score</span>
                  <span className={`font-bold font-mono text-base mt-0.5 block ${selectedCustomer.riskScore > 50 ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {selectedCustomer.riskScore}/100 ({selectedCustomer.riskTier})
                  </span>
                </div>
              </div>

              {/* Contact & Demographic Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{selectedCustomer.phone}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{selectedCustomer.city}, {selectedCustomer.country}</span>
                </div>
              </div>

              {/* Correlated Transactions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Correlated Recent Transactions ({customerTxns.length})
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-400 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">Txn ID</th>
                        <th className="py-2 px-3">Date</th>
                        <th className="py-2 px-3">Category</th>
                        <th className="py-2 px-3 text-right">Amount</th>
                        <th className="py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {customerTxns.slice(0, 4).map((t) => (
                        <tr key={t.id}>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{t.id}</td>
                          <td className="py-2.5 px-3 text-slate-500">{t.date}</td>
                          <td className="py-2.5 px-3 text-slate-800">{t.category}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                            {formatINR(t.transactionAmount)}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-[11px] font-semibold text-emerald-700">{t.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCustomer(null);
                    navigateTo('/app/transactions');
                  }}
                >
                  View Full Transaction Ledger
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedCustomer(null)}
                >
                  Close Profile
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AppShell>
  );
};
