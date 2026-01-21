import React, { useState, useEffect, useRef } from 'react';

const PerformanceMonitor: React.FC = () => {
  const [stats, setStats] = useState({
    cpu: '10.0%',
    ram: '128.0MB',
    net: '0.0MB/s',
    cores: '0',
    fps: '60'
  });

  const [fpsHistory, setFpsHistory] = useState<number[]>(Array(40).fill(60));
  const [cpuHistory, setCpuHistory] = useState<number[]>(Array(40).fill(10));
  const [memHistory, setMemHistory] = useState<number[]>(Array(40).fill(128));
  
  const lastFrameTime = useRef(performance.now());
  const lastUpdate = useRef(performance.now());
  const frameDeltas = useRef<number[]>([]);
  const memValue = useRef(128.0);
  const memDir = useRef(1);

  useEffect(() => {
    const logicalProcessors = navigator.hardwareConcurrency || 4;

    const updateMetrics = () => {
      const now = performance.now();
      const delta = now - lastFrameTime.current;
      lastFrameTime.current = now;
      
      frameDeltas.current.push(delta);
      if (frameDeltas.current.length > 30) frameDeltas.current.shift();
      
      // Throttle the React state updates to ~6.6Hz (every 150ms)
      // This drastically improves performance as React doesn't have to diff 60 times a second
      if (now - lastUpdate.current > 150) {
        lastUpdate.current = now;
        const currentFps = 1000 / delta;
        
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        const downlinkValue = connection ? connection.downlink : 0;
        const downlink = connection ? `${downlinkValue}MB/s` : 'LOW_LATENCY';

        // CPU fluctuation logic
        const baseLoad = 10 + Math.abs(Math.sin(now / 4000)) * 50; 
        const jitter = (Math.random() - 0.5) * 12;
        const loadFactor = Math.min(70, Math.max(10, baseLoad + jitter));

        // Memory oscillation logic
        const memDelta = (Math.random() * 0.4) * memDir.current;
        memValue.current += memDelta;
        if (memValue.current > 512) memDir.current = -1;
        if (memValue.current < 128) memDir.current = 1;

        const fpsVal = isFinite(currentFps) ? Math.round(currentFps) : 60;

        setStats({
          cpu: `${loadFactor.toFixed(1)}%`,
          ram: `${memValue.current.toFixed(1)}MB`,
          net: downlink,
          cores: logicalProcessors.toString(),
          fps: fpsVal.toString()
        });

        setFpsHistory(prev => [...prev.slice(1), Math.min(120, fpsVal)]);
        setCpuHistory(prev => [...prev.slice(1), loadFactor]);
        setMemHistory(prev => [...prev.slice(1), memValue.current]);
      }

      requestAnimationFrame(updateMetrics);
    };

    const animId = requestAnimationFrame(updateMetrics);
    return () => cancelAnimationFrame(animId);
  }, []);

  const renderSparkline = (data: number[], max: number, color: string) => {
    const width = 200;
    const height = 30;
    const step = width / (data.length - 1);
    const points = data.map((d, i) => `${i * step},${height - (Math.min(max, d) / max) * height}`).join(' ');
    
    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="opacity-40" style={{ willChange: 'transform' }}>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          points={points}
          className="transition-all duration-300"
        />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'THREAD_COUNT', val: stats.cores, icon: '◈' },
          { label: 'CPU_LOAD', val: stats.cpu, icon: '⚡', history: cpuHistory, hMax: 100, color: '#3b82f6' },
          { label: 'MEMORY_ALLOC', val: stats.ram, icon: '▯', history: memHistory, hMax: 512, color: '#10b981' },
          { label: 'SIGNAL_FLOW', val: stats.net, icon: '⇅' },
        ].map(item => (
          <div key={item.label} className="p-3 border border-[#1a1a1a] bg-[#050505] group/stat hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[7px] text-[#333] font-black uppercase tracking-widest group-hover/stat:text-blue-500 transition-colors">
                {item.icon} {item.label}
              </span>
              {item.history && (
                <div className="w-16">
                  {renderSparkline(item.history, item.hMax || 100, item.color || '#3b82f6')}
                </div>
              )}
            </div>
            <span className="text-sm font-black text-white font-mono tracking-tighter">
              {item.val}
            </span>
            <div className="absolute bottom-0 left-0 h-[1px] bg-blue-500/20 w-0 group-hover/stat:w-full transition-all duration-700"></div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border border-[#1a1a1a] bg-[#050505] relative group">
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col">
            <span className="text-[8px] text-[#262626] font-black uppercase tracking-widest group-hover:text-white transition-colors">OS_STABILITY_INDEX</span>
            <span className="text-[7px] text-blue-500/50 font-bold">FRAME_TIME: {(1000/parseInt(stats.fps)).toFixed(2)}MS</span>
          </div>
          <span className="text-[10px] text-blue-500 font-black font-mono animate-pulse">{stats.fps} HZ</span>
        </div>
        
        <div className="h-8 mb-2">
          {renderSparkline(fpsHistory, 120, '#3b82f6')}
        </div>

        <div className="w-full h-[2px] bg-[#1a1a1a] relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(59,130,246,0.4)]" 
            style={{ width: `${Math.min(100, (parseInt(stats.fps) / 60) * 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="px-1 py-2 text-[7px] text-[#262626] font-mono leading-tight uppercase tracking-tight select-none border-t border-[#141414]">
        <div className="flex justify-between hover:text-blue-500/80 transition-colors">
          <span>> KERNEL_WATCHDOG</span>
          <span className="text-emerald-500/60">ACTIVE_HEALTHY</span>
        </div>
        <div className="flex justify-between hover:text-blue-500/80 transition-colors">
          <span>> CONCURRENCY_NODE</span>
          <span>LOCK_STABLE</span>
        </div>
        <div className="flex justify-between hover:text-blue-500/80 transition-colors">
          <span>> AGENT_ENV</span>
          <span>{navigator.platform || 'LOCAL_HOST'}</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;