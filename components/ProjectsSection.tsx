
import React from 'react';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase mb-6">Prototypes</h2>
            <h3 className="text-5xl font-black text-slate-100 tracking-tighter uppercase">Engineering <br/>Modules.</h3>
          </div>
          <p className="text-slate-500 max-w-sm font-bold text-[11px] uppercase tracking-wide leading-relaxed">
            Functional builds focusing on data integrity, persistence, and real-time execution protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="bg-[#080808] p-1">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
