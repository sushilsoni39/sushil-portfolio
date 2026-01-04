
import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../constants';

const CertificationsSection: React.FC = () => {
  // Group certifications by category
  const grouped = CERTIFICATIONS.reduce((acc, cert) => {
    if (!acc[cert.category]) acc[cert.category] = [];
    acc[cert.category].push(cert.title);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <section id="certifications" className="py-24 px-6 bg-neutral-900/30 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-indigo-400 font-mono text-xs uppercase tracking-[0.3em] block mb-4">Credentials & Validations</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Professional <span className="text-indigo-500">Growth</span></h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(grouped).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[32px] p-8 hover:border-indigo-500/30 transition-all group"
            >
              <h3 className="text-indigo-400 font-mono text-[10px] uppercase tracking-widest mb-6 font-bold flex items-center gap-3">
                <span className="w-6 h-px bg-indigo-500/40"></span>
                {category}
              </h3>
              <ul className="space-y-4">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-sm font-medium text-neutral-300 leading-tight group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
};

export default CertificationsSection;
