import React, { useState, useEffect, useRef } from 'react';

const BOOT_LOGS = [
  "CORE_KERNEL_LOAD: SD_OS_V2.4.0-STABLE",
  "ESTABLISHING_OBSERVER_LAYER: V1.0-ACTIVE",
  "MOUNTING_LOCAL_RESOURCES: /DEV/PERSISTENCE... [DONE]",
  "ESTABLISHING_LAN_PROTOCOL: SYN_SENT... SYN_ACK...",
  "CLUSTER_HANDSHAKE: NODE_GUJ_01 VERIFIED",
  "MEMORY_RESERVATION: 128MB SECURED",
  "SCANNING_CASE_FILES: CF_001, CF_002 DETECTED",
  "LOADING_DOCTRINE: PHILOSOPHY_MODULE_V1",
  "SENSING_ENVIRONMENT: CLIENT_SIGNAL_SYNCING",
  "...",
  "SYSTEM_ONLINE // OBSERVATION_LAYER_READY",
  "INITIALIZING_INTERFACE..."
];

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rotation = useRef({ x: 0, y: 0 });

  // Globe parameters - Fibonacci sphere
  const points = useRef<{x: number, y: number, z: number}[]>([]);
  const pointCount = 450; // Balanced for performance

  useEffect(() => {
    const pts = [];
    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;
      pts.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi)
      });
    }
    points.current = pts;
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSound = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1, volume: number = 0.1) => {
    try {
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state === 'suspended') return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  const handleInitialize = () => {
    initAudio();
    setIsExpanding(true);
    playSound(80, 'sine', 0.8, 0.15);
    
    // Faster expansion transition
    setTimeout(() => {
      setHasStarted(true);
      playStartupChime();
    }, 600);
  };

  const playStartupChime = () => {
    playSound(200, 'square', 0.3, 0.05);
    setTimeout(() => playSound(400, 'square', 0.4, 0.05), 100);
    setTimeout(() => playSound(600, 'square', 0.5, 0.03), 200);
  };

  const playSystemOnlineChime = () => {
    playSound(440, 'sine', 0.4, 0.1);
    setTimeout(() => playSound(880, 'sine', 0.6, 0.05), 80);
    setTimeout(() => playSound(1320, 'sine', 0.8, 0.02), 160);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrame: number;
    let expansionScale = 1;

    const render = () => {
      const width = canvas.width = window.innerWidth;
      const height = canvas.height = window.innerHeight;
      
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      if (isExpanding && expansionScale < 40) {
        expansionScale += 2.2; // Faster expansion
      }

      rotation.current.y += 0.005 + (mousePos.current.x - width / 2) * 0.00003;
      rotation.current.x += (mousePos.current.y - height / 2) * 0.00003;

      const cosY = Math.cos(rotation.current.y);
      const sinY = Math.sin(rotation.current.y);
      const cosX = Math.cos(rotation.current.x);
      const sinX = Math.sin(rotation.current.x);

      const radius = Math.min(width, height) * 0.28 * expansionScale;
      const centerX = width / 2;
      const centerY = height / 2;
      
      points.current.forEach((p) => {
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;

        const depth = (z + 1.2) / 2.4;
        const opacity = isExpanding ? Math.max(0, depth - expansionScale / 20) : depth * 0.7;

        if (opacity > 0) {
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;
          const dotSize = isExpanding ? 1 : 1.2 * depth;
          ctx.beginPath();
          ctx.arc(centerX + x * radius, centerY + y * radius, dotSize, 0, 6.28);
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [isExpanding]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_LOGS.length) {
        const nextLog = BOOT_LOGS[currentLine];
        setLogs(prev => [...prev, nextLog]);
        if (nextLog.includes('SYSTEM_ONLINE')) {
          playSystemOnlineChime();
        } else if (nextLog !== '...') {
          playSound(1000 + Math.random() * 500, 'sine', 0.03, 0.01);
        }
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Drastically reduced end delay
      }
    }, 50); // Significantly faster log scrolling (50ms vs 130ms)
    return () => clearInterval(interval);
  }, [hasStarted, onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
      onClick={!isExpanding ? handleInitialize : undefined}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ willChange: 'contents' }} />
      
      {!hasStarted && (
        <div className={`relative z-10 flex flex-col items-center gap-6 transition-opacity duration-300 ${isExpanding ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex flex-col items-center gap-2 group">
            <span className="font-mono text-[14px] text-white tracking-[0.8em] uppercase font-black transition-all group-hover:text-blue-500 animate-pulse">
              [ CLICK TO INITIALIZE ]
            </span>
            <div className="flex gap-4 items-center opacity-30">
               <span className="h-[1px] w-12 bg-blue-500"></span>
               <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase font-bold">
                SIGNAL_ID: AUTH_NODE_X1
               </span>
               <span className="h-[1px] w-12 bg-blue-500"></span>
            </div>
          </div>
        </div>
      )}

      {hasStarted && (
        <div className="relative z-10 w-full max-w-xl px-12 font-mono text-[11px] leading-relaxed text-[#444] animate-[fadeIn_0.3s_ease-out]">
          <div className="space-y-1">
            {logs.map((log, i) => (
              <div 
                key={i} 
                className={`${log.includes('SYSTEM_ONLINE') ? 'text-blue-500 font-black glitch-line' : ''} animate-[bootLine_0.05s_ease-out_both]`}
              >
                {log && typeof log === 'string' && log.startsWith('...') ? log : `> ${log}`}
              </div>
            ))}
            <div className="w-2 h-4 bg-white blink mt-5 shadow-[0_0_12px_rgba(255,255,255,0.8)]"></div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bootLine {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .glitch-line {
          position: relative;
          animation: glitch-anim 0.2s infinite alternate;
        }
        @keyframes glitch-anim {
          0% { transform: translate(0); color: #3b82f6; }
          30% { transform: translate(-1px, 1px); text-shadow: 1px 0 #3b82f6; }
          60% { transform: translate(1px, -1px); text-shadow: -1px 0 #ef4444; }
          100% { transform: translate(0); color: #fff; }
        }
      `}</style>
    </div>
  );
};

export default BootSequence;