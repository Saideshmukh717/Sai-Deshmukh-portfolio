
import React from 'react';
import { PHILOSOPHY } from '../constants';

const Thinking: React.FC = () => {
  return (
    <section id="thinking" className="py-24 px-6 border-t border-[#1a1a1a] bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-16">Thinking</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PHILOSOPHY.map((item, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-xl font-black tracking-tighter uppercase">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                "{item.statement}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Thinking;
