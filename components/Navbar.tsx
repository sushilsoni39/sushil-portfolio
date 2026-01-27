
import React from 'react';
import { HashLink } from 'react-router-hash-link';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <HashLink smooth to="/#home" className="text-2xl font-bold tracking-tighter hover:text-indigo-400 transition-colors text-white">
          SUSHIL.<span className="text-indigo-500">KUMAR</span>
        </HashLink>
        <div className="hidden lg:flex gap-8 text-sm font-medium uppercase tracking-widest text-neutral-400">
          <HashLink smooth to="/#experience" className="hover:text-white transition-colors">Experience</HashLink>
          <HashLink smooth to="/#projects" className="hover:text-white transition-colors">Projects</HashLink>
          <HashLink smooth to="/#education" className="hover:text-white transition-colors">Education</HashLink>
          <HashLink smooth to="/#certifications" className="hover:text-white transition-colors">Certifications</HashLink>
        </div>
        <a 
          href={`mailto:sushilsoni39@gmail.com`}
          className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
