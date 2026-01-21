import React, { useEffect, useRef, useState } from 'react';

const ArchitectureMap: React.FC = () => {
  const [isDrawn, setIsDrawn] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsDrawn(true);
      }
    }, { threshold: 0.5 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const nodes = [
    { x: 50, label: 'INGEST_V2', id: 'NODE_01', color: '#525252' },
    { x: 250, label: 'NORM_ENGINE', id: 'PROC_01', color: '#3b82f6' },
    { x: 450, label: 'INFERENCE_CORE', id: 'ML_04', color: '#3b82f6' },
    { x: 650, label: 'PERSISTENCE', id: 'STOR_09', color: '#525252' }
  ];

  const getPathColor = (index: number) => {
    if (!hoveredNode) return "#1a1a1a";
    const activeIndex = nodes.findIndex(n => n.id === hoveredNode);
    if (index === activeIndex || index === activeIndex - 1) return "#3b82f6";
    return "#141414";
  };

  const isPathActive = (index: number) => {
    if (!hoveredNode) return true;
    const activeIndex = nodes.findIndex(n => n.id === hoveredNode);
    return index === activeIndex || index === activeIndex - 1;
  };

  return (
    <div ref={containerRef} className="w-full aspect-[2/1] bg-[#050505] p-6 flex items-center justify-center relative overflow-hidden group">
      <svg className="w-full h-full max-h-80" viewBox="0 0 800 300">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#141414" strokeWidth="0.5"/>
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Connections */}
        <g strokeWidth="1" fill="none">
          {[0, 1, 2].map((i) => {
            const startX = 150 + i * 200;
            const endX = 250 + i * 200;
            const color = getPathColor(i);
            const active = isPathActive(i);
            
            return (
              <g key={i}>
                {/* Base Path */}
                <path 
                  d={`M ${startX} 150 L ${endX} 150`}
                  stroke={color}
                  className={`transition-all duration-700 ${isDrawn ? 'opacity-100' : 'opacity-0'}`}
                />
                {/* Flow Animation */}
                {active && isDrawn && (
                  <path 
                    d={`M ${startX} 150 L ${endX} 150`}
                    stroke={color}
                    strokeWidth="2"
                    filter="url(#glow)"
                    className="flow-line opacity-40"
                  />
                )}
              </g>
            );
          })}
        </g>
        
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g 
            key={node.id} 
            className={`cursor-pointer group/node transition-all duration-700 ${isDrawn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
            style={{ transitionDelay: `${i * 150}ms` }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Background Shape */}
            <rect 
              x={node.x} 
              y="110" 
              width="100" 
              height="80" 
              fill="#0a0a0a" 
              stroke={hoveredNode === node.id ? "#fff" : node.color} 
              strokeWidth="1"
              className="transition-all duration-300"
            />
            
            {/* Active Highlight Overlay */}
            {hoveredNode === node.id && (
              <rect 
                x={node.x} y="110" width="100" height="80" 
                fill="rgba(59,130,246,0.05)" 
                stroke="#3b82f6" strokeWidth="1"
                className="animate-pulse"
              />
            )}

            <text x={node.x + 50} y="145" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" className={`uppercase transition-colors ${hoveredNode === node.id ? 'fill-blue-500' : ''}`}>{node.label}</text>
            <text x={node.x + 50} y="165" textAnchor="middle" fill={node.color} fontSize="7" fontWeight="bold" opacity="0.5">[{node.id}]</text>
            
            {/* Decorative Corner Markers */}
            <rect x={node.x} y="110" width="3" height="3" fill={node.color} />
            <rect x={node.x + 97} y="110" width="3" height="3" fill={node.color} />
            <rect x={node.x} y="187" width="3" height="3" fill={node.color} />
            <rect x={node.x + 97} y="187" width="3" height="3" fill={node.color} />
          </g>
        ))}
      </svg>
      
      <div className="absolute top-4 right-4 text-[8px] text-[#262626] uppercase font-black tracking-[0.4em] select-none">
        TOPOLOGY_VIEWER // SYSTEM_MAP_v1.2
      </div>
      <div className="absolute bottom-4 left-4 text-[7px] text-[#404040] font-mono select-none">
        > INTERFACE_ACTIVE: TRUE <br/>
        > OBSERVER_STATE: {hoveredNode ? `ANALYZING_${hoveredNode}` : 'PASSIVE_WATCH'}
      </div>
    </div>
  );
};

export default ArchitectureMap;