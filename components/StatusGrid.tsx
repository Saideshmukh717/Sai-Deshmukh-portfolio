
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const StatusGrid: React.FC = () => {
  // Fix: Mapping properties correctly to existing fields in PERSONAL_INFO.status
  const items = [
    { label: 'CURRENT_BUILD', value: PERSONAL_INFO.status.kernel },
    { label: 'SYSTEM_STATE', value: PERSONAL_INFO.status.state },
    { label: 'TECH_STACK', value: PERSONAL_INFO.stack.join(', ') },
    { label: 'LAST_UPDATE', value: PERSONAL_INFO.status.last_update },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a] border-[#1a1a1a] border mt-16">
      {items.map((item) => (
        <div key={item.label} className="bg-[#080808] p-6">
          <p className="font-mono text-[9px] font-bold text-blue-500 mb-2 tracking-[0.2em]">{item.label}</p>
          <p className="text-xs font-bold text-slate-300 leading-tight">{item.value.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
};

export default StatusGrid;
