// utils/types.ts

export interface ExperienceField {
  id: number;
  experience: string;
  responsibilities: string;
}

export interface Experience {
  company: string;
  duration: string;
  title: string;
  location: string;
  duties: string[];
}

export interface Project {
  name: string;
  skills: string[];
  date: string;
  details: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  graduationStart: string;
  graduationEnd: string;
  gpa: string;
  location: string;
}

export interface Skills {
  skills: string[];
  technologies: string[];
  tools: string[];
  languages: string[];
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  phone: string;
  github: string;
  website: string;
}
;