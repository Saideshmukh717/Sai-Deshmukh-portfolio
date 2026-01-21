
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
          <h2 className="text-4xl font-black tracking-tighter mb-6 uppercase">Direct Connection</h2>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Interested in building scalable systems or analyzing complex datasets? 
            Reach out for collaboration on architecture or engineering projects.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 items-start font-mono text-xs font-bold uppercase tracking-widest">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-500 hover:text-white transition-colors">
            {PERSONAL_INFO.email}
          </a>
          <a href="https://linkedin.com/in/SaiDeshmukh717" className="text-slate-500 hover:text-white transition-colors">
            LINKEDIN.SYSTEM
          </a>
          <a href="https://github.com/SaiDeshmukh717" className="text-slate-500 hover:text-white transition-colors">
            GITHUB.BUILD
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 flex justify-between text-[9px] font-mono text-slate-700 tracking-widest uppercase border-t border-[#1a1a1a] pt-8">
        <span>© 2024 SAI_DESHMUKH // ENGINEER_REPORT</span>
        <span className="text-slate-800">BUILT_FOR_FOCUS</span>
      </div>
    </footer>
  );
};

export default Footer;
