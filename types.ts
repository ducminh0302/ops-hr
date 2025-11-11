
export interface Candidate {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  aiScore: number;
  strengths: string;
  weaknesses: string;
  recommendation: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
}

export interface Education {
  degree: string;
  institution: string;
}

export enum ModalType {
  NONE,
  AI_ASSISTANT_MAIN,
  SCREENING,
  JD_GENERATOR,
  INTERVIEW_QUESTIONS
}
