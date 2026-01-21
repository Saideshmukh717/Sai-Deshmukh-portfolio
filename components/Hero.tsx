
import React from 'react';
import { PERSONAL_INFO } from '../constants';
import StatusGrid from './StatusGrid';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 bg-blue-500 animate-pulse"></div>
          <span className="font-mono text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase">Status: System_Operational</span>
        </div>
        
        <div className="mb-4">
           <span className="font-mono text-[11px] font-bold text-blue-500 tracking-[0.2em] uppercase">Engineering_Portfolio_v2.4.0</span>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-12 uppercase">
          {PERSONAL_INFO.name} <br/>
          <span className="text-slate-800">BUILDER.</span>
        </h1>
        
        <div className="max-w-2xl">
          <p className="text-xl md:text-2xl font-bold text-slate-100 mb-6 tracking-tight leading-tight">
            Architecting <span className="text-blue-500 underline decoration-2 underline-offset-8">modular systems</span> and 
            high-performance data pipelines.
          </p>
          <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase tracking-wide">
            {PERSONAL_INFO.summary}
          </p>
        </div>
        
        <div className="mt-16">
          <StatusGrid />
        </div>
      </div>
    </section>
  );
};

export default Hero;
