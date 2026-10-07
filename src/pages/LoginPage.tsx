import React, { useState } from 'react';
import { Logo } from '../components/brand/Logo';
import { Button } from '../components/common/Button';
import { FinancialBackground } from '../components/home/FinancialBackground';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { navigateTo } = useRouter();

  const [email, setEmail] = useState('analyst@finsight.ai');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success && res.user) {
        // Redirect to role-determined destination
        if (res.user.role === 'ADMIN') navigateTo('/app/admin');
        else if (res.user.role === 'BUSINESS_ANALYST') navigateTo('/app/analyst');
        else if (res.user.role === 'CUSTOMER') navigateTo('/app/customer');
        else if (res.user.role === 'RISK_FRAUD_ANALYST') navigateTo('/app/risk');
        else navigateTo('/app');
      } else {
        setErrorMsg(res.message);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#02231A] text-[#F8FAFC] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Full Financial-Data-Inspired Green & Gold Background */}
      <FinancialBackground />

      {/* Top Header with Branded Logo */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between relative z-20">
        <Logo size="md" theme="dark" onClick={() => navigateTo('/')} />
        <button
          onClick={() => navigateTo('/')}
          className="text-xs font-semibold text-emerald-200 hover:text-[#F3E5AB] transition-colors cursor-pointer"
        >
          ← Return to Home
        </button>
      </div>

      {/* Main Login Card in Deep Emerald & Gold */}
      <div className="w-full max-w-md mx-auto my-8 bg-[#043E30]/95 border border-[#D4AF37]/40 rounded-3xl shadow-2xl p-6 sm:p-8 relative z-20 backdrop-blur-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo size="lg" showText={false} onClick={() => navigateTo('/')} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-xs text-emerald-100/80 mt-1">
            Sign in to continue to FinSight AI Platform
          </p>
        </div>

        {/* Social Providers Buttons */}
        <div className="flex flex-col gap-2.5 mb-6">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-[#022C22]/90 border border-emerald-800/80 hover:border-[#D4AF37] hover:bg-[#022C22] text-xs font-semibold text-emerald-100 transition-all cursor-pointer shadow-xs btn-dynamic"
            onClick={() => setEmail('analyst@finsight.ai')}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-[#022C22]/90 border border-emerald-800/80 hover:border-[#D4AF37] hover:bg-[#022C22] text-xs font-semibold text-emerald-100 transition-all cursor-pointer shadow-xs btn-dynamic"
            onClick={() => setEmail('admin@finsight.ai')}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#F25022" d="M1 1h10v10H1z"/>
              <path fill="#00A4EF" d="M1 13h10v10H1z"/>
              <path fill="#7FBA00" d="M13 1h10v10H13z"/>
              <path fill="#FFB900" d="M13 13h10v10H13z"/>
            </svg>
            <span>Continue with Microsoft</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-emerald-800/80 w-full" />
          <span className="bg-[#043E30] px-3 text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
            OR
          </span>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-xs text-rose-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STRICT RULE: Email & Password ONLY, NO ROLE SELECTOR */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-emerald-100 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#022C22] border border-emerald-700/80 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm text-white placeholder-emerald-400/40 shadow-2xs"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-emerald-100">
                Password
              </label>
              <button
                type="button"
                className="text-[11px] text-[#F3E5AB] hover:text-white font-medium"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#022C22] border border-emerald-700/80 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm text-white placeholder-emerald-400/40 shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-emerald-100">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-[#064E3B] focus:ring-[#D4AF37] bg-[#022C22] border-emerald-700"
              />
              <span>Remember me</span>
            </label>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="md"
            isLoading={loading}
            icon={<ArrowRight className="w-4 h-4 text-[#022C22]" />}
            iconPosition="right"
            className="w-full mt-2"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-emerald-100">
          Don't have an account?{' '}
          <button
            onClick={() => navigateTo('/signup')}
            className="font-bold text-[#F3E5AB] hover:text-white cursor-pointer"
          >
            Sign Up
          </button>
        </div>

        {/* Demo Quick-Fill Pill Helper for Testing */}
        <div className="mt-6 pt-4 border-t border-emerald-800/80">
          <div className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider mb-2 text-center">
            Demo Evaluator Quick-Fill Credentials
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => {
                setEmail('admin@finsight.ai');
                setPassword('demo1234');
              }}
              className="p-1.5 rounded-lg bg-[#022C22]/90 hover:bg-[#022C22] hover:border-[#D4AF37] border border-emerald-800 text-left text-emerald-100 transition-colors cursor-pointer"
            >
              <span className="font-semibold block text-white">Admin</span>
              <span className="text-[10px] text-emerald-400">admin@finsight.ai</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('analyst@finsight.ai');
                setPassword('demo1234');
              }}
              className="p-1.5 rounded-lg bg-[#022C22]/90 hover:bg-[#022C22] hover:border-[#D4AF37] border border-emerald-800 text-left text-emerald-100 transition-colors cursor-pointer"
            >
              <span className="font-semibold block text-[#F3E5AB]">Business Analyst</span>
              <span className="text-[10px] text-emerald-400">analyst@finsight.ai</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('customer@finsight.ai');
                setPassword('demo1234');
              }}
              className="p-1.5 rounded-lg bg-[#022C22]/90 hover:bg-[#022C22] hover:border-[#D4AF37] border border-emerald-800 text-left text-emerald-100 transition-colors cursor-pointer"
            >
              <span className="font-semibold block text-white">Customer</span>
              <span className="text-[10px] text-emerald-400">customer@finsight.ai</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('risk@finsight.ai');
                setPassword('demo1234');
              }}
              className="p-1.5 rounded-lg bg-[#022C22]/90 hover:bg-[#022C22] hover:border-rose-400 border border-emerald-800 text-left text-emerald-100 transition-colors cursor-pointer"
            >
              <span className="font-semibold block text-rose-300">Risk Analyst</span>
              <span className="text-[10px] text-emerald-400">risk@finsight.ai</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-emerald-400/80 relative z-20">
        Phase 0 Authentication UI Foundation • Role determined dynamically by platform governance
      </div>
    </div>
  );
};
