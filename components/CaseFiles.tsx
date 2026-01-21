
import React from 'react';
import { CASE_FILES } from '../constants';

const CaseFiles: React.FC = () => {
  return (
    <section id="cases" className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-16">Case Files / Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {CASE_FILES.map((caseFile) => (
            <div key={caseFile.id} className="border-base p-8 md:p-12">
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-[10px] font-bold text-slate-600">ID: {caseFile.id}</span>
                <div className="flex gap-2">
                  {caseFile.stack.map(s => (
                    <span key={s} className="text-[9px] font-mono border border-slate-800 px-2 py-0.5 text-slate-500">{s}</span>
                  ))}
                </div>
              </div>
              
              <h3 className="text-3xl font-black tracking-tighter mb-8">{caseFile.title.toUpperCase()}</h3>
              
              <div className="space-y-8 text-xs font-medium">
                <div>
                  <h4 className="font-mono text-blue-500 mb-2 tracking-widest text-[9px]">01_OBJECTIVE</h4>
                  <p className="text-slate-400 leading-relaxed">{caseFile.objective}</p>
                </div>
                
                <div>
                  <h4 className="font-mono text-blue-500 mb-2 tracking-widest text-[9px]">02_CONSTRAINTS</h4>
                  <ul className="list-disc list-inside text-slate-400 space-y-1">
                    {caseFile.constraints.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>

                <div className="p-4 bg-slate-900/30 border border-slate-800">
                  <h4 className="font-mono text-blue-500 mb-3 tracking-widest text-[9px]">03_ARCHITECTURE</h4>
                  <p className="text-slate-400 font-mono text-[10px] leading-relaxed">{caseFile.architecture}</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-mono text-blue-500 mb-2 tracking-widest text-[9px]">04_METRICS</h4>
                    <p className="text-slate-200 font-bold">{caseFile.metrics}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-blue-500 mb-2 tracking-widest text-[9px]">05_FAILURES</h4>
                    <p className="text-slate-400 italic">{caseFile.failures}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseFiles;
