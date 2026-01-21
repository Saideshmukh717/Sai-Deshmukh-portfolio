import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO, CASE_FILES, BUILD_LOG, PHILOSOPHY, EDUCATION, RELEVANT_COURSEWORK, SKILLS } from '../constants';
import ArchitectureMap from './ArchitectureMap';
import PerformanceMonitor from './PerformanceMonitor';
import ScrollReveal from './ScrollReveal';
import { CaseFile } from '../types';

const Panel: React.FC<{ title: string; children: React.ReactNode; footer?: string; className?: string; delay?: number }> = ({ title, children, footer, className, delay = 0 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Initializing...");

  useEffect(() => {
    const messages = ["Mounting resources...", "Indexing logs...", "Scanning topology...", "Observing...", "Stable."];
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length - 1) {
        setLoadingText(messages[i]);
        i++;
      } else {
        setLoadingText(messages[messages.length - 1]);
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 300 + Math.random() * 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollReveal delay={delay} className="h-full">
      <div className={`panel-border bg-[#0a0a0a] flex flex-col h-full overflow-hidden group hover:border-[#3b82f6]/50 transition-all duration-500 ${className}`}>
        <div className="panel-header group-hover:bg-[#151515] transition-colors relative">
          <span className="glitch-hover cursor-default">{title}</span>
          <div className="flex gap-1.5 items-center">
             <div className="presence-pulse"></div>
            <div className="flex gap-1">
               <div className="w-1.5 h-1.5 bg-[#1a1a1a] group-hover:bg-blue-500/50 transition-colors duration-300"></div>
               <div className="w-1.5 h-1.5 bg-[#1a1a1a] group-hover:bg-blue-500/50 transition-colors duration-500"></div>
            </div>
          </div>
        </div>
        <div className="panel-content flex-1 overflow-auto custom-scroll relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-px bg-blue-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500 animate-[loading-bar_1s_infinite]"></div>
                </div>
                <span className="text-[8px] text-blue-500/50 font-black uppercase tracking-widest">{loadingText}</span>
              </div>
            </div>
          ) : (
            <div className="animate-[panel-content-in_0.6s_cubic-bezier(0.16, 1, 0.3, 1)]">
              {children}
            </div>
          )}
        </div>
        {footer && (
          <div className="px-3 py-1 border-t border-[#141414] text-[8px] text-[#404040] flex justify-between uppercase font-bold tracking-[0.2em] group-hover:text-[#606060] transition-colors">
            <span className="cursor-default">{footer}</span>
            <span className="opacity-30">REF_{Math.random().toString(36).substr(2, 4).toUpperCase()}</span>
          </div>
        )}
      </div>
      <style>{`
        @keyframes loading-bar {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        @keyframes panel-content-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ScrollReveal>
  );
};

const Dashboard: React.FC<{ isIdle: boolean }> = ({ isIdle }) => {
  const [selectedCase, setSelectedCase] = useState<CaseFile | null>(null);
  const [internalState, setInternalState] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const hex = '0x' + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
      const states = ['OBSERVER_PASSIVE', 'NODE_SYNC', 'SIGNAL_DET', 'LOG_PERSIST', 'CACHE_RECOVERY', 'TEMP_MONITOR', 'THREAD_OVR'];
      const status = states[Math.floor(Math.random() * states.length)];
      setInternalState(prev => [ `${hex} | ${status}`, ...prev.slice(0, 10)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-[1920px] mx-auto relative">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-[#1a1a1a] pb-4 gap-4 animate-[slideIn_0.8s_cubic-bezier(0.16, 1, 0.3, 1)]">
        <div className="flex items-center gap-4 group">
          <div className="w-6 h-6 bg-blue-500 group-hover:rotate-90 transition-transform duration-500"></div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none glitch-hover cursor-default">{PERSONAL_INFO.name}</h1>
            <p className="text-[10px] text-[#525252] font-bold tracking-widest mt-1 uppercase cursor-default">{PERSONAL_INFO.role} // OBSERVER_ACTIVE</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 text-[10px] text-[#525252] uppercase font-bold">
          <div className="flex flex-col group cursor-default">
            <span className="text-[8px] text-[#262626] group-hover:text-blue-500 transition-colors">LOCATION</span>
            <span className="text-white">{PERSONAL_INFO.location}</span>
          </div>
          <div className="flex flex-col group cursor-default">
            <span className="text-[8px] text-[#262626] group-hover:text-blue-500 transition-colors">SYSTEM_STATE</span>
            <span className="text-blue-500 animate-pulse">{isIdle ? 'IDLE_WAIT' : 'ACTIVE_SENSE'}</span>
          </div>
          <div className="flex flex-col group cursor-default">
            <span className="text-[8px] text-[#262626] group-hover:text-blue-500 transition-colors">KERNEL_VERSION</span>
            <span className="text-white">{PERSONAL_INFO.status.kernel}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Current Objective */}
        <div className="md:col-span-8 lg:col-span-9">
          <Panel title="SYSTEM_FOCUS" footer="INTENTION_LOG" delay={100}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4 leading-none uppercase animate-[slideIn_1s_cubic-bezier(0.16, 1, 0.3, 1)]">
                  {PERSONAL_INFO.objective}
                </p>
                <p className="text-xs text-[#737373] leading-relaxed max-w-2xl font-medium uppercase tracking-tight">
                  {PERSONAL_INFO.summary}
                </p>
              </div>
              <div className="w-full md:w-64 border-l border-[#1a1a1a] pl-6 py-2">
                <h4 className="text-[9px] text-blue-500 mb-4 font-bold tracking-widest uppercase">CORE_CAPABILITIES</h4>
                <div className="flex flex-wrap gap-2">
                  {PERSONAL_INFO.stack.map((s, i) => (
                    <span key={s} className="text-[9px] border border-[#1a1a1a] px-2 py-0.5 text-[#a3a3a3] font-bold hover:border-blue-500/30 hover:text-white transition-all cursor-default" style={{ transitionDelay: `${i*50}ms` }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* System Monitoring */}
        <div className="md:col-span-4 lg:col-span-3">
          <Panel title="CLIENT_METRICS" footer="ENVIRONMENT_STATE" delay={150}>
            <PerformanceMonitor />
          </Panel>
        </div>

        {/* Technical Stack / Skills */}
        <div className="md:col-span-12">
          <Panel title="KNOWLEDGE_BASE" footer="MODULE_INDEX" delay={200}>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a]">
               {SKILLS.map((group, idx) => (
                 <div key={group.category} className="bg-[#050505] p-6 hover:bg-[#080808] transition-colors duration-500 group/skill">
                    <h4 className="text-[10px] text-blue-500 font-bold mb-4 uppercase tracking-[0.2em] group-hover/skill:translate-x-1 transition-transform">{group.category}</h4>
                    <ul className="space-y-2">
                      {group.items.map((item, i) => (
                        <li key={item} className="text-[11px] font-bold text-[#a3a3a3] uppercase flex items-center gap-2 group/item">
                          <div className="w-1 h-1 bg-[#1a1a1a] group-hover/item:bg-blue-500 transition-colors"></div> 
                          <span className="group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                 </div>
               ))}
             </div>
          </Panel>
        </div>

        {/* Case Files */}
        <div className="md:col-span-12 lg:col-span-8">
          <Panel title="CLASSIFIED_CASE_FILES" footer="ENGINEERING_DOCUMENT_INDEX" delay={250}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
              {CASE_FILES.map((cf, i) => (
                <div 
                  key={cf.id} 
                  className="bg-[#050505] p-8 flex flex-col group cursor-pointer hover:bg-[#0f0f0f] transition-all duration-500" 
                  onClick={() => setSelectedCase(cf)}
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] text-blue-500 font-bold tracking-widest group-hover:scale-105 transition-transform">[{cf.id}]</span>
                    <span className="text-[8px] text-[#404040] group-hover:text-blue-500 font-black uppercase tracking-widest">INSPECT_DOCUMENT //</span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-6 group-hover:text-blue-500 leading-none transition-colors">{cf.title}</h3>
                  <div className="space-y-6 text-[10px] font-bold text-[#737373] uppercase tracking-wide">
                    <div>
                      <span className="text-[#333] block mb-1">OBJECTIVE_RE_ENTRY:</span>
                      <span className="text-[#a3a3a3] leading-relaxed group-hover:text-white transition-colors">{cf.objective}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Internal State Log */}
        <div className="md:col-span-12 lg:col-span-4">
          <Panel title="SIGNAL_STREAM" footer="REAL_TIME_NODE_LOG" delay={300}>
            <div className="font-mono text-[10px] space-y-1 text-[#404040]">
               {internalState.map((entry, idx) => (
                 <div key={idx} className={`${idx === 0 ? "text-blue-500" : ""} animate-[slideIn_0.3s_cubic-bezier(0.16, 1, 0.3, 1)] opacity-70`}>
                    {entry}
                 </div>
               ))}
               <div className="mt-4 text-blue-500/50 uppercase font-black animate-pulse text-[8px] tracking-[0.3em]">
                  {isIdle ? "AWAITING_INPUT..." : "SENSING_SIGNAL..."}
               </div>
               <div className="blink mt-2 text-white">_</div>
            </div>
          </Panel>
        </div>

        {/* Topology & Doctrine */}
        <div className="md:col-span-7">
          <Panel title="TOPOLOGY_ARCH" footer="NETWORK_VISUALIZATION" delay={350}>
            <ArchitectureMap />
          </Panel>
        </div>
        <div className="md:col-span-5">
          <Panel title="INTERNAL_DOCTRINE" footer="ARCHITECTURAL_PRINCIPLES" delay={400}>
            <div className="space-y-10">
              {PHILOSOPHY.map((d, i) => (
                <div key={d.title} className="relative pl-6 group/phil">
                  <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-blue-500/20 group-hover/phil:bg-blue-500 transition-colors"></div>
                  <h4 className="text-[10px] text-white font-black mb-2 uppercase tracking-widest group-hover/phil:text-blue-500 transition-colors">{d.title}</h4>
                  <p className="text-[11px] font-bold text-[#737373] leading-relaxed uppercase group-hover/phil:text-white transition-colors">{d.statement}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Build Log */}
        <div className="md:col-span-6 lg:col-span-4">
          <Panel title="BUILD_LOG" footer="CHRONOLOGICAL_HISTORY" delay={450}>
            <div className="space-y-6">
              {BUILD_LOG.map((log, i) => (
                <div key={i} className="group/log relative border-l border-transparent hover:border-blue-500/30 pl-4 transition-all">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[9px] text-[#3b82f6] font-black">{log.date}</span>
                    <span className={`text-[7px] px-1.5 border uppercase font-black ${
                      log.status === 'iteration' ? 'border-blue-900 text-blue-500' : 
                      log.status === 'research' ? 'border-amber-900 text-amber-500' : 
                      'border-emerald-900 text-emerald-500'
                    }`}>{log.status}</span>
                  </div>
                  <h4 className="text-[11px] font-black text-white uppercase mb-2 group-hover/log:text-blue-500 transition-colors">{log.title}</h4>
                  <p className="text-[10px] text-[#737373] leading-relaxed uppercase font-medium">{log.content}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Education & Protocol */}
        <div className="md:col-span-6 lg:col-span-4">
          <Panel title="QUALIFICATION_CORE" footer="KNOWLEDGE_DOMAINS" delay={500}>
            <div className="mb-8">
              <h4 className="text-[9px] text-[#333] font-black mb-2 uppercase tracking-widest">ACADEMIC_PROTOCOL:</h4>
              <p className="text-sm font-black text-white uppercase leading-none mb-1 group-hover:translate-x-1 transition-transform">{EDUCATION.degree}</p>
              <p className="text-[10px] font-bold text-blue-500 uppercase">{EDUCATION.major}</p>
              <div className="mt-4 text-[9px] text-[#525252] font-bold space-y-1">
                <p>INSTITUTION: {EDUCATION.institution}</p>
                <p>LOCATION: {EDUCATION.location}</p>
                <p>TIMESTAMP: {EDUCATION.graduation}</p>
              </div>
            </div>
            <div>
              <h4 className="text-[9px] text-[#333] font-black mb-4 uppercase tracking-widest">CORE_DOMAINS:</h4>
              <div className="grid grid-cols-1 gap-2">
                {RELEVANT_COURSEWORK.map(course => (
                  <div key={course} className="flex items-center gap-3 p-2 border border-[#1a1a1a] hover:border-blue-500/30 transition-all group/course">
                    <div className="w-1 h-1 bg-[#1a1a1a] group-hover/course:bg-blue-500 transition-colors"></div>
                    <span className="text-[9px] font-bold text-[#a3a3a3] group-hover/course:text-white transition-colors">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        {/* Signal Out */}
        <div className="md:col-span-12 lg:col-span-4">
          <Panel title="SIGNAL_OUT" footer="COMMUNICATION_LINK" delay={550}>
            <div className="h-full flex flex-col justify-center items-center text-center py-10">
              <p className="text-[9px] text-[#404040] mb-12 uppercase font-black max-w-xs leading-relaxed tracking-widest">ESTABLISHING CONNECTION REQUIRES VERIFIED COLLABORATION PARAMETERS. SIGNALS ANALYZED ON ARRIVAL.</p>
              <div className="space-y-10 w-full">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="block text-xl md:text-2xl font-black text-white hover:text-blue-500 tracking-tighter uppercase transition-all hover:scale-105">
                  {PERSONAL_INFO.email}
                </a>
                <div className="flex gap-12 justify-center font-black uppercase tracking-[0.3em] text-[10px]">
                  <a href={`https://${PERSONAL_INFO.github}`} target="_blank" className="text-[#333] hover:text-white transition-colors">GITHUB</a>
                  <a href={`https://${PERSONAL_INFO.linkedin}`} target="_blank" className="text-[#333] hover:text-white transition-colors">LINKEDIN</a>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      {/* Signature Moment */}
      <div className="mt-32 mb-10 flex flex-col items-center gap-4 text-center">
         <ScrollReveal delay={200}>
           <div className="w-12 h-px bg-blue-500 mb-6 mx-auto animate-pulse"></div>
           <p className="text-[11px] text-[#525252] font-black uppercase tracking-[0.6em] animate-[fadeIn_2s_ease-in]">This system evolves through observation.</p>
         </ScrollReveal>
      </div>

      <div className="text-center text-[8px] text-[#1a1a1a] uppercase tracking-[1em] font-black border-t border-[#1a1a1a] pt-10 select-none">
        END_OF_TRANSMISSION // {PERSONAL_INFO.name} // {new Date().getFullYear()} // ALL_RIGHTS_RESERVED
      </div>

      {/* Case File Overlay */}
      {selectedCase && (
        <div 
          className="fixed inset-0 z-[100] bg-[#050505]/98 p-6 md:p-20 overflow-auto flex items-center justify-center animate-[fadeIn_0.4s_cubic-bezier(0.16, 1, 0.3, 1)]"
          onClick={(e) => e.target === e.currentTarget && setSelectedCase(null)}
        >
          <div className="max-w-4xl w-full border border-[#1a1a1a] bg-[#0a0a0a] shadow-[0_0_100px_rgba(0,0,0,0.8)] relative animate-[slideIn_0.5s_cubic-bezier(0.16, 1, 0.3, 1)]">
            <button className="absolute top-4 right-4 text-[#404040] hover:text-white font-black tracking-widest text-[10px] p-2" onClick={() => setSelectedCase(null)}>[ CLOSE_X ]</button>
            <div className="panel-header text-[12px] select-none">CLASSIFIED_DOCUMENT_VIEW // {selectedCase.id}</div>
            <div className="p-8 md:p-16 space-y-12">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase border-b border-[#1a1a1a] pb-6 glitch-hover">{selectedCase.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="animate-[slideIn_0.6s_ease-out_both]">
                  <h4 className="text-[9px] text-blue-500 font-black mb-4 uppercase tracking-[0.4em]">01_OBJECTIVE_CORE</h4>
                  <p className="text-sm font-bold text-[#a3a3a3] uppercase leading-relaxed">{selectedCase.objective}</p>
                </div>
                <div className="animate-[slideIn_0.7s_ease-out_both]">
                  <h4 className="text-[9px] text-blue-500 font-black mb-4 uppercase tracking-[0.4em]">02_SYSTEM_CONSTRAINTS</h4>
                  <ul className="space-y-2">
                    {selectedCase.constraints.map((c, i) => (
                      <li key={i} className="text-[10px] font-bold text-[#a3a3a3] uppercase flex gap-3">
                        <span className="text-blue-500">>></span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-8 bg-[#050505] border border-[#1a1a1a] animate-[slideIn_0.8s_ease-out_both]">
                <h4 className="text-[9px] text-blue-500 font-black mb-4 uppercase tracking-[0.4em]">03_TOPOLOGY_ARCHITECTURE</h4>
                <p className="text-xs font-mono text-white leading-loose tracking-tight">{selectedCase.architecture}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-[slideIn_0.9s_ease-out_both]">
                <div>
                  <h4 className="text-[9px] text-blue-500 font-black mb-4 uppercase tracking-[0.4em]">04_EFFICIENCY_METRICS</h4>
                  <p className="text-xl font-black text-white leading-none uppercase">{selectedCase.metrics}</p>
                </div>
                <div>
                  <h4 className="text-[9px] text-blue-500 font-black mb-4 uppercase tracking-[0.4em]">05_KNOWN_FAILURES</h4>
                  <p className="text-[10px] font-bold text-[#ef4444] leading-relaxed uppercase italic opacity-70">{selectedCase.failures}</p>
                </div>
                <div>
                  <h4 className="text-[9px] text-blue-500 font-black mb-4 uppercase tracking-[0.4em]">06_CORE_STACK_DEPS</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.stack.map(s => <span key={s} className="border border-[#1a1a1a] px-2 py-0.5 text-[9px] font-bold text-white uppercase hover:border-blue-500 transition-colors">{s}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;