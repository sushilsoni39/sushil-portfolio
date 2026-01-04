
import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 tracking-tight">Education</h2>
        <div className="space-y-8">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                  <p className="text-indigo-400 font-medium mb-1">{edu.institution}</p>
                  <p className="text-neutral-400 text-sm font-mono">{edu.period}</p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-sm">
                  {edu.details}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
