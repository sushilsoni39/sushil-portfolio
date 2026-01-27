
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  project?: string;
  techStack?: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string;
}

export interface Certification {
  title: string;
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
