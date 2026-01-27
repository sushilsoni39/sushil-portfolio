
import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import TextScramble from './TextScramble';
import { EXPERIENCES } from '../constants';

const ExperienceCard: React.FC<{ exp: typeof EXPERIENCES[0]; index: number }> = ({ exp, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col md:flex-row items-center w-full mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 z-20">
        <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.8)] border-2 border-white" />
      </div>

      <div className="hidden md:block w-1/2" />

      <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
        <div className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl hover:border-indigo-500/30 transition-all duration-500 group relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
          
          <div className="flex flex-col mb-6">
            <span className="inline-block text-[10px] font-mono tracking-[0.3em] text-indigo-400 mb-2 uppercase">
              {exp.period}
            </span>
            <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              {exp.role}
            </h3>
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mt-1">
              {exp.company}
            </p>
          </div>

          {(exp.project || exp.techStack) && (
            <div className="mb-6 space-y-2 p-4 bg-white/5 rounded-xl border border-white/5">
              {exp.project && (
                <p className="text-xs text-neutral-300">
                  <span className="text-indigo-400 font-mono uppercase tracking-widest text-[9px] mr-2">Project:</span>
                  {exp.project}
                </p>
              )}
              {exp.techStack && (
                <p className="text-xs text-neutral-400 italic">
                   <span className="text-indigo-400 font-mono uppercase tracking-widest text-[9px] mr-2">Stack:</span>
                   {exp.techStack}
                </p>
              )}
            </div>
          )}

          <ul className="space-y-3">
            {exp.description.map((item, i) => (
              <li key={i} className="flex gap-4 text-neutral-400 group/li">
                <div className="w-1 h-1 rounded-full bg-indigo-500/40 mt-2.5 flex-shrink-0 group-hover/li:bg-indigo-500 transition-colors" />
                <span className="text-sm md:text-base leading-relaxed group-hover/li:text-neutral-200 transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-32 px-6 relative bg-[#0a0a0a]" ref={containerRef}>
      <div className="absolute right-0 top-1/4 text-[20rem] font-black text-white/[0.01] select-none pointer-events-none uppercase italic leading-none overflow-hidden">
        History
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-6 px-4 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 font-mono text-xs uppercase tracking-widest"
          >
            Engineering Roadmap
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-4 uppercase"
          >
            <TextScramble text="EXPERIENCE" />
            <span className="text-indigo-500">.</span>
          </motion.h2>
          <p className="text-neutral-500 max-w-xl text-lg font-light">
            Synchronized with core professional logs.
          </p>
        </div>
        
        <div className="relative pt-12">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-neutral-800" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent z-10 shadow-[0_0_10px_rgba(79,70,229,0.5)]" 
          />

          <div className="relative z-10">
            {EXPERIENCES.map((exp, idx) => (
              <ExperienceCard key={idx} exp={exp} index={idx} />
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col items-center mt-12 opacity-40"
        >
          <div className="w-1 h-1 bg-neutral-800 rounded-full mb-2" />
          <div className="w-1 h-1 bg-neutral-800 rounded-full mb-2" />
          <div className="w-1 h-1 bg-neutral-800 rounded-full" />
          <span className="mt-8 font-mono text-[10px] tracking-[0.4em] uppercase text-neutral-600">
            Current Log Entry: {new Date().getFullYear()}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
