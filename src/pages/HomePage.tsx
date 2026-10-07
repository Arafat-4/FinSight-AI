import React, { useState } from 'react';
import { Logo } from '../components/brand/Logo';
import { Button } from '../components/common/Button';
import { FinancialBackground } from '../components/home/FinancialBackground';
import { TrendChart } from '../components/charts/TrendChart';
import { DonutChart } from '../components/charts/DonutChart';
import { SpendingBarChart } from '../components/charts/SpendingBarChart';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
  AlertTriangle,
  CreditCard,
  PieChart,
  Bot,
  Layers,
  ChevronRight,
  Database,
  Lock,
  Compass,
  Cpu,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  FileText,
  ShieldAlert,
  ArrowDown,
  Workflow,
  BarChart3,
  Globe,
  Sliders,
  DollarSign
} from 'lucide-react';
import {
  DASHBOARD_KPIS,
  SPENDING_CATEGORIES,
  CUSTOMER_SEGMENTS,
  FRAUD_RISK_DISTRIBUTION,
  TRANSACTION_TREND_DATA,
  MOCK_RECOMMENDATIONS
} from '../data/mockData';
import { formatINR } from '../services/dataService';

export const HomePage: React.FC = () => {
  const { navigateTo } = useRouter();
  const { isAuthenticated, currentUser } = useAuth();

  const [heroSearch, setHeroSearch] = useState('');
  const [activeRoleTab, setActiveRoleTab] = useState<'analyst' | 'admin' | 'customer' | 'risk'>('analyst');
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  // Smooth scroll handler function that strictly keeps user on '/'
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHighlightedSection(sectionId);
      setTimeout(() => setHighlightedSection(null), 2500);
    }
  };

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroSearch.trim()) return;

    const term = heroSearch.toLowerCase();
    if (term.includes('fraud') || term.includes('risk') || term.includes('alert')) {
      scrollToSection('risk-fraud');
    } else if (term.includes('customer') || term.includes('segment') || term.includes('user')) {
      scrollToSection('customer-insights');
    } else if (term.includes('recommend') || term.includes('offer') || term.includes('suggest')) {
      scrollToSection('recommendations');
    } else if (term.includes('assistant') || term.includes('ask') || term.includes('chat') || term.includes('ai')) {
      scrollToSection('ai-assistant');
    } else if (term.includes('role') || term.includes('admin') || term.includes('analyst')) {
      scrollToSection('roles');
    } else if (term.includes('how') || term.includes('flow') || term.includes('pipeline')) {
      scrollToSection('how-it-works');
    } else if (term.includes('analytic') || term.includes('chart') || term.includes('trend')) {
      scrollToSection('analytics');
    } else {
      scrollToSection('what-is-finsight');
    }
  };

  return (
    <div className="min-h-screen bg-[#02231A] text-[#F8FAFC] flex flex-col relative selection:bg-[#D4AF37] selection:text-[#02231A]">
      {/* Visual Rich Background matching Login page environment */}
      <FinancialBackground isFixed={true} />

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 border-b border-emerald-900/60 bg-[#02231A]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand Name (Navigates to /) */}
          <div className="flex items-center">
            <Logo size="lg" theme="dark" onClick={() => scrollToSection('hero')} />
          </div>

          {/* Clean Informational Navigation Links (Smooth scroll to Home sections, NO POPUPS) */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold tracking-wide text-emerald-100/90">
            <button
              onClick={() => scrollToSection('what-is-finsight')}
              className="hover:text-[#F3E5AB] transition-colors cursor-pointer py-1"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-[#F3E5AB] transition-colors cursor-pointer py-1"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-[#F3E5AB] transition-colors cursor-pointer py-1"
            >
              Platform Features
            </button>
            <button
              onClick={() => scrollToSection('roles')}
              className="hover:text-[#F3E5AB] transition-colors cursor-pointer py-1"
            >
              Roles
            </button>
            <button
              onClick={() => scrollToSection('analytics')}
              className="hover:text-[#F3E5AB] transition-colors cursor-pointer py-1"
            >
              Analytics
            </button>
            <button
              onClick={() => scrollToSection('risk-fraud')}
              className="hover:text-[#F3E5AB] transition-colors cursor-pointer py-1"
            >
              Risk & Fraud
            </button>
            <button
              onClick={() => scrollToSection('architecture')}
              className="hover:text-[#F3E5AB] transition-colors cursor-pointer py-1"
            >
              Architecture
            </button>
          </nav>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/login')}
              className="px-3.5 py-2 text-xs font-semibold text-emerald-100 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            {/* CTA explicitly changed to "Go to Dashboard" navigating to /app */}
            <Button
              variant="gold"
              size="sm"
              icon={<ArrowRight className="w-4 h-4 text-[#022C22]" />}
              iconPosition="right"
              onClick={() => navigateTo('/app')}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 1 — HERO SECTION (Inspired by reference Hero in Emerald & Gold)
         ========================================================================= */}
      <section
        id="hero"
        className="relative z-20 pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Editorial Pill Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#043E30]/80 border border-emerald-600/50 text-xs font-semibold text-[#F3E5AB] shadow-xs mb-6 backdrop-blur-xs">
          <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Smarter Insights. Brighter Financial Futures.</span>
        </div>

        {/* Main Branding & Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl text-balance">
          Turn Financial Data Into{' '}
          <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
            Intelligent Decisions
          </span>
        </h1>

        {/* Supporting Message */}
        <p className="mt-6 text-base sm:text-lg text-emerald-100/90 max-w-2xl font-normal leading-relaxed text-balance">
          FinSight AI transforms raw financial, transaction, and customer data into meaningful business insights,
          multi-layered risk intelligence, and personalized recommendations for a smarter financial future.
        </p>

        {/* Hero Interactive Search Bar (Scrolls smoothly to matching sections) */}
        <div className="mt-8 w-full max-w-2xl">
          <form
            onSubmit={handleHeroSearchSubmit}
            className="relative flex items-center bg-[#043E30]/90 p-1.5 rounded-2xl border border-emerald-700/70 focus-within:border-[#D4AF37] shadow-2xl backdrop-blur-md transition-all"
          >
            <Search className="w-5 h-5 text-[#F3E5AB] ml-3.5 shrink-0" />
            <input
              type="text"
              placeholder="Search customers, transactions, fraud, analytics, recommendations..."
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              className="w-full bg-transparent px-3.5 py-3 text-sm text-white placeholder-emerald-200/50 focus:outline-none"
            />
            <Button
              type="submit"
              variant="gold"
              size="md"
              icon={<Sparkles className="w-4 h-4 text-[#022C22]" />}
              iconPosition="right"
              className="shrink-0"
            >
              Ask FinSight
            </Button>
          </form>

          {/* Informational Quick Tags (Smooth scroll to sections on /, NO POPUPS) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { label: 'High value customers', targetId: 'customer-insights' },
              { label: 'Fraud risk analysis', targetId: 'risk-fraud' },
              { label: 'Customer segmentation', targetId: 'customer-insights' },
              { label: 'Spending pattern analysis', targetId: 'analytics' },
              { label: 'How it works', targetId: 'how-it-works' }
            ].map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => scrollToSection(tag.targetId)}
                className="px-3 py-1.5 rounded-xl bg-[#043E30]/70 border border-emerald-800/80 text-xs font-medium text-emerald-200 hover:text-white hover:border-[#D4AF37] hover:bg-[#064E3B] transition-all cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary CTA (Go to Dashboard) and Secondary CTA (Scrolls on page) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="gold"
            size="lg"
            icon={<ArrowRight className="w-5 h-5 text-[#022C22]" />}
            iconPosition="right"
            onClick={() => navigateTo('/app')}
          >
            Go to Dashboard
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={<ArrowDown className="w-4 h-4 text-[#D4AF37]" />}
            iconPosition="right"
            onClick={() => scrollToSection('what-is-finsight')}
          >
            Explore Platform Story
          </Button>
        </div>

        {/* Hero Interactive Metric Cards (Smooth scroll to sections, NO POPUPS) */}
        <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3.5 text-left">
          <div
            onClick={() => scrollToSection('analytics')}
            className="p-4.5 rounded-2xl bg-[#043E30]/85 border border-emerald-800/80 hover:border-[#D4AF37] transition-all cursor-pointer card-dynamic shadow-sm"
          >
            <span className="text-[11px] text-emerald-300 font-semibold block uppercase tracking-wider">
              Monthly Transactions
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block tabular-nums">
              30,000
            </span>
            <span className="text-[11px] text-[#F3E5AB] font-medium mt-0.5 block">↑ 12.5% vs last month</span>
          </div>

          <div
            onClick={() => scrollToSection('analytics')}
            className="p-4.5 rounded-2xl bg-[#043E30]/85 border border-emerald-800/80 hover:border-[#D4AF37] transition-all cursor-pointer card-dynamic shadow-sm"
          >
            <span className="text-[11px] text-emerald-300 font-semibold block uppercase tracking-wider">
              Total Volume
            </span>
            <span className="text-2xl font-bold font-mono text-[#D4AF37] mt-1 block tabular-nums">
              ₹ 12,45,230
            </span>
            <span className="text-[11px] text-emerald-400 font-medium mt-0.5 block">↑ 8.3% vs last month</span>
          </div>

          <div
            onClick={() => scrollToSection('customer-insights')}
            className="p-4.5 rounded-2xl bg-[#043E30]/85 border border-emerald-800/80 hover:border-[#D4AF37] transition-all cursor-pointer card-dynamic shadow-sm"
          >
            <span className="text-[11px] text-emerald-300 font-semibold block uppercase tracking-wider">
              Customer Profiles
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block tabular-nums">
              8,452
            </span>
            <span className="text-[11px] text-[#F3E5AB] font-medium mt-0.5 block">↑ 10.1% vs last month</span>
          </div>

          <div
            onClick={() => scrollToSection('risk-fraud')}
            className="p-4.5 rounded-2xl bg-[#043E30]/85 border border-emerald-800/80 hover:border-rose-400 transition-all cursor-pointer card-dynamic shadow-sm"
          >
            <span className="text-[11px] text-rose-300 font-semibold block uppercase tracking-wider">
              Fraud Alerts Flagged
            </span>
            <span className="text-2xl font-bold font-mono text-rose-400 mt-1 block tabular-nums">
              238
            </span>
            <span className="text-[11px] text-rose-300/80 font-medium mt-0.5 block">↑ 2.4% under review</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — WHAT IS FINSIGHT AI?
         ========================================================================= */}
      <section
        id="what-is-finsight"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A]/85 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Section 02 // Overview
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              What is FinSight AI?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              <strong className="text-white">FinSight AI is an AI-powered financial customer insights and recommendation platform</strong> designed
              to transform complex financial and transaction streams into actionable business intelligence.
              It eliminates data fragmentation across banking channels by connecting customer behavior, transaction forensics, risk monitoring,
              and smart recommendations into one unified intelligence console.
            </p>
          </div>

          {/* 9 Major Intelligence Areas Visually Presented */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Customer Intelligence',
                desc: '360° behavioral segmentation, spending frequency, RFM lifecycle status, and customer tenure profiling.',
                icon: Users,
                color: 'text-[#F3E5AB] bg-[#D4AF37]/15 border-[#D4AF37]/30'
              },
              {
                title: 'Transaction Intelligence',
                desc: 'Multi-channel auditing across UPI, Cards, Net Banking, and ATM networks with temporal hour-level analytics.',
                icon: CreditCard,
                color: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30'
              },
              {
                title: 'Financial Analytics',
                desc: 'Consolidated cash burn, category allocation, merchant payment breakdowns, and seasonal spending curves.',
                icon: BarChart3,
                color: 'text-[#D4AF37] bg-amber-500/15 border-amber-500/30'
              },
              {
                title: 'Risk Intelligence',
                desc: 'Algorithmic credit risk scoring (0-100), default probability forecasting, and customer risk tier categorization.',
                icon: ShieldAlert,
                color: 'text-amber-400 bg-amber-500/15 border-amber-500/30'
              },
              {
                title: 'Fraud Intelligence',
                desc: 'Real-time anomaly surveillance for geographic terminal mismatches, off-hours spikes, and foreign wire anomalies.',
                icon: AlertTriangle,
                color: 'text-rose-400 bg-rose-500/15 border-rose-500/30'
              },
              {
                title: 'AI Recommendations',
                desc: 'Personalized liquidity auto-sweeps, high-yield vaults, card upgrades, and velocity protective caps (Phase 0 synthetic).',
                icon: Sparkles,
                color: 'text-[#F3E5AB] bg-[#D4AF37]/15 border-[#D4AF37]/30'
              },
              {
                title: 'Customer Service Cases',
                desc: 'Formal forensic dispute tracking, anomaly inquiry routing, evidence preservation, and analyst resolution states.',
                icon: FileSpreadsheet,
                color: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30'
              },
              {
                title: 'FinSight AI Assistant',
                desc: 'Conversational natural language interface shell for rapid financial querying and risk explanation (UI Foundation).',
                icon: Bot,
                color: 'text-[#D4AF37] bg-amber-500/15 border-amber-500/30'
              },
              {
                title: 'Document Intelligence',
                desc: 'Centralized repository and metadata taxonomy for KYC identity proofs, compliance guidelines, and audit logs.',
                icon: FileText,
                color: 'text-emerald-200 bg-emerald-800/40 border-emerald-700/40'
              }
            ].map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="p-5.5 rounded-2xl bg-[#043E30]/75 border border-emerald-800/80 hover:border-[#D4AF37]/80 hover:bg-[#064E3B] transition-all card-dynamic shadow-sm group"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${area.color} mb-3.5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#F3E5AB] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — THE PROBLEM WE SOLVE (Before vs After Comparison)
         ========================================================================= */}
      <section
        id="problem-solved"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Section 03 // Problem & Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Transforming Fragmented Data into Cohesive Intelligence
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base leading-relaxed">
              Traditional financial institutions struggle with siloed transaction logs, delayed anomaly detection,
              and generic customer interactions. FinSight AI bridges this gap with an all-in-one intelligence pipeline.
            </p>
          </div>

          {/* Visual Before vs After Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before Card */}
            <div className="p-7 rounded-3xl bg-[#043E30]/50 border border-rose-500/30 shadow-lg">
              <div className="flex items-center gap-2.5 text-rose-400 font-bold text-sm uppercase tracking-wider mb-4">
                <XCircle className="w-5 h-5 text-rose-400" />
                <span>Traditional Financial Operations (Before)</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Fragmented, Manual & Reactive
              </h3>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-[#02231A]/80 border border-slate-700 flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Massive Disconnected Data:</strong> Millions of transactions siloed across disparate payment gateway tables.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#02231A]/80 border border-slate-700 flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Manual & Delayed Forensics:</strong> Suspicious cross-border transactions spotted days after capital flight occurs.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#02231A]/80 border border-slate-700 flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Zero Personalized Context:</strong> Blind generic offers sent to customers regardless of actual liquidity or credit standing.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#02231A]/80 border border-slate-700 flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Slow Executive Decisions:</strong> Analysts spend 80% of time compiling spreadsheets instead of acting on strategic insights.</span>
                </div>
              </div>

              {/* Before Process Flow */}
              <div className="mt-6 p-4 rounded-xl bg-[#021D15] border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between text-center overflow-x-auto gap-2">
                <span className="text-rose-400">Raw Data</span>
                <span>→</span>
                <span>Manual Analysis</span>
                <span>→</span>
                <span>Delayed Insights</span>
                <span>→</span>
                <span className="text-rose-400">Difficult Decisions</span>
              </div>
            </div>

            {/* With FinSight AI Card (Emerald & Gold) */}
            <div className="p-7 rounded-3xl bg-[#043E30]/90 border border-[#D4AF37]/50 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-[#F3E5AB] font-bold text-sm uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                <span>With FinSight AI (Unified Solution)</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Automated, Predictive & Action-Oriented
              </h3>

              <div className="space-y-3.5 text-xs text-emerald-100">
                <div className="p-3 rounded-xl bg-[#022C22]/80 border border-emerald-600/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Unified Data Model:</strong> 30,000 monthly transactions instantly mapped with customer profiles, credit scores, and devices.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#022C22]/80 border border-emerald-600/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Real-Time Risk Surveillance:</strong> Heuristic anomaly alerts identify off-hours velocity spikes and foreign terminal hops instantly.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#022C22]/80 border border-emerald-600/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Hyper-Personalized Guidance:</strong> Dynamic liquid wealth auto-sweeps (+₹18.5k yield) and tailored premium card upgrades.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#022C22]/80 border border-emerald-600/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Role-Specific Velocity:</strong> Specialized consoles empower Administrators, Business Analysts, Risk Teams, and Customers simultaneously.</span>
                </div>
              </div>

              {/* After Process Flow */}
              <div className="mt-6 p-4 rounded-xl bg-[#022C22] border border-[#D4AF37]/40 text-xs font-mono text-[#F3E5AB] flex items-center justify-between text-center overflow-x-auto gap-2">
                <span className="text-white font-bold">Data</span>
                <span>→</span>
                <span className="text-[#F3E5AB] font-bold">Intelligence</span>
                <span>→</span>
                <span className="text-[#D4AF37] font-bold">Insights</span>
                <span>→</span>
                <span className="text-emerald-300 font-bold">Recommendations</span>
                <span>→</span>
                <span className="text-[#022C22] font-bold bg-[#D4AF37] px-2 py-0.5 rounded">Decisions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — HOW FINSIGHT AI WORKS (Process Workflow)
         ========================================================================= */}
      <section
        id="how-it-works"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A]/85 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Section 04 // Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              How FinSight AI Works
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base leading-relaxed">
              From ingest to action: see how raw financial inputs travel through validation, behavioral modeling,
              and risk scoring to power high-confidence decision making.
            </p>
          </div>

          {/* 7-Step Visual Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
            {[
              {
                step: '01',
                title: 'Financial Data',
                desc: 'Raw multi-channel inputs: UPI, Credit Cards, Net Banking, POS & Wallets.',
                icon: Database
              },
              {
                step: '02',
                title: 'Cleaning & Validation',
                desc: 'De-duplication, time normalization, foreign currency conversion, schema typing.',
                icon: Sliders
              },
              {
                step: '03',
                title: 'Centralized Store',
                desc: 'Structured relational entities linking Customer, Transaction, Device & Geographies.',
                icon: Layers
              },
              {
                step: '04',
                title: 'Customer & Txn Analysis',
                desc: 'RFM segmentation, velocity profiling, spending category aggregation.',
                icon: BarChart3
              },
              {
                step: '05',
                title: 'Risk & Fraud Intel',
                desc: 'Anomaly scoring (0-100), off-hours heuristics, velocity caps, alert triage.',
                icon: ShieldAlert
              },
              {
                step: '06',
                title: 'Insights & Recs',
                desc: 'Personalized liquid auto-sweeps, risk mitigations, cohort opportunities.',
                icon: Sparkles
              },
              {
                step: '07',
                title: 'AI Decision Making',
                desc: 'Role-based dashboards, case workflows, and conversational assistant copilots.',
                icon: Bot
              }
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-4.5 rounded-2xl bg-[#043E30]/85 border border-emerald-800/80 hover:border-[#D4AF37] transition-all flex flex-col justify-between card-dynamic group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-[#F3E5AB] bg-[#D4AF37]/15 px-2 py-0.5 rounded">
                        {s.step}
                      </span>
                      <Icon className="w-4 h-4 text-emerald-300 group-hover:text-[#D4AF37] transition-colors" />
                    </div>
                    <h3 className="text-xs font-bold text-white group-hover:text-[#F3E5AB] transition-colors leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-[11px] text-emerald-100/80 mt-2 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-emerald-800/60 text-[10px] font-mono text-emerald-400">
                    Phase {idx < 4 ? '0/1 Core' : '0 Synthetic'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — CORE PLATFORM FEATURES (Detailed 9 Capabilities)
         ========================================================================= */}
      <section
        id="features"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Section 05 // Core Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Enterprise Feature Matrix
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base leading-relaxed">
              Explore the 9 foundational capabilities engineered into FinSight AI for total operational visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '1. Customer Intelligence',
                badge: 'Behavioral',
                bullets: [
                  'Dynamic profile tracking with 8,452 simulated customer profiles',
                  'RFM behavioral cohort distribution (High Value, Potential, At Risk)',
                  'Average transaction value & liquid account balance correlation',
                  'Payment method loyalty and demographic age-bracket analysis'
                ],
                targetId: 'customer-insights'
              },
              {
                title: '2. Transaction Intelligence',
                badge: 'High Frequency',
                bullets: [
                  'Real-time transaction tracking across UPI, Cards, Net Banking & POS',
                  'Dimensional time-of-day and hour-level transaction density graphs',
                  'Foreign terminal flags with geographic cross-border detection',
                  'Complete tabular ledger with multi-attribute filtering'
                ],
                targetId: 'analytics'
              },
              {
                title: '3. Financial Analytics',
                badge: 'Aggregated',
                bullets: [
                  '₹ 12,45,230 monthly managed transaction volume monitoring',
                  'Category breakdown: Shopping (28%), Food (18%), Travel (15%)',
                  'Tenure-based account growth and monthly volume curves',
                  'Real-time cash retention metrics vs monthly burn velocity'
                ],
                targetId: 'analytics'
              },
              {
                title: '4. Risk Intelligence',
                badge: 'Proactive',
                bullets: [
                  'Credit score degradation alerts and debt-to-income profiling',
                  'Calculated customer risk score ranking from 0 to 100',
                  '4-Tier risk classification (Normal, Low, Medium, High Risk)',
                  'At-risk account identification before default or chargeback events'
                ],
                targetId: 'risk-fraud'
              },
              {
                title: '5. Fraud Intelligence',
                badge: 'Surveillance',
                bullets: [
                  '238 flagged transaction records with anomaly explanations',
                  'Geographic IP vs Terminal mismatch detection (Dubai vs Ahmedabad)',
                  'Off-hours velocity spike heuristics (e.g. 02:44 AM burst transactions)',
                  'Forensic audit trails linking suspect devices to customer cases'
                ],
                targetId: 'risk-fraud'
              },
              {
                title: '6. AI Recommendations',
                badge: 'Synthetic (Phase 0)',
                bullets: [
                  'Liquid wealth auto-sweep into high-yield funds (+₹ 18,500 yield)',
                  'Infinite Travel Card upgrades for high-velocity airline spenders',
                  'Dynamic foreign velocity capping for suspect customer accounts',
                  'Micro-savings automated smart vaults for young professional cohorts'
                ],
                targetId: 'recommendations'
              },
              {
                title: '7. Customer Cases',
                badge: 'Workflow',
                bullets: [
                  'Formal case assignment and investigator queue management',
                  'Priority severity matrix (Critical, High, Medium, Low)',
                  'Amount under review tracking with forensic finding notes',
                  'Interactive status transitions: Open → In Review → Resolved'
                ],
                targetId: 'platform-preview'
              },
              {
                title: '8. FinSight AI Assistant',
                badge: 'UI Foundation',
                bullets: [
                  'Conversational user interface with dual-bubble message layout',
                  'Pre-populated prompts: "Show my spending trends", "High risk customers"',
                  'Enterprise safety boundary indicators preventing hallucinated data',
                  'Architected for seamless Phase 1 LLM & RAG integration'
                ],
                targetId: 'ai-assistant'
              },
              {
                title: '9. Document Intelligence',
                badge: 'UI Placeholder',
                bullets: [
                  'Repository for KYC proofs, AML policies, and forensic CSV logs',
                  'Metadata classification: File Size, Ingestion Date, Tags & Status',
                  'Interactive upload modal dialog for registering compliance docs',
                  'Clean UI placeholder prepared for future vector index pipelines'
                ],
                targetId: 'platform-preview'
              }
            ].map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#043E30]/80 border border-emerald-800/80 hover:border-[#D4AF37] transition-all flex flex-col justify-between card-dynamic shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-[#F3E5AB] bg-[#D4AF37]/15 px-2 py-0.5 rounded">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">{feat.title}</h3>
                  <ul className="space-y-2 text-xs text-emerald-100/90">
                    {feat.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-[#D4AF37] font-bold mt-0.5">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-emerald-800/60">
                  <button
                    type="button"
                    onClick={() => scrollToSection(feat.targetId)}
                    className="text-xs font-semibold text-[#F3E5AB] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Section Details</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — ROLE-BASED PLATFORM (4 Specialized Roles)
         ========================================================================= */}
      <section
        id="roles"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A]/85 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Section 06 // Roles & Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Four Tailored Role Experiences
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base leading-relaxed">
              FinSight AI enforces strict separation of concerns with dedicated dashboards and permissions for each organizational stakeholder.
            </p>
          </div>

          {/* Interactive Role Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#043E30] border border-emerald-800 max-w-2xl">
            {[
              { id: 'analyst' as const, label: 'Business Analyst' },
              { id: 'admin' as const, label: 'Administrator' },
              { id: 'customer' as const, label: 'Retail Customer' },
              { id: 'risk' as const, label: 'Risk & Fraud Analyst' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveRoleTab(tab.id)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeRoleTab === tab.id
                    ? 'bg-gradient-to-r from-[#DFB741] via-[#F3E5AB] to-[#D4AF37] text-[#022C22] shadow-md'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-800/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Role Content Card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-[#043E30]/90 border border-[#D4AF37]/50 shadow-xl">
            {activeRoleTab === 'analyst' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#F3E5AB]">Role 01 // Executive Insight</span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">Business Analyst Perspective</h3>
                    <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
                      Target user: T. Gopi Chand — focused on macro cohorts, revenue trends, and growth indicators.
                    </p>
                  </div>
                  <Button variant="gold" size="sm" onClick={() => navigateTo('/app/analyst')}>
                    Launch Analyst Console
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">Customer Segmentation</span>
                    <p className="text-emerald-100/80">Audits 8,452 profiles divided into High Value (28%), Potential (32%), and At-Risk (10%).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">Transaction Trends</span>
                    <p className="text-emerald-100/80">Inspects combo bar-line telemetry tracking 30,000 transactions and ₹ 12,45,230 monthly spend.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">Recommendation Oversight</span>
                    <p className="text-emerald-100/80">Reviews synthetic cross-sell proposals to boost customer lifetime value and engagement by 18%.</p>
                  </div>
                </div>
              </div>
            )}

            {activeRoleTab === 'admin' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#F3E5AB]">Role 02 // System Governance</span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">System Administrator Perspective</h3>
                    <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
                      Target user: Rajeshwari Varma — single-admin rule governance and user directory access.
                    </p>
                  </div>
                  <Button variant="gold" size="sm" onClick={() => navigateTo('/app/admin')}>
                    Launch Admin Console
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">User & Role Management</span>
                    <p className="text-emerald-100/80">Sole authority to assign UNASSIGNED users into Business Analyst, Customer, or Risk roles.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">Platform Monitoring</span>
                    <p className="text-emerald-100/80">Monitors active users, open case queues, total transaction integrity, and compliance health.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">Single-Admin Enforcer</span>
                    <p className="text-emerald-100/80">Hardcoded security rule preventing regular users from self-promoting or creating extra Admins.</p>
                  </div>
                </div>
              </div>
            )}

            {activeRoleTab === 'customer' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#F3E5AB]">Role 03 // Retail Banking</span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">Retail Customer Perspective</h3>
                    <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
                      Target user: Rahul Sharma (CUST-8452) — simulated private view of personal financial health.
                    </p>
                  </div>
                  <Button variant="gold" size="sm" onClick={() => navigateTo('/app/customer')}>
                    Launch Customer Portal
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">Personal Account Balance</span>
                    <p className="text-emerald-100/80">Displays real-time liquid balance (₹ 4,85,200), credit score (785/900), and 30-day burn rate.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">Private Transaction Ledger</span>
                    <p className="text-emerald-100/80">Isolated transaction history preventing customer from viewing any other user's confidential records.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">Tailored Smart Vaults</span>
                    <p className="text-emerald-100/80">Personalized liquid wealth recommendations to auto-sweep excess savings and earn +₹18,500.</p>
                  </div>
                </div>
              </div>
            )}

            {activeRoleTab === 'risk' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-rose-400">Role 04 // Forensic Defense</span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">Risk & Fraud Analyst Perspective</h3>
                    <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
                      Target user: Karan Mehta — surveillance of suspicious transactions, alerts, and investigations.
                    </p>
                  </div>
                  <Button variant="gold" size="sm" onClick={() => navigateTo('/app/risk')}>
                    Launch Risk Console
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">Anomaly Alert Surveillance</span>
                    <p className="text-emerald-100/80">Inspects high-risk alerts: international IP hops, rapid micro-charges, and off-hour transfers.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">Case Investigation Triage</span>
                    <p className="text-emerald-100/80">Manages formal forensic cases with finding logs, evidence notes, and resolution actions.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#022C22]/80 border border-emerald-800">
                    <span className="font-bold text-white block mb-1">Risk Classification Tiers</span>
                    <p className="text-emerald-100/80">Maintains fraud classification: 238 High Risk, 642 Medium Risk, 1,120 Low Risk, 28,000 Normal.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — ANALYTICS & INSIGHTS (Interactive Synthetic Charts in Green & Gold)
         ========================================================================= */}
      <section
        id="analytics"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Section 07 // Financial Analytics
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Deep Visual Analytics & Metric Streams
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base leading-relaxed">
              Illustrative synthetic data models demonstrating how FinSight AI captures velocity, merchant categories,
              and customer segment distributions.
            </p>
          </div>

          {/* Interactive Chart Row 1: Dual-Axis Trend + Customer Segmentation */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TrendChart data={TRANSACTION_TREND_DATA} title="Monthly Transaction Trend (Count vs Amount)" />
            </div>

            <div>
              <DonutChart
                title="Customer Segmentation Breakdown"
                centerValue="8,452"
                centerLabel="Customers"
                segments={CUSTOMER_SEGMENTS}
              />
            </div>
          </div>

          {/* Interactive Chart Row 2: Top Spending + Fraud Classification */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpendingBarChart
              categories={SPENDING_CATEGORIES}
              title="Top Spending Category Allocations (₹ 12,45,230 Volume)"
            />

            <DonutChart
              title="Fraud Risk Analysis by Severity"
              centerValue="238"
              centerLabel="High Risk"
              segments={FRAUD_RISK_DISTRIBUTION}
              showLegendPercentages={false}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — CUSTOMER INTELLIGENCE (Behavioral Flow)
         ========================================================================= */}
      <section
        id="customer-insights"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A]/85 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Section 08 // Customer Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Holistic Customer Behavioral Architecture
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base leading-relaxed">
              How FinSight AI constructs a 360-degree financial persona from raw digital footprints.
            </p>
          </div>

          {/* Visual Customer Intelligence Flow Diagram */}
          <div className="p-7 rounded-3xl bg-[#043E30]/85 border border-emerald-800 shadow-xl overflow-x-auto">
            <div className="min-w-[700px] flex items-center justify-between gap-3 text-center text-xs">
              {[
                { title: 'Customer Profile', desc: 'Demographics, Age, City, Tenure', step: '1' },
                { title: 'Financial Traits', desc: 'Credit Score, Balance, Daily Burn', step: '2' },
                { title: 'Txn Behavior', desc: 'Frequency, Preferred Gateway', step: '3' },
                { title: 'Spending Pattern', desc: 'Merchant Categories, Off-Hours', step: '4' },
                { title: 'Risk Indicators', desc: 'Velocity Spikes, Device Hops', step: '5' },
                { title: 'Personalized Insight', desc: 'Auto-Sweep, Card Upgrade', step: '6' }
              ].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex-1 p-3.5 rounded-xl bg-[#022C22] border border-[#D4AF37]/35">
                    <span className="text-[10px] font-mono text-[#F3E5AB] font-bold block mb-1">Step {step.step}</span>
                    <span className="font-bold text-white block">{step.title}</span>
                    <span className="text-[11px] text-emerald-200 mt-1 block">{step.desc}</span>
                  </div>
                  {idx < 5 && <span className="text-[#D4AF37] font-bold text-lg shrink-0">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 5 Distinct Customer Cohorts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CUSTOMER_SEGMENTS.map((seg, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#043E30]/75 border border-emerald-800 hover:border-[#D4AF37] transition-all card-dynamic"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-100 uppercase">{seg.name}</span>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                </div>
                <div className="mt-3 text-2xl font-bold font-mono text-white tabular-nums">
                  {seg.percentage}%
                </div>
                <div className="text-xs text-emerald-300 font-mono mt-0.5">
                  {seg.count.toLocaleString()} Profiles
                </div>
                <div className="mt-3 w-full bg-[#022C22] rounded-full h-1.5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${seg.percentage}%`, backgroundColor: seg.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — RISK & FRAUD INTELLIGENCE
         ========================================================================= */}
      <section
        id="risk-fraud"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block">
              Section 09 // Forensic Surveillance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Risk & Fraud Surveillance Center
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base leading-relaxed">
              Consolidating anomaly heuristics, geographic tracking, and formal case investigation.
              <span className="text-emerald-300 block text-xs mt-1">
                (Phase 0 uses simulated synthetic transaction records to establish the forensic dashboard experience without live banking calls.)
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#043E30]/85 border border-rose-500/30">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Geographic Anomaly</h3>
              <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
                Outbound ₹ 1,85,000 transfer from Dubai (UAE) initiated within 4 hours of a domestic POS charge in Ahmedabad for customer Rajesh Patel.
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-rose-400 font-bold">Risk Score: 92/100</span>
                <span className="text-emerald-300">TXN-90413</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#043E30]/85 border border-amber-500/30">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Off-Hours Velocity Spike</h3>
              <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
                ₹ 45,000 transaction at 02:44 AM exceeding 140% of standard 30-day average transaction size for customer Siddharth Verma.
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">Risk Score: 85/100</span>
                <span className="text-emerald-300">TXN-90417</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#043E30]/85 border border-emerald-500/30">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Normal Settlements (99.2%)</h3>
              <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
                28,000 verified clean transactions automatically cleared without triggering manual analyst review, ensuring seamless retail customer checkout.
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-[#F3E5AB] font-bold">Tolerance: Nominal</span>
                <span className="text-emerald-300">28k Records</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — AI-POWERED FUTURE & RECOMMENDATIONS
         ========================================================================= */}
      <section
        id="recommendations"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A]/85 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Section 10 // AI Roadmap & Recommendations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Future AI Capabilities & Recommendation Engine
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base leading-relaxed">
              In Phase 0, all recommendations operate on verified synthetic records. Future platform milestones will incorporate real-time ML scoring, RAG knowledge retrieval, and autonomous agents.
            </p>
          </div>

          {/* Synthetic Recommendations Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_RECOMMENDATIONS.slice(0, 3).map((rec) => (
              <div
                key={rec.id}
                className="p-6 rounded-2xl bg-[#043E30]/85 border border-emerald-800/80 hover:border-[#D4AF37] transition-all flex flex-col justify-between card-dynamic"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold text-[#F3E5AB] bg-[#D4AF37]/15 px-2.5 py-0.5 rounded">
                      {rec.category}
                    </span>
                    <span className="font-mono text-emerald-300">{rec.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2">{rec.title}</h3>
                  <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">{rec.description}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-emerald-800/80 text-xs flex items-center justify-between">
                  <span className="text-emerald-300">Target: {rec.customerName}</span>
                  <span className="font-bold text-[#F3E5AB]">{rec.potentialImpact.split(' ')[0]} Yield</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Roadmap Grid (Disclosed as future capabilities) */}
          <div
            id="ai-assistant"
            className="p-8 rounded-3xl bg-[#043E30]/60 border border-emerald-800 text-xs scroll-mt-20"
          >
            <div className="flex items-center gap-2 text-[#D4AF37] font-bold uppercase tracking-wider mb-3">
              <Cpu className="w-4 h-4" />
              <span>Future AI Roadmap (Phase 1 & Beyond)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#022C22]/85 border border-emerald-800">
                <span className="font-bold text-white block mb-1">Predictive ML Models</span>
                <p className="text-emerald-100/80">Continuous supervised models for transaction fraud classification and default estimation.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#022C22]/85 border border-emerald-800">
                <span className="font-bold text-white block mb-1">RAG Document Ingestion</span>
                <p className="text-emerald-100/80">Vector embeddings pipeline querying compliance guidelines and customer KYC records.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#022C22]/85 border border-emerald-800">
                <span className="font-bold text-white block mb-1">Autonomous AI Agents</span>
                <p className="text-emerald-100/80">Intelligent copilots generating proactive compliance filings and case summaries.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#022C22]/85 border border-emerald-800">
                <span className="font-bold text-white block mb-1">Natural Language Assistant</span>
                <p className="text-emerald-100/80">Full generative conversational assistant answering complex financial queries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — DATA TO INTELLIGENCE (Architecture Diagram)
         ========================================================================= */}
      <section
        id="architecture"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Section 11 // Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Data-to-Intelligence Architecture
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base leading-relaxed">
              Engineered with clean architectural boundaries for effortless backend database migration in Phase 1.
            </p>
          </div>

          {/* Visual Architecture Flow */}
          <div className="p-8 rounded-3xl bg-[#043E30]/75 border border-emerald-800 shadow-xl overflow-x-auto">
            <div className="min-w-[760px] flex items-center justify-between gap-4 text-center text-xs">
              {[
                { title: 'Raw CSV Datasets', tech: 'Banking Export', status: 'Source' },
                { title: 'Python / Jupyter', tech: 'Cleaning & Normalization', status: 'Data Prep' },
                { title: 'MySQL Relational', tech: 'Persistent Schema', status: 'Database' },
                { title: 'Backend / API', tech: 'Node.js / Express', status: 'Service Layer' },
                { title: 'FinSight AI Frontend', tech: 'React 19 / TypeScript', status: 'Active (Phase 0)' },
                { title: 'Actionable Insights', tech: 'Executive Decisions', status: 'Outcome' }
              ].map((node, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex-1 p-4 rounded-2xl bg-[#022C22] border border-emerald-700/80 hover:border-[#D4AF37] transition-colors">
                    <span className="text-[10px] font-mono text-[#F3E5AB] font-bold block">{node.status}</span>
                    <span className="font-bold text-white text-sm mt-1 block">{node.title}</span>
                    <span className="text-[11px] text-emerald-300 mt-1 block">{node.tech}</span>
                  </div>
                  {idx < 5 && <span className="text-[#D4AF37] font-bold text-xl shrink-0">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12 — WHY FINSIGHT AI? (Value Proposition)
         ========================================================================= */}
      <section
        id="why-finsight"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A]/85 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Section 12 // Platform Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Why FinSight AI?
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base leading-relaxed">
              Six foundational pillars driving strategic excellence across financial institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Unified Intelligence',
                desc: 'Consolidates customer, transaction, risk, and recommendation streams into a single source of truth.',
                icon: Layers
              },
              {
                title: 'Data-Driven Decisions',
                desc: 'Replaces intuition with real-time quantitative velocity metrics and category telemetry.',
                icon: BarChart3
              },
              {
                title: 'Deep Customer Insight',
                desc: 'Reveals true behavioral health and spending propensities beyond simplistic balance totals.',
                icon: Users
              },
              {
                title: 'Proactive Risk Awareness',
                desc: 'Surfaces suspicious fraud patterns and credit degradation before liability loss occurs.',
                icon: ShieldAlert
              },
              {
                title: 'Hyper-Personalized Impact',
                desc: 'Unlocks tailored liquidity sweeps and card upgrades that directly benefit customer wealth.',
                icon: Sparkles
              },
              {
                title: 'AI Ready Architecture',
                desc: 'Clean service boundaries engineered for near-zero friction integration with future LLM and ML APIs.',
                icon: Cpu
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#043E30]/85 border border-emerald-800/80 hover:border-[#D4AF37] transition-all card-dynamic shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/35 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13 — PLATFORM PREVIEWS
         ========================================================================= */}
      <section
        id="platform-preview"
        className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-[#02231A] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Section 13 // Interface Previews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Ready-to-Use Platform Experiences
            </h2>
            <p className="mt-3 text-emerald-100/90 text-base leading-relaxed">
              Explore the dedicated views available within the FinSight AI application shell.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Admin Console', route: '/app/admin', desc: 'System governance, user role assignments, and platform health.' },
              { title: 'Analyst Dashboard', route: '/app/analyst', desc: 'Transaction trends, customer segmentation, and spending breakdown.' },
              { title: 'Customer Portal', route: '/app/customer', desc: 'Personal balance overview, private ledger, and tailored recommendations.' },
              { title: 'Risk & Fraud Console', route: '/app/risk', desc: 'Real-time anomaly alerts, high-risk flags, and case investigation.' },
              { title: 'Transaction Ledger', route: '/app/transactions', desc: 'Dimensional transaction table with 18 project attributes and search.' },
              { title: 'Customer Directory', route: '/app/customers', desc: '8,452 simulated customer profiles with RFM segments and credit scores.' },
              { title: 'Forensic Cases', route: '/app/cases', desc: 'Active dispute inquiries with status tracking (Open, In Review, Resolved).' },
              { title: 'AI Assistant', route: '/app/assistant', desc: 'Conversational chat shell with financial prompt templates.' }
            ].map((prev, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#043E30]/85 border border-emerald-800/80 hover:border-[#D4AF37] transition-all flex flex-col justify-between card-dynamic"
              >
                <div>
                  <h3 className="text-sm font-bold text-white">{prev.title}</h3>
                  <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">{prev.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-emerald-300">{prev.route}</span>
                  <button
                    type="button"
                    onClick={() => navigateTo(prev.route as any)}
                    className="text-xs font-semibold text-[#F3E5AB] hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14 — FINAL CALL TO ACTION (CTA: Go to Dashboard -> /app)
         ========================================================================= */}
      <section
        id="final-cta"
        className="relative z-20 py-24 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 bg-gradient-to-b from-[#02231A] to-[#011711] text-center"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#043E30] border border-[#D4AF37]/50 flex items-center justify-center mb-6 shadow-lg">
            <Logo size="lg" showText={false} />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl text-balance">
            Ready to Turn Financial Data Into{' '}
            <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
              Intelligent Decisions
            </span>?
          </h2>

          <p className="mt-4 text-base text-emerald-100/90 max-w-xl text-balance">
            Experience the complete Phase 0 foundation of FinSight AI today with role-based dashboards,
            centralized synthetic mock data, and an enterprise design system.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="gold"
              size="lg"
              icon={<ArrowRight className="w-5 h-5 text-[#022C22]" />}
              iconPosition="right"
              onClick={() => navigateTo('/app')}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigateTo('/login')}
            >
              Sign In to Account
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-20 bg-[#01140E] text-emerald-200/70 border-t border-emerald-900/80 py-10 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" theme="emerald" onClick={() => scrollToSection('hero')} />
            <span className="text-emerald-500 pl-3 border-l border-emerald-800">
              Phase 0 Enterprise Green & Gold Foundation
            </span>
          </div>

          <div className="flex items-center gap-6 font-medium text-emerald-200">
            <button onClick={() => navigateTo('/login')} className="hover:text-white transition-colors cursor-pointer">
              Login
            </button>
            <button onClick={() => navigateTo('/signup')} className="hover:text-white transition-colors cursor-pointer">
              Sign Up
            </button>
            <button onClick={() => navigateTo('/app')} className="hover:text-white transition-colors cursor-pointer">
              Dashboard
            </button>
          </div>

          <div className="font-mono text-emerald-600">
            © 2024 FinSight AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
