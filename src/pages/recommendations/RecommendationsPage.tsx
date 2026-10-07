import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useRouter } from '../../context/RouterContext';
import { dataService } from '../../services/dataService';
import { Recommendation } from '../../types';
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Eye,
  Info,
  TrendingUp,
  UserCheck,
  Calendar
} from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const { navigateTo } = useRouter();

  const [recommendations, setRecommendations] = useState<Recommendation[]>(() =>
    dataService.getRecommendations()
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleUpdateStatus = (id: string, status: Recommendation['status']) => {
    dataService.updateRecommendationStatus(id, status);
    setRecommendations(dataService.getRecommendations());
    setFeedback(`Recommendation ${id} status updated to: ${status}`);
    setTimeout(() => {
      setSelectedRec(null);
      setFeedback(null);
    }, 700);
  };

  const filteredRecs = recommendations.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppShell pageTitle="Recommendations">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Personalized Financial Recommendations
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Curated synthetic recommendations for liquidity sweeps, card upgrades, and risk velocity caps.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100 text-xs font-semibold">
            Phase 0 Curated Synthetic Records
          </div>
        </div>

        {/* Phase 0 Architecture Disclaimer */}
        <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200/90 flex items-start gap-2.5 text-xs text-slate-600">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong>Phase 0 Architecture Boundary:</strong> Recommendations are derived from pre-generated synthetic customer records. No active machine learning or LLM inference pipelines are instantiated in this phase.
          </span>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search recommendation title or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="ALL">All Categories ({recommendations.length})</option>
              <option value="Investment Portfolio">Investment Portfolio</option>
              <option value="Loyalty & Rewards">Loyalty & Rewards</option>
              <option value="Fraud Shield">Fraud Shield</option>
              <option value="Credit & Lending">Credit & Lending</option>
              <option value="Spending Optimization">Spending Optimization</option>
            </select>
          </div>
        </div>

        {/* Recommendations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRecs.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {rec.category}
                  </span>
                  <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                    rec.priority === 'High' ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {rec.priority} Priority
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{rec.title}</h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">{rec.description}</p>

                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    Context & Rationale
                  </span>
                  <p className="mt-0.5 text-slate-700 text-[11px] leading-relaxed">{rec.reasonContext}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-slate-500 font-medium">Customer: {rec.customerName}</span>
                  <span className="font-bold text-emerald-700">{rec.status}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedRec(rec)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleUpdateStatus(rec.id, 'Approved')}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation Detail Modal */}
        <Modal
          isOpen={!!selectedRec}
          onClose={() => setSelectedRec(null)}
          title={selectedRec?.title || 'Recommendation Details'}
          subtitle={`Recommendation ID: ${selectedRec?.id} • Category: ${selectedRec?.category}`}
          maxWidth="lg"
        >
          {selectedRec && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-wider block">Target Customer</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{selectedRec.customerName} ({selectedRec.customerId})</span>
                <span className="text-emerald-800 font-semibold block mt-2">Potential Impact: {selectedRec.potentialImpact}</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-1">Recommendation Specification</h4>
                <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {selectedRec.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-1">Analytical Context</h4>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {selectedRec.reasonContext}
                </p>
              </div>

              {feedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{feedback}</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedRec(null);
                    navigateTo('/app/customers');
                  }}
                >
                  View Customer Record
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedRec(null)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedRec.id, 'Sent to Customer')}
                  >
                    Transmit to Customer
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
