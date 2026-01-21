import React, { useState, useEffect, useRef } from 'react';
import BootSequence from './components/BootSequence';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [showObserverLog, setShowObserverLog] = useState(false);
  const [interactionLogs, setInteractionLogs] = useState<string[]>([]);
  
  const idleTimer = useRef<number | null>(null);

  const logInteraction = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setInteractionLogs(prev => [`${timestamp} | ${msg}`, ...prev.slice(0, 19)]);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
      
      // Reset idle timer
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      if (isIdle) setIsIdle(false);
      idleTimer.current = window.setTimeout(() => setIsIdle(true), 10000);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('.cursor-pointer') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        document.body.classList.add('cursor-hover');
        const text = target.innerText || target.getAttribute('aria-label') || 'element';
        logInteraction(`FOCUS_DETECTED: ${text.substring(0, 20).toUpperCase()}`);
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'o') {
        setShowObserverLog(prev => !prev);
        logInteraction('OBSERVER_LOG_TOGGLED');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isIdle]);

  const handleBootComplete = () => {
    setBooted(true);
    setTimeout(() => {
      setShowDashboard(true);
      logInteraction('SYSTEM_BOOT_SEQUENCE_COMPLETE');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-mono selection:bg-white selection:text-black">
      {!booted ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
        <div className={`transition-all duration-1000 ${showDashboard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Dashboard isIdle={isIdle} />
        </div>
      )}

      {/* Hidden Observer Log Overlay */}
      {showObserverLog && (
        <div className="fixed bottom-6 right-6 w-80 bg-[#0a0a0a]/90 border border-blue-500/30 p-4 z-[200] backdrop-blur-md shadow-2xl animate-[slideIn_0.3s_ease-out]">
          <div className="flex justify-between items-center mb-4 border-b border-[#141414] pb-2">
            <span className="text-[10px] font-black text-blue-500 tracking-widest uppercase">OBSERVER_LOG_v1.0</span>
            <span className="text-[8px] text-[#404040]">[PRESS 'O' TO HIDE]</span>
          </div>
          <div className="space-y-1.5 overflow-hidden">
            {interactionLogs.map((log, i) => (
              <div key={i} className="text-[9px] text-[#737373] font-mono whitespace-nowrap overflow-hidden text-ellipsis">
                {log}
              </div>
            ))}
            {interactionLogs.length === 0 && (
              <div className="text-[9px] text-[#404040] italic">No signals recorded...</div>
            )}
          </div>
          <div className="mt-4 pt-2 border-t border-[#141414] text-[8px] text-[#262626] font-bold">
            SIGNAL_STRENGTH: 98.4% // PASSIVE_CAPTURE_ACTIVE
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;