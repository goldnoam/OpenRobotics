
export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export enum ResourceCategory {
  Software = 'Software',
  Simulation = 'Simulation',
  Hardware = 'Hardware',
  Vision = 'Vision',
  AI = 'AI'
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  link: string;
  category: ResourceCategory;
  difficulty: Difficulty;
  isCommercial: boolean;
  tags: string[];
}

export interface RoadmapStep {
  title: string;
  description: string;
  level: Difficulty;
  tools: string[];
}

export interface ComparisonEntry {
  name: string;
  useCase: string;
  difficulty: Difficulty;
  industryStandard: string;
  license: string;
  language: string;
}
