export type QuestionOption = {
    value: string;
    label: string;
  };
  
  export type Question = {
    id: number;
    text: string;
    options: QuestionOption[];
  };
  
  export type VarkScores = {
    V: number;
    A: number;
    R: number;
    K: number;
  };
  
  export type LearningPreference = 'Visual' | 'Aural' | 'Read/Write' | 'Kinesthetic';