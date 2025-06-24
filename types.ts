
export type Theme = 'light' | 'dark';
export type ActiveSection = 'about' | 'resume' | 'portfolio' | 'blog' | 'contact';

export interface ContactInfo {
  type: 'email' | 'phone' | 'birthday' | 'location' | 'github';
  label: string;
  value: string;
  link?: string;
  iconName: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
}

export interface PersonalDetails {
  avatarUrl: string;
  name: string;
  title: string;
  contacts: ContactInfo[];
  socials: SocialLink[];
}

export interface NavItem {
  id: ActiveSection;
  label: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Skill {
  name: string;
  level: number; // Percentage 0-100
  iconName?: string; 
}

export interface ResumeContent {
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: Skill[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}
