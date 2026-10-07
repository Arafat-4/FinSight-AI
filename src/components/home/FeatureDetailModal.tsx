import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export interface FeatureDetail {
  id: string;
  title: string;
  category: string;
  summary: string;
  keyCapabilities: string[];
  businessValue: string;
  dataEntitiesInvolved: string[];
  metricsSample?: { label: string; value: string }[];
}

interface FeatureDetailModalProps {
  feature: FeatureDetail | null;
  onClose: () => void;
}

export const FeatureDetailModal: React.FC<FeatureDetailModalProps> = ({ feature, onClose }) => {
  const { navigateTo } = useRouter();

  if (!feature) return null;

  return (
    <Modal
      isOpen={!!feature}
      onClose={onClose}
      title={feature.title}
      subtitle={`Category: ${feature.category}`}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Summary Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">Overview</h4>
          <p className="text-slate-700 text-sm mt-1 leading-relaxed">{feature.summary}</p>
        </div>

        {/* Sample Metrics */}
        {feature.metricsSample && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            {feature.metricsSample.map((m, idx) => (
              <div key={idx}>
                <span className="text-[11px] text-slate-500 font-medium block">{m.label}</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums mt-0.5 block">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Key Capabilities */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            Key Platform Capabilities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {feature.keyCapabilities.map((cap, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Business Value */}
        <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs">
          <span className="font-bold text-amber-900 block mb-1">Business Impact</span>
          <p className="text-amber-800 leading-relaxed">{feature.businessValue}</p>
        </div>

        {/* Data Entities Involved */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Centralized Entities Integrated
          </h4>
          <div className="flex flex-wrap gap-2 text-xs text-slate-600">
            {feature.dataEntitiesInvolved.map((entity, idx) => (
              <span
                key={idx}
                className="bg-slate-100 px-2.5 py-1 rounded-md font-mono text-[11px] text-slate-700"
              >
                {entity}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Viewing from FinSight AI Home</span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close Details
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              onClick={() => {
                onClose();
                navigateTo('/app');
              }}
            >
              View in Platform
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
