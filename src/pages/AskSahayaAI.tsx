import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles, User, Bot } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { SITE_URL } from '../seo';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    content: "Hi! I'm the digital assistant for Sahaya Savari F. I can answer questions about his skills, experience, projects, or how to contact him. What would you like to know?"
  }
];

export default function AskSahayaAI() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock AI response logic (would be replaced with actual API call)
    setTimeout(() => {
      const response = generateMockResponse(userMessage.content);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  const generateMockResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('skills') || lowerQuery.includes('tech') || lowerQuery.includes('stack')) {
      return "Sahaya is an AI Engineer and Full Stack Developer focused on Artificial Intelligence, Machine Learning, Python, React, TypeScript, Firebase, Vite, Tailwind CSS, and FastAPI. You can check out his full skills section on the home page!";
    }
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
      return "Sahaya is currently an M.Sc. Artificial Intelligence student at St. Joseph's College (Autonomous), Trichy. He has built production-style portfolio projects including PrepMind AI and Daily Spark, demonstrating Machine Learning, Python Developer, frontend, and backend capabilities.";
    }
    if (lowerQuery.includes('contact') || lowerQuery.includes('hire') || lowerQuery.includes('email')) {
      return "You can reach Sahaya via email at contact@sahayasavari.me, or connect with him on LinkedIn (linkedin.com/in/sahayasavari). He's currently available for internships and entry-level roles!";
    }
    return "That's an interesting question! While I'm just a simple mock AI right now, Sahaya is actively working on connecting me to a real LLM backend. For now, try asking about his skills, experience, or how to contact him!";
  };

  return (
    <>
      <SEOHead 
        title="Ask Sahaya AI | Portfolio Assistant for AI Engineering"
        description="Chat with Sahaya Savari F's portfolio assistant to learn about his AI Engineer skills, Machine Learning projects, Python, React, TypeScript, and Firebase work."
        url={`${SITE_URL}/ai`}
      />
      <div className="pt-32 pb-24 px-6 max-w-screen-md mx-auto min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors font-body text-sm self-start">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        
        <header className="mb-8 border-b border-white/10 pb-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-heading italic tracking-tight">Ask Sahaya AI</h1>
            <p className="text-sm font-body text-white/50">Your interactive guide to my portfolio</p>
          </div>
        </header>

        <div className="flex-1 flex flex-col bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden mb-8 h-[500px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/20' : 'bg-white text-black'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl max-w-[80%] font-body text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white/10 text-white rounded-tr-none' : 'bg-white text-black rounded-tl-none'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-white text-black rounded-tl-none font-body text-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-black/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-white/10 bg-black/50">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my skills, projects, or experience..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-6 pr-14 text-white placeholder-white/40 focus:outline-none focus:border-white/30 font-body text-sm transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
