
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithMe } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm the AI persona for this portfolio. Ask me anything about my backend experience, stack, or availability!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const responseText = await chatWithMe([...messages, userMsg]);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
  };

  return (
    <section id="chat" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Talk to my AI Representative</h2>
          <p className="text-neutral-400">Powered by Gemini 3 Flash. Built to answer technical questions about my background.</p>
        </div>
        
        <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div ref={scrollRef} className="h-[500px] overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white/5 text-neutral-300 rounded-tl-none border border-white/10'
                  }`}>
                    <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                  <div className="flex gap-1">
                    {/* Fix: Use arbitrary value syntax [animation-delay:...] as standard Tailwind delay classes apply to transitions, not animations */}
                    <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-white/10 bg-black/20 flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Kubernetes experience..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;
