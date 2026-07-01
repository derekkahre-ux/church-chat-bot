import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Send,
  Church,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  RefreshCw,
  Heart,
  Users,
  BookOpen,
  HandHeart,
  type LucideIcon,
} from 'lucide-react';
import { supabase, type ChatMessage, type ChatRole } from './lib/supabase';
import { getBotResponse } from './lib/chatEngine';
import { CHURCH_INFO, SUGGESTED_QUESTIONS } from './lib/knowledge';

interface DisplayMessage {
  id: string;
  role: ChatRole;
  content: string;
  created_at: string;
  pending?: boolean;
}

const WELCOME_MESSAGE: DisplayMessage = {
  id: 'welcome',
  role: 'bot',
  content:
    "Welcome to Grace Community Church! I'm here to answer your questions about our services, programs, and how we can support you. How can I help you today?",
  created_at: new Date().toISOString(),
};

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function App() {
  const [messages, setMessages] = useState<DisplayMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      try {
        const { data, error: queryError } = await supabase
          .from('chat_messages')
          .select('id, role, content, created_at')
          .order('created_at', { ascending: true })
          .limit(50);

        if (cancelled) return;

        if (queryError) throw queryError;

        if (data && data.length > 0) {
          const history: DisplayMessage[] = (data as ChatMessage[]).map((m) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            created_at: m.created_at,
          }));
          setMessages([WELCOME_MESSAGE, ...history]);
        }
      } catch (err) {
        console.error('Failed to load chat history:', err);
        if (!cancelled) setError('Unable to load chat history. New messages will still work.');
      } finally {
        if (!cancelled) setLoadingHistory(false);
      }
    }

    loadHistory();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistMessage = useCallback(
    async (role: ChatRole, content: string): Promise<string | null> => {
      try {
        const { data, error: insertError } = await supabase
          .from('chat_messages')
          .insert({ role, content })
          .select('id, created_at')
          .single();

        if (insertError) throw insertError;
        return data?.id ?? null;
      } catch (err) {
        console.error('Failed to persist message:', err);
        return null;
      }
    },
    [],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMessage: DisplayMessage = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content: trimmed,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);
      setError(null);

      const response = getBotResponse(trimmed);

      const typingDelay = Math.min(1200, 500 + response.answer.length * 4);
      await new Promise((resolve) => setTimeout(resolve, typingDelay));

      const botId = `temp-bot-${Date.now()}`;
      const botMessage: DisplayMessage = {
        id: botId,
        role: 'bot',
        content: response.answer,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      persistMessage('user', trimmed);
      persistMessage('bot', response.answer);
    },
    [isTyping, persistMessage],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (question: string) => {
    sendMessage(question);
    inputRef.current?.focus();
  };

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput('');
    setError(null);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gradient-to-r from-stone-800 to-stone-900 text-stone-50 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-100/10 ring-1 ring-amber-200/30 flex items-center justify-center shrink-0">
              <Church className="w-6 h-6 text-amber-300" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight truncate">
                {CHURCH_INFO.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 truncate">
                {CHURCH_INFO.tagline}
              </p>
            </div>
          </div>
          <button
            onClick={handleClearChat}
            className="hidden sm:inline-flex items-center gap-2 text-sm text-stone-300 hover:text-amber-300 transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
          >
            <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
            New chat
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 flex-1">
          {/* Chat panel */}
          <section className="flex flex-col bg-white rounded-2xl shadow-sm ring-1 ring-stone-200/70 overflow-hidden min-h-[60vh] lg:min-h-[calc(100vh-220px)]">
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5 bg-stone-50/50"
            >
              {loadingHistory && (
                <div className="flex items-center justify-center gap-2 text-stone-400 text-sm py-8">
                  <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={1.75} />
                  Loading conversation…
                </div>
              )}

              {!loadingHistory &&
                messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}

              {isTyping && <TypingIndicator />}
            </div>

            {/* Input */}
            <div className="border-t border-stone-200 bg-white px-4 sm:px-6 py-4">
              {error && (
                <p className="text-xs text-amber-700 bg-amber-50 ring-1 ring-amber-200 rounded-lg px-3 py-2 mb-3">
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about service times, location, prayer requests…"
                    className="w-full rounded-full border border-stone-300 bg-stone-50 px-5 py-3 pr-12 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition"
                    disabled={isTyping}
                    aria-label="Type your question"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md hover:shadow-lg hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </form>
              <p className="text-[11px] text-stone-400 mt-2 text-center">
                This assistant can help with common questions. For urgent pastoral care, call{' '}
                <span className="font-medium text-stone-500">(319) 555-0142</span>.
              </p>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Quick questions */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-stone-200/70 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-500" strokeWidth={1.75} />
                <h2 className="text-sm font-semibold text-stone-700">Quick questions</h2>
              </div>
              <div className="flex flex-col gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestion(q)}
                    disabled={isTyping}
                    className="text-left text-sm text-stone-600 px-3 py-2 rounded-lg bg-stone-50 hover:bg-amber-50 hover:text-amber-800 ring-1 ring-stone-200/60 hover:ring-amber-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Church info card */}
            <div className="bg-gradient-to-br from-stone-800 to-stone-900 text-stone-100 rounded-2xl shadow-md p-5">
              <h2 className="text-sm font-semibold text-amber-300 mb-4 flex items-center gap-2">
                <Church className="w-4 h-4" strokeWidth={1.75} />
                Visit us
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-300/80 mt-0.5 shrink-0" strokeWidth={1.75} />
                  <span className="text-stone-200">{CHURCH_INFO.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-300/80 mt-0.5 shrink-0" strokeWidth={1.75} />
                  <span className="text-stone-200">
                    Sundays 9:00 & 11:00 AM
                    <br />
                    Wednesdays 7:00 PM
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-300/80 mt-0.5 shrink-0" strokeWidth={1.75} />
                  <a
                    href={`tel:${CHURCH_INFO.phone.replace(/[^0-9]/g, '')}`}
                    className="text-stone-200 hover:text-amber-300 transition"
                  >
                    {CHURCH_INFO.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-300/80 mt-0.5 shrink-0" strokeWidth={1.75} />
                  <a
                    href={`mailto:${CHURCH_INFO.email}`}
                    className="text-stone-200 hover:text-amber-300 transition break-all"
                  >
                    {CHURCH_INFO.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Ministry highlights */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-stone-200/70 p-5">
              <h2 className="text-sm font-semibold text-stone-700 mb-3">Our ministries</h2>
              <div className="grid grid-cols-2 gap-3">
                <MinistryTile icon={Users} label="Youth & Kids" />
                <MinistryTile icon={BookOpen} label="Bible Studies" />
                <MinistryTile icon={HandHeart} label="Prayer Team" />
                <MinistryTile icon={Heart} label="Outreach" />
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-stone-400">
          {CHURCH_INFO.name} &middot; {CHURCH_INFO.tagline}
        </div>
      </footer>
    </div>
  );
}

function MessageBubble({ message }: { message: DisplayMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ring-1 ${
          isUser
            ? 'bg-stone-700 ring-stone-600'
            : 'bg-gradient-to-br from-amber-400 to-amber-600 ring-amber-300/50'
        }`}
      >
        {isUser ? (
          <span className="text-xs font-semibold text-white">You</span>
        ) : (
          <Church className="w-5 h-5 text-white" strokeWidth={1.75} />
        )}
      </div>
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
            isUser
              ? 'bg-stone-700 text-stone-50 rounded-tr-sm'
              : 'bg-white text-stone-700 ring-1 ring-stone-200 rounded-tl-sm shadow-sm'
          }`}
        >
          {message.content}
        </div>
        <span className="text-[10px] text-stone-400 mt-1 px-1">
          {formatTime(message.created_at)}
        </span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 flex-row">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 ring-1 ring-amber-300/50">
        <Church className="w-5 h-5 text-white" strokeWidth={1.75} />
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3.5 rounded-2xl rounded-tl-sm bg-white ring-1 ring-stone-200 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

function MinistryTile({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-stone-50 ring-1 ring-stone-200/60 text-center">
      <Icon className="w-5 h-5 text-amber-600" strokeWidth={1.75} />
      <span className="text-xs font-medium text-stone-600">{label}</span>
    </div>
  );
}

export default App;
