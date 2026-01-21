
import React from 'react';
import { EDUCATION, RELEVANT_COURSEWORK } from '../constants';

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3">
          <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-8">Academic_Protocol</h2>
          <div className="border border-slate-800 p-8 bg-slate-900/10">
            <h3 className="text-xs font-mono text-blue-500 mb-4">DEGREE_VERIFIED</h3>
            <h4 className="text-2xl font-black mb-1 uppercase tracking-tighter">{EDUCATION.degree}</h4>
            <p className="text-sm font-bold text-slate-400 mb-6 uppercase">{EDUCATION.major}</p>
            
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-600">INSTITUTION</span>
                <span className="text-slate-200 uppercase">{EDUCATION.institution}</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-600">LOCATION</span>
                <span className="text-slate-200 uppercase">{EDUCATION.location}</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-600">TIMESTAMP</span>
                <span className="text-slate-200 uppercase">{EDUCATION.graduation}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-8">Knowledge_Domains</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RELEVANT_COURSEWORK.map((course, idx) => (
              <div key={idx} className="p-4 border border-[#1a1a1a] bg-[#0c0c0c] hover:border-slate-700 transition-colors flex items-center gap-4 group">
                <div className="w-1.5 h-1.5 bg-slate-800 group-hover:bg-blue-500 transition-colors"></div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{course}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
