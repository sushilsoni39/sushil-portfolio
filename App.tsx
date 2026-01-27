
import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { motion, AnimatePresence, Variants, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import Projects from './components/Projects';
import EducationSection from './components/EducationSection';
import CertificationsSection from './components/CertificationsSection';
import CustomCursor from './components/CustomCursor';
import TextScramble from './components/TextScramble';
import { CONTACT, TECH_STACK_GROUPS } from './constants';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Spotlight effect logic
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0a0a0a] text-white relative selection:bg-indigo-500/30">
        <CustomCursor />
        
        {/* Futuristic Top Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] bg-indigo-500 z-[100] origin-left shadow-[0_0_10px_rgba(79,70,229,0.8)]"
          style={{ scaleX }}
        />

        {/* Dynamic Spotlight Grid Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div 
            className="absolute inset-0 opacity-[0.15] transition-opacity duration-300"
            style={{ 
              background: 'radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(79, 70, 229, 0.15), transparent 80%)'
            }} 
          />
        </div>
        
        <Navbar />
        
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              
              {/* Dynamic Skills Grid Section */}
              <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <span className="text-indigo-400 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">System Capabilities</span>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">
                      <TextScramble text="Technology Stack" />
                    </h2>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {TECH_STACK_GROUPS.map((group, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants} 
                      className="group flex flex-col p-8 border border-white/5 rounded-[32px] bg-white/[0.02] backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-500"
                    >
                      <span className="text-[10px] font-mono mb-6 tracking-widest text-indigo-400 uppercase flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-indigo-500/30"></span>
                        {group.category}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item, i) => (
                          <span key={i} className="font-bold text-xs lg:text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/5 group-hover:border-indigo-500/20 transition-colors">
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <ExperienceSection />
              <Projects />
              <EducationSection />
              <CertificationsSection />

              <footer className="py-24 border-t border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid md:grid-cols-2 gap-12 items-end">
                    <div>
                      <h3 className="text-4xl font-bold mb-6 italic tracking-tight text-white uppercase">
                        Sushil <span className="text-indigo-500">Kumar</span>
                      </h3>
                      <p className="text-neutral-400 max-w-md leading-relaxed mb-8">
                        Senior Software Engineer specializing in scalable backend architectures and high-performance microservices. Available for strategic collaborations and engineering leadership.
                      </p>
                      <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-mono tracking-widest text-neutral-500 uppercase">
                        <div className="flex flex-col gap-2">
                          <span className="text-indigo-400/60 font-bold">Phone</span>
                          <a href={`tel:${CONTACT.phone}`} className="text-white hover:text-indigo-400 transition-colors">{CONTACT.phone}</a>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-indigo-400/60 font-bold">Email</span>
                          <a href={`mailto:${CONTACT.email}`} className="text-white hover:text-indigo-400 transition-colors">{CONTACT.email}</a>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-indigo-400/60 font-bold">Location</span>
                          <span className="text-white">{CONTACT.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-8 md:items-end">
                      <div className="flex gap-8 text-neutral-500 text-xs font-mono tracking-widest">
                        <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors flex items-center gap-2">GITHUB</a>
                        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors flex items-center gap-2">LINKEDIN</a>
                      </div>
                      <p className="text-neutral-600 text-[10px] uppercase tracking-[0.3em] font-mono">
                        &copy; {new Date().getFullYear()} SUSHIL KUMAR // DEPLOYED VIA GITHUB ACTIONS
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Ambient Glows */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[180px] rounded-full" />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
