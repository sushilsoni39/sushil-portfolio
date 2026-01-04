
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { askLocalGuide } from '../services/geminiService';

const LocalGuide: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; links: { title: string; uri: string }[] } | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    
    let coords = null;
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    } catch (e) {
      console.warn("Geolocation permission denied or failed.");
    }

    const res = await askLocalGuide(query, coords);
    setResult(res);
    setLoading(false);
  };

  return (
    <section id="local" className="py-32 px-6 bg-gradient-to-b from-neutral-900 to-black">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Local Tech Guide</h2>
            <p className="text-neutral-400 mb-8 leading-relaxed">
              I'm based in <span className="text-white font-semibold">Hyderabad</span>. Use this tool to find tech-friendly spots, meetups, or local favorites in my city. 
              Powered by <span className="text-indigo-400 font-bold">Gemini 2.5 Flash</span> with 
              <span className="text-green-400 font-bold"> Google Maps Grounding</span> for real-time accuracy.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g., Best quiet coffee shops with Wi-Fi in HITEC City"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
              >
                {loading ? 'Consulting the Oracle...' : 'Explore Hyderabad'}
              </button>
            </div>
          </div>

          <div className="bg-neutral-800/30 border border-white/5 p-8 rounded-3xl min-h-[300px] flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -z-10" />
            
            {!result && !loading && (
              <div className="text-center text-neutral-500 italic">
                Ask a question to see real-time location data grounded by Google Maps.
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-neutral-400 font-mono text-sm animate-pulse">FETCHING GROUNDED DATA...</p>
              </div>
            )}

            {result && !loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="prose prose-invert max-w-none text-neutral-300 text-sm md:text-base mb-6 leading-relaxed">
                  {result.text}
                </div>
                {result.links.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Sources & Locations</p>
                    <div className="flex flex-wrap gap-2">
                      {result.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-full hover:bg-indigo-500/20 transition-all flex items-center gap-2"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
                          {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalGuide;
