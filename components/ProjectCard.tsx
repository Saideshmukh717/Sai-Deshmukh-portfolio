
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="p-8 md:p-12 h-full flex flex-col border border-transparent hover:border-slate-800 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] group">
      <div className="flex justify-between items-center mb-10">
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] px-3 py-1 bg-slate-900 border border-slate-800 text-slate-500 uppercase">
          {project.type}
        </span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
      
      <h3 className="text-3xl font-black text-slate-100 mb-6 tracking-tighter uppercase group-hover:text-blue-500 transition-colors leading-none">
        {project.title}
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-10">
        {project.techStack.map((tech, i) => (
          <span key={i} className="text-[9px] font-mono text-slate-600 bg-slate-900/50 px-2 py-0.5 border border-slate-800/50 uppercase">
            {tech}
          </span>
        ))}
      </div>

      <ul className="space-y-4 mt-auto">
        {project.description.map((point, i) => (
          <li key={i} className="flex gap-4 text-slate-400 text-xs leading-relaxed font-bold uppercase tracking-tight">
            <span className="mt-1 w-1.5 h-1.5 bg-blue-500 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectCard;
