
import React from 'react';
import { BUILD_LOG } from '../constants';

const BuildLog: React.FC = () => {
  return (
    <section id="log" className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-16">Build Log / Changelog</h2>
        <div className="space-y-0">
          {BUILD_LOG.map((log, i) => (
            <div key={i} className="group flex gap-8 py-8 border-b border-[#1a1a1a] last:border-0 hover:bg-white/[0.02] transition-colors px-4 -mx-4">
              <div className="flex-shrink-0 w-24">
                <p className="font-mono text-[10px] text-slate-500 mt-1">{log.date}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[8px] font-mono px-2 py-0.5 border rounded uppercase ${
                    log.status === 'deploy' ? 'border-emerald-900 text-emerald-500' :
                    log.status === 'research' ? 'border-amber-900 text-amber-500' :
                    'border-blue-900 text-blue-500'
                  }`}>
                    {log.status}
                  </span>
                  <h3 className="text-sm font-bold tracking-tight">{log.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{log.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildLog;
