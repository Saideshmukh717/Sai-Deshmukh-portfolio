
import React from 'react';

const ArchitectureViewer: React.FC = () => {
  return (
    <section id="architecture" className="py-24 px-6 border-t border-[#1a1a1a] bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-16">System Architecture</h2>
        
        <div className="relative border border-[#1a1a1a] p-12 overflow-x-auto">
          <div className="min-w-[800px] flex items-center justify-between gap-8">
            {/* Source Node */}
            <div className="flex-1 text-center border border-slate-800 p-6 bg-slate-900/20">
              <p className="font-mono text-[9px] text-blue-500 mb-2">INPUT</p>
              <p className="text-xs font-bold uppercase tracking-widest">Unstructured Data</p>
              <div className="mt-4 text-[9px] text-slate-600 font-mono">API / SOCKET / SENSOR</div>
            </div>

            <div className="w-12 h-px bg-slate-800 relative">
              <div className="absolute top-1/2 right-0 w-2 h-2 border-t border-r border-slate-800 -translate-y-1/2 rotate-45"></div>
            </div>

            {/* Processor Node */}
            <div className="flex-1 text-center border border-blue-900/30 p-6 bg-blue-900/5">
              <p className="font-mono text-[9px] text-blue-500 mb-2">CORE_LOGIC</p>
              <p className="text-xs font-bold uppercase tracking-widest">Normalization Engine</p>
              <div className="mt-4 text-[9px] text-slate-600 font-mono">PANDAS / NUMPY / TRANSFORM</div>
            </div>

            <div className="w-12 h-px bg-slate-800 relative">
              <div className="absolute top-1/2 right-0 w-2 h-2 border-t border-r border-slate-800 -translate-y-1/2 rotate-45"></div>
            </div>

            {/* Model Node */}
            <div className="flex-1 text-center border border-slate-800 p-6 bg-slate-900/20">
              <p className="font-mono text-[9px] text-blue-500 mb-2">INFERENCE</p>
              <p className="text-xs font-bold uppercase tracking-widest">Predictive Model</p>
              <div className="mt-4 text-[9px] text-slate-600 font-mono">LSTM / REGRESSION / CLASSIFY</div>
            </div>

            <div className="w-12 h-px bg-slate-800 relative">
              <div className="absolute top-1/2 right-0 w-2 h-2 border-t border-r border-slate-800 -translate-y-1/2 rotate-45"></div>
            </div>

            {/* Persistence Node */}
            <div className="flex-1 text-center border border-slate-800 p-6 bg-slate-900/20">
              <p className="font-mono text-[9px] text-blue-500 mb-2">OUTPUT</p>
              <p className="text-xs font-bold uppercase tracking-widest">Persistence Layer</p>
              <div className="mt-4 text-[9px] text-slate-600 font-mono">SQL / LOCAL / JSON</div>
            </div>
          </div>

          <div className="mt-16 text-center text-slate-600 font-mono text-[10px] tracking-widest">
            STABLE_END_TO_END_PROTOCOL_V1.0
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureViewer;
