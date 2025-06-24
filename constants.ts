
import { PersonalDetails, NavItem, ResumeContent, PortfolioItem, ActiveSection } from './types';

export const PERSONAL_DETAILS: PersonalDetails = {
  name: "Nischal Shrestha",
  title: "Web Developer, AI Engineer",
  avatarUrl: "https://picsum.photos/seed/nischalavatar/120/120",
  contacts: [
    { type: 'github', label: 'GitHub', value: 'nischalstha-ns', link: 'https://github.com/nischalstha-ns', iconName: 'logo-github' },
    { type: 'email', label: 'Email', value: 'niscthastha123@gmail.com', link: 'mailto:niscthastha123@gmail.com', iconName: 'mail-outline' },
    { type: 'phone', label: 'Phone (Primary)', value: '+977 9808548593', link: 'tel:+9779808548593', iconName: 'call-outline' },
    { type: 'phone', label: 'Phone (Secondary)', value: '+977 9764638377', link: 'tel:+9779764638377', iconName: 'call-outline' },
    { type: 'birthday', label: 'Birthday', value: 'September 29, 2004', iconName: 'calendar-outline' },
    { type: 'location', label: 'Location', value: 'Tokha, Kathmandu, Nepal', iconName: 'location-outline' },
  ],
  socials: [
    { name: 'Facebook', url: 'https://www.facebook.com/nishal.shrestha.3388', iconName: 'logo-facebook' },
    { name: 'Twitter', url: '#', iconName: 'logo-twitter' },
    { name: 'Instagram', url: 'https://www.instagram.com/___not_dead___/', iconName: 'logo-instagram' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nischal-shrestha-ns/', iconName: 'logo-linkedin' },
  ]
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export const DEFAULT_SECTION: ActiveSection = 'about';

export const RESUME_DATA: ResumeContent = {
  summary: "Highly motivated and detail-oriented Web Developer and aspiring AI Engineer with a passion for creating innovative solutions and user-friendly applications. Proficient in modern web technologies and eager to contribute to challenging projects.",
  education: [
    { degree: 'High School Diploma (Science)', institution: 'National School of Sciences (NIST)', period: '2020 - 2022', description: 'Focused on Physics, Chemistry, and Mathematics.' },
    { degree: 'BSc. CSIT (Expected)', institution: 'Tribhuvan University (NCCS)', period: '2023 - Present', description: 'Pursuing Bachelor of Science in Computer Science and Information Technology.' },
  ],
  experience: [
    { role: 'Frontend Developer Intern', company: 'Tech Solutions Inc.', period: 'Summer 2023', responsibilities: ['Developed responsive UI components using React and Tailwind CSS.', 'Collaborated with designers and backend developers.', 'Participated in code reviews and agile sprints.'] },
    { role: 'Freelance Web Developer', company: 'Self-Employed', period: '2022 - Present', responsibilities: ['Designed and developed websites for small businesses.', 'Managed project timelines and client communication.', 'Integrated third-party APIs and services.'] },
  ],
  skills: [
    { name: 'JavaScript', level: 90, iconName: 'logo-javascript' },
    { name: 'React', level: 85, iconName: 'logo-react' },
    { name: 'TypeScript', level: 80 },
    { name: 'Node.js', level: 70, iconName: 'logo-nodejs' },
    { name: 'Python', level: 75 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'HTML5', level: 95, iconName: 'logo-html5' },
    { name: 'CSS3', level: 90, iconName: 'logo-css3' },
    { name: 'Git & GitHub', level: 85, iconName: 'logo-github' },
    { name: 'SQL', level: 65},
    { name: 'AI/ML Concepts', level: 60 }
  ]
};

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  { id: 'proj1', title: 'E-commerce Platform', description: 'A full-featured e-commerce website with product listings, cart functionality, and user accounts. Built with MERN stack.', imageUrl: 'https://picsum.photos/seed/ecom/400/300', tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'], liveUrl: '#', repoUrl: '#' },
  { id: 'proj2', title: 'Task Management App', description: 'A Kanban-style task management application to help users organize their projects and tasks efficiently.', imageUrl: 'https://picsum.photos/seed/taskapp/400/300', tags: ['React', 'Firebase', 'Material UI'], liveUrl: '#', repoUrl: '#' },
  { id: 'proj3', title: 'Personal Blog', description: 'A dynamic personal blog platform with markdown support and a clean, responsive design.', imageUrl: 'https://picsum.photos/seed/blogcms/400/300', tags: ['Next.js', 'GraphQL', 'Tailwind CSS'], liveUrl: '#', repoUrl: '#' },
  { id: 'proj4', title: 'AI Chatbot Assistant', description: 'An intelligent chatbot assistant integrated into a web application, capable of answering user queries.', imageUrl: 'https://picsum.photos/seed/aichat/400/300', tags: ['Python', 'Flask', 'NLP', 'React'], liveUrl: '#', repoUrl: '#' },
];
