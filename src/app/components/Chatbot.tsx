'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const chatbotStrings = {
  en: {
    title: 'CarePulse Assistant',
    online: 'Online',
    greeting: 'Hello! I am your CarePulse Assistant. How can I help you today?',
    placeholder: 'Ask anything...',
    error: 'Sorry, I am having trouble connecting right now.',
    network: 'Sorry, a network error occurred.',
  },
  ml: {
    title: 'കെയർപൾസ് അസിസ്റ്റന്റ്',
    online: 'ഓൺ‌ലൈൻ',
    greeting: 'ഹലോ! ഞാൻ നിങ്ങളുടെ കെയർപൾസ് അസിസ്റ്റന്റ് ആണ്. ഇന്ന് ഞാൻ നിങ്ങൾക്ക് എങ്ങനെ സഹായിക്കാം?',
    placeholder: 'എന്തും ചോദിക്കൂ...',
    error: 'ക്ഷമിക്കണം, ഇപ്പോൾ കണക്ഷൻ ശരിയല്ല.',
    network: 'ക്ഷമിക്കണം, ഒരു നെറ്റ്‌വർക്ക് പിശക് സംഭവിച്ചു.',
  }
};

export default function Chatbot() {
  // FIXED: Destructured 'lang' from context and renamed it to 'language' to match the schema
  const { lang: language } = useLanguage();
  const s = chatbotStrings[language as 'en' | 'ml'];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: s.greeting }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update greeting when language changes
  useEffect(() => {
    setMessages(prev => [{ role: 'ai', text: s.greeting }, ...prev.slice(1)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, language }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: s.error }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: s.network }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition-transform hover:scale-110 z-50 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex justify-between items-center text-white">
            <div>
              <h3 className="font-bold">{s.title}</h3>
              <p className="text-xs text-blue-100 flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>{s.online}</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 h-80 overflow-y-auto space-y-4 bg-slate-50 flex flex-col">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none shadow-md' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm text-slate-500 text-xs flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center shadow-inner">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={s.placeholder}
              className="flex-grow px-4 py-2.5 text-sm bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2.5 border border-blue-600 rounded-r-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}