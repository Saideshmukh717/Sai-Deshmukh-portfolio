
import React from 'react';
import { SKILLS } from '../constants';

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-16">Technical_Stack</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {SKILLS.map((group, idx) => (
            <div key={idx} className="bg-[#080808] p-8">
              <h3 className="font-mono text-[9px] font-bold text-slate-500 mb-6 uppercase tracking-widest">{group.category}</h3>
              <div className="flex flex-col gap-3">
                {group.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-blue-500"></div>
                    <span className="text-xs font-bold text-slate-300 uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 border border-dashed border-slate-800 flex flex-wrap justify-center gap-4">
          {["Local-First", "High-Performance", "Scalable", "Robust", "Validated"].map((attr, i) => (
            <span key={i} className="font-mono text-[9px] text-slate-600 tracking-[0.2em] uppercase">
              // {attr}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
