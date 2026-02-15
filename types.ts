
export enum Difficulty {
  Beginner = 'מתחילים',
  Intermediate = 'בינוניים',
  Advanced = 'מתקדמים'
}

export enum ResourceCategory {
  Software = 'תוכנה',
  Simulation = 'סימולציה',
  Hardware = 'חומרה',
  Vision = 'ראייה ממוחשבת',
  AI = 'בינה מלאכותית'
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
