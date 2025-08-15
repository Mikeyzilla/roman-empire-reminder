export interface Badge {
  key: string;
  title: string;
  description: string;
  src: string;             
  requirement: UnlockRequirement;
}

export type Metric = 'factsViewed' | 'likes' | 'streakDays';

export type UnlockRequirement =
  | { kind: 'counter'; metric: Metric; value: number }                   
  | { kind: 'categoryCount'; category: string; value: number } 
  | { kind: 'and'; all: UnlockRequirement[] }
  | { kind: 'or'; any: UnlockRequirement[] };


export interface Stats {
  factsViewed: number;
  likes: number;
  streakDays: number;
  categoryCounts: Record<string, number>;
}