
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 border-t border-[#1a1a1a] bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/2">
          <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-8">System_Discovery</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 uppercase leading-none">The Human <br/>Component.</h3>
          
          <div className="space-y-6 text-slate-400 text-sm md:text-base leading-relaxed font-medium">
            <p>
              I am {PERSONAL_INFO.name}, a Computer Engineering student based in {PERSONAL_INFO.location}. 
              My approach to software is rooted in <strong>system thinking</strong>—understanding how 
              individual modules interact to create resilient, scalable architectures.
            </p>
            <p>
              I specialize in bridging the gap between raw data and actionable inference. Whether it's 
              low-level socket programming or high-level statistical modeling, I prioritize 
              <strong>local-first persistence</strong> and <strong>latency optimization</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1a1a1a] border border-[#1a1a1a] mt-12">
            <div className="bg-[#080808] p-8">
              <span className="font-mono text-[9px] text-blue-500 block mb-3 uppercase tracking-widest">Core_Specialization</span>
              <span className="text-xs font-bold text-slate-100 uppercase tracking-tighter">Distributed Data Architectures</span>
            </div>
            <div className="bg-[#080808] p-8">
              <span className="font-mono text-[9px] text-blue-500 block mb-3 uppercase tracking-widest">Current_Research</span>
              <span className="text-xs font-bold text-slate-100 uppercase tracking-tighter">Time-Series Anomaly Detection</span>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 flex flex-col gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {[
            { 
              title: "Analytical Depth", 
              desc: "Decomposing messy, non-stationary datasets into structured, normalized features for predictive modeling." 
            },
            { 
              title: "Modular Integrity", 
              desc: "Designing system boundaries with strict interfaces to prevent complexity leakage and ensure scalability." 
            },
            { 
              title: "Performance Engineering", 
              desc: "Optimizing code at the socket and memory level to achieve sub-millisecond response times in LAN protocols." 
            },
            {
              title: "Resilient Persistence",
              desc: "Building immutable logging systems that ensure data availability even in zero-connectivity environments."
            }
          ].map((item, i) => (
            <div key={i} className="bg-[#080808] p-10 flex gap-8 group hover:bg-[#0c0c0c] transition-colors">
              <div className="font-mono text-2xl font-black text-slate-800 group-hover:text-blue-500 transition-colors">0{i+1}</div>
              <div>
                <h4 className="text-sm font-black text-slate-100 uppercase mb-3 tracking-widest">{item.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed uppercase font-bold tracking-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
