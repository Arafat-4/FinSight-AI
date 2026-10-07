import React, { useState } from 'react';
import { Logo } from '../components/brand/Logo';
import { Button } from '../components/common/Button';
import { FinancialBackground } from '../components/home/FinancialBackground';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Info } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const { navigateTo } = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your credentials.');
      return;
    }
    if (!agreedToTerms) {
      setErrorMsg('Please accept the Terms of Service to proceed.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = signup(name, email, password);
      setLoading(false);
      if (res.success) {
        // New user has UNASSIGNED status - redirect to /app (which renders the Pending Role Assignment page)
        navigateTo('/app');
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
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

      {/* Main Signup Card in Deep Emerald & Gold */}
      <div className="w-full max-w-md mx-auto my-8 bg-[#043E30]/95 border border-[#D4AF37]/40 rounded-3xl shadow-2xl p-6 sm:p-8 relative z-20 backdrop-blur-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo size="lg" showText={false} onClick={() => navigateTo('/')} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Your Account</h1>
          <p className="text-xs text-emerald-100/80 mt-1">
            Join FinSight AI and unlock intelligent financial insights
          </p>
        </div>

        {/* Role Governance Information Notice */}
        <div className="mb-5 p-3 rounded-xl bg-[#064E3B]/70 border border-emerald-600/50 flex items-start gap-2 text-xs text-emerald-100">
          <Info className="w-4 h-4 text-[#F3E5AB] shrink-0 mt-0.5" />
          <span>
            New accounts are provisioned with <strong>UNASSIGNED</strong> status. The System Administrator assigns role governance post-verification.
          </span>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-xs text-rose-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Signup Form: STRICTLY NO ROLE SELECTOR */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-emerald-100 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#022C22] border border-emerald-700/80 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm text-white placeholder-emerald-400/40 shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-100 mb-1">
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
            <label className="block text-xs font-semibold text-emerald-100 mb-1">
              Create password
            </label>
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
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-100 mb-1">
              Confirm password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#022C22] border border-emerald-700/80 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-xs sm:text-sm text-white placeholder-emerald-400/40 shadow-2xs"
              />
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-emerald-100 leading-snug">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="rounded text-[#064E3B] focus:ring-[#D4AF37] bg-[#022C22] border-emerald-700 mt-0.5"
              />
              <span>
                I agree to the <span className="font-semibold text-[#F3E5AB]">Terms of Service</span> and{' '}
                <span className="font-semibold text-[#F3E5AB]">Privacy Policy</span>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="md"
            isLoading={loading}
            icon={<ArrowRight className="w-4 h-4 text-[#022C22]" />}
            iconPosition="right"
            className="w-full mt-3"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-emerald-100">
          Already have an account?{' '}
          <button
            onClick={() => navigateTo('/login')}
            className="font-bold text-[#F3E5AB] hover:text-white cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-emerald-400/80 relative z-20">
        Phase 0 Security Foundation • Enterprise Role Governance Enforced
      </div>
    </div>
  );
};
