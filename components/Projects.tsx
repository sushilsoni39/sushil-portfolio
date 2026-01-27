
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';

// Added React.FC typing to correctly handle standard React props like 'key' in TypeScript
const ProjectCard: React.FC<{ project: typeof PROJECTS[0]; index: number }> = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group bg-neutral-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-indigo-500/30 transition-colors duration-500 backdrop-blur-sm"
    >
      {/* HUD Corner Decorations */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-indigo-500/40 transition-colors z-20" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-indigo-500/40 transition-colors z-20" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-indigo-500/40 transition-colors z-20" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-indigo-500/40 transition-colors z-20" />

      {/* Image Container with Scanning Effect */}
      <div className="h-56 overflow-hidden relative" style={{ transform: "translateZ(30px)" }}>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
        
        {/* Scanning Line Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <motion.div 
             animate={{ y: ["-100%", "300%"] }}
             transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
             className="w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_15px_rgba(79,70,229,0.8)]"
           />
        </div>

        {/* Project Index Badge */}
        <div className="absolute top-6 right-6 font-mono text-[10px] text-white/20 group-hover:text-indigo-400/60 transition-colors tracking-[0.2em]">
          PRJ_0{index + 1}
        </div>
      </div>

      <div className="p-8 relative" style={{ transform: "translateZ(50px)" }}>
        <div className="flex gap-2 mb-6 flex-wrap">
          {project.tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono border border-white/10 bg-white/5 px-2.5 py-1 rounded-sm text-neutral-400 uppercase tracking-tighter group-hover:text-white group-hover:border-indigo-500/20 transition-all">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-black mb-3 text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
          {project.title}
        </h3>
        
        <p className="text-neutral-500 text-sm leading-relaxed mb-8 h-20 overflow-hidden line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <a 
            href={project.link === '#' ? undefined : project.link} 
            target={project.link === '#' ? undefined : "_blank"} 
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
          >
            <span>Launch Interface</span>
            <div className="w-8 h-[1px] bg-neutral-700 group-hover/btn:w-12 group-hover/btn:bg-indigo-500 transition-all" />
          </a>
          
          <div className="flex gap-1.5 opacity-20 group-hover:opacity-100 transition-opacity">
            <div className="w-1 h-1 bg-indigo-500 rounded-full" />
            <div className="w-1 h-1 bg-indigo-500 rounded-full" />
            <div className="w-1 h-1 bg-indigo-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Hover Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-40 px-6 relative overflow-hidden bg-[#0a0a0a]">
      {/* Section Background Decorative Text */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 text-[15rem] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
        PROJECT_REPOS
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-4">
          <div>
            <span className="text-indigo-400 font-mono text-xs uppercase tracking-[0.5em] mb-4 block">System Artifacts</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Technical <span className="text-indigo-500">Portfolio</span></h2>
          </div>
          <div className="flex items-center gap-4 text-neutral-600 font-mono text-[10px] tracking-[0.3em] uppercase">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Network Active</span>
            </div>
            <span>//</span>
            <span>Total Projects: {PROJECTS.length}</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>

      {/* Ambient Side Accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-[50%] bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[50%] bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
    </section>
  );
};

export default Projects;
