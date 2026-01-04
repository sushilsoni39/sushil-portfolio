
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';
import TextScramble from './TextScramble';
import { CONTACT } from '../constants';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section id="home" className="min-h-[95vh] flex items-center justify-center px-6 relative overflow-hidden pt-32 pb-20">
      {/* Deep Space Background Effects */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(79,70,229,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.05),transparent_50%)]" />
      
      {/* Floating Particle Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 0.2, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute w-[1px] h-24 bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
        <motion.div
          style={{ y: yText }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Professional Status Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-mono text-[11px] uppercase tracking-[0.4em] backdrop-blur-md"
          >
            <TextScramble text="Senior Software Engineer" delay={500} />
          </motion.div>

          {/* Symmetrical Name Presentation */}
          <div className="relative mb-14">
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tight leading-[0.9] text-white uppercase flex flex-col items-center">
              <span className="block mb-2">SUSHIL</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-600">
                KUMAR
              </span>
            </h1>
            
            {/* Geometric Accent */}
            <div className="absolute -left-12 -top-12 w-24 h-24 border-l-2 border-t-2 border-indigo-500/20 hidden lg:block" />
            <div className="absolute -right-12 -bottom-12 w-24 h-24 border-r-2 border-b-2 border-indigo-500/20 hidden lg:block" />
          </div>
          
          <p className="text-xl md:text-2xl font-light text-neutral-400 mb-16 max-w-3xl mx-auto leading-relaxed">
            Architecting <span className="text-white font-semibold">Distributed Systems</span> and high-concurrency microservices at <span className="text-indigo-400 font-bold">Oracle</span>. Driven by performance, scalability, and code excellence.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-20">
            <HashLink smooth to="/#projects" className="group relative px-14 py-6 bg-white text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10">
              <span className="relative z-10 uppercase tracking-widest text-xs">Explore Portfolio</span>
              <div className="absolute inset-0 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </HashLink>
          </div>

          <div className="flex justify-center gap-10 border-t border-white/5 pt-12 w-full max-w-2xl px-6">
             <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-all flex items-center gap-3 group">
               <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
               <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Github</span>
             </a>
             <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-all flex items-center gap-3 group">
               <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
               <span className="font-mono text-[10px] tracking-[0.2em] uppercase">LinkedIn</span>
             </a>
             <a href={`mailto:${CONTACT.email}`} className="text-neutral-500 hover:text-white transition-all flex items-center gap-3 group">
               <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
               <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Email</span>
             </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute left-10 bottom-10 opacity-10 pointer-events-none hidden xl:block select-none rotate-[-90deg] origin-left">
        <p className="font-mono text-[10px] tracking-[0.5em] text-white uppercase whitespace-nowrap">
          java.runtime.version: 21.0.4+8-LTS // build: prod-77a82
        </p>
      </div>

      <div className="absolute right-10 bottom-10 opacity-10 pointer-events-none hidden xl:block select-none text-right">
        <pre className="text-[9px] font-mono leading-tight text-indigo-400">
{`
root@sushil:~$ kubectl get pods
NAME                     READY   STATUS
ocua-gateway-7f5d        1/1     Running
dx4c-orchestrator-92bc   1/1     Running
assurance-stream-v5      1/1     Running
`}
        </pre>
      </div>
    </section>
  );
};

export default Hero;
