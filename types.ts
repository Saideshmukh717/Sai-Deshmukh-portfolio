
export interface CaseFile {
  id: string;
  title: string;
  objective: string;
  constraints: string[];
  architecture: string;
  tradeoffs: string[];
  metrics: string;
  failures: string;
  stack: string[];
}

export interface LogEntry {
  date: string;
  title: string;
  status: 'deploy' | 'research' | 'iteration';
  content: string;
}

export interface PhilosophyEntry {
  title: string;
  statement: string;
}

// Fix: Added missing Project interface for ProjectCard and ProjectsSection
export interface Project {
  type: string;
  title: string;
  techStack: string[];
  description: string[];
}

// Fix: Added missing SkillGroup interface for SkillsSection
export interface SkillGroup {
  category: string;
  items: string[];
}

// Fix: Added missing Education interface for EducationSection
export interface Education {
  institution: string;
  degree: string;
  major: string;
  location: string;
  graduation: string;
}
