import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { Button } from '../../components/common/Button';
import {
  Bot,
  Send,
  Sparkles,
  Info,
  ShieldCheck,
  User,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isDisclaimer?: boolean;
}

export const AssistantPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { navigateTo } = useRouter();

  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      text: 'Hello, I am the FinSight AI Assistant interface. In Phase 0, I serve as a frontend conversational UI foundation. You can test prompt triggers and layout mechanics below.',
      timestamp: 'Just now'
    }
  ]);

  const suggestedPrompts = [
    'Show my spending trends',
    'Which customers are high risk?',
    'Analyze recent transactions',
    'Explain this risk alert',
    'Show customer insights'
  ];

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Phase 0 strict placeholder rule: Do NOT pretend to generate LLM responses
    setTimeout(() => {
      const placeholderMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `[Phase 0 UI Foundation — Coming Soon in Phase 1]\n\nQuery Received: "${promptText}".\n\nPer Phase 0 specifications, the Assistant operates in offline demo UI mode without connecting to live LLM or RAG services. To view real synthetic data for this query, explore the dedicated platform views:\n• For spending trends: Dashboard & Analytics\n• For high-risk accounts: Risk & Fraud Console\n• For customer records: Customer Directory`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDisclaimer: true
      };
      setMessages((prev) => [...prev, placeholderMsg]);
    }, 400);
  };

  return (
    <AppShell pageTitle="FinSight AI Assistant">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                FinSight AI Assistant
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Phase 0 UI Foundation
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Conversational interface shell for financial intelligence queries and alert explanations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Status: Demo Mode</span>
          </div>
        </div>

        {/* Phase 0 Architecture Governance Notice */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Architecture Boundary Notice:</strong> As required by Phase 0, this assistant does not connect to external LLMs or vector databases. All interactions illustrate the conversational layout and prompt readiness for future Phase 1 integration.
          </div>
        </div>

        {/* Chat Interface Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[560px] overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FBF9F5]/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-2xl ${
                  m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    m.sender === 'user'
                      ? 'bg-slate-800 text-white'
                      : 'bg-[#064E3B] text-[#F3E5AB]'
                  }`}
                >
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-[#064E3B] text-white rounded-tr-xs'
                      : m.isDisclaimer
                      ? 'bg-white text-slate-800 border border-amber-200 rounded-tl-xs whitespace-pre-line'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[10px] mt-2 font-mono ${
                      m.sender === 'user' ? 'text-emerald-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Prompts Strip */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Suggested:
            </span>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendPrompt(prompt)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 text-xs text-slate-700 hover:text-emerald-900 transition-all shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(inputVal);
            }}
            className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask FinSight about transactions, customers, or risks..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Send className="w-4 h-4" />}
              iconPosition="right"
              disabled={!inputVal.trim()}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </AppShell>
  );
};
