
import { PersonalDetails, NavItem, ResumeContent, PortfolioItem, ActiveSection, SupportedLanguage, SUPPORTED_LANGUAGES_MAP } from './types';

export const PERSONAL_DETAILS: PersonalDetails = {
  name: "Nischal Shrestha",
  title: "Web Developer, AI Engineer",
  avatarUrl: "https://res.cloudinary.com/dzpsk0uhe/image/upload/v1752909119/nischal_pic_r0odxs.png",
  contacts: [
    { type: 'github', label: 'GitHub', value: 'nischalstha-ns', link: 'https://github.com/nischalstha-ns', iconName: 'logo-github' },
    { type: 'email', label: 'Email', value: 'niscthastha123@gmail.com', link: 'mailto:niscthastha123@gmail.com', iconName: 'mail-outline' },
    { type: 'phone', label: 'Phone (Primary)', value: '+977 9808548593', link: 'tel:+9779808548593', iconName: 'call-outline' },
    { type: 'phone', label: 'Phone (Secondary)', value: '+977 9764638377', link: 'tel:+9779764638377', iconName: 'call-outline' },
    { type: 'birthday', label: 'Birthday', value: 'September 29, 2004', iconName: 'calendar-outline' },
    { type: 'location', label: 'Location', value: 'Tokha, Kathmandu, Nepal', iconName: 'location-outline' },
  ],
  socials: [
    { name: 'Facebook', url: 'https://www.facebook.com/nischal.shrestha.1248/', iconName: 'logo-facebook' },
    { name: 'Twitter', url: '#', iconName: 'logo-twitter' }, // Assuming '#' means no specific link for now
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
  summary: "Passionate Full-Stack Developer and AI Engineer with expertise in modern web technologies and machine learning. Experienced in building scalable applications and implementing AI solutions. Committed to delivering high-quality, user-centric software solutions.",
  education: [
    { degree: 'High School (Managment)', institution: 'South Western State College', period: '2021 - 2023', description: 'Focused on Computer Science and Mathematics with distinction.' },
    { degree: 'Bachlor In Information Technology (BIT)', institution: 'Nation College Of Managment And Techonogy Science', period: '2023 - Present', description: 'Lincon University' },
  ],
  experience: [
    {
  role: 'Sales Marketing & Mentor',
  company: 'Nischal Fancy Store',
  period: 'Jan 2024 - Present',
  responsibilities: [
    'Developed and executed digital marketing strategies to increase online sales and brand visibility.',
    'Designed and managed promotional campaigns, resulting in a 35% boost in customer engagement.',
    'Mentored a team of junior staff in sales techniques, product knowledge, and customer service excellence.',
    'Integrated AI chatbot using Google Gemini API to enhance customer support and automate FAQs.',
    'Collaborated with developers to improve e-commerce website performance and streamline user experience.'
  ]
}

    // { role: 'Sales Marketing & Mentor', company: 'Nischal Fancy Store', period: 'Jan 2024 - Present', responsibilities: ['Built end-to-end web applications using React, Node.js, and MongoDB.', 'Implemented AI chatbot solutions using Google Gemini API.', 'Led a team of 3 developers in agile development cycles.', 'Optimized application performance resulting in 40% faster load times.'] },
    // { role: 'Frontend Developer Intern', company: 'Tech Solutions Inc.', period: 'Summer 2023', responsibilities: ['Developed responsive UI components using React and Tailwind CSS.', 'Collaborated with designers and backend developers.', 'Participated in code reviews and agile sprints.'] }
  ],
  skills: [
    { name: 'JavaScript', level: 95, iconName: 'logo-javascript' },
    { name: 'React', level: 50, iconName: 'logo-react' },
    { name: 'TypeScript', level: 40 },
    { name: 'Node.js', level: 80, iconName: 'logo-nodejs' },
    { name: 'Python', level: 40 },
    { name: 'Next.js', level: 60 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'MongoDB', level: 75 },
    // { name: 'PostgreSQL', level: 70 },
    { name: 'HTML5', level: 98, iconName: 'logo-html5' },
    { name: 'CSS3', level: 95, iconName: 'logo-css3' },
    { name: 'Git & GitHub', level: 90, iconName: 'logo-github' },
    // { name: 'Docker', level: 65 },
    // { name: 'AWS', level: 60 },
    // { name: 'AI/ML Concepts', level: 75 }
  ]
};

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  { id: 'proj1', title: 'E-commerce Platform', description: 'A full-featured e-commerce website with product listings, cart functionality, and user accounts. With the Admin panel.', imageUrl: 'https://res.cloudinary.com/dzpsk0uhe/image/upload/v1752909120/ecommerce_home_vjnoyy.png', tags: ['React', 'Node.js', 'Firebase', 'Tailwind CSS'], liveUrl: 'https://nfstokha.netlify.app/', repoUrl: 'https://github.com/nischalstha-ns/e-commerce' },
  { id: 'proj2', title: 'AI Chatbot Assistant', description: 'An intelligent chatbot assistant integrated into a web application, capable of answering user queries.', imageUrl: 'https://res.cloudinary.com/dzpsk0uhe/image/upload/v1752909118/chatbot_ilevig.png', tags: ['Python', 'Flask', 'NLP', 'React'], liveUrl: 'https://npchatbot.nischalshrestha6.com.np/', repoUrl: 'https://github.com/nischalstha-ns/NP_Chatbot' },
  { id: 'proj3', title: 'Snake Game', description: 'Easy to play the game with the website.', imageUrl: 'https://res.cloudinary.com/dzpsk0uhe/image/upload/v1752909118/Snake_game_kde1u2.png', tags: ['React', 'Game Development', 'Material UI'], liveUrl: 'https://snakenp.nischalshrestha6.com.np/', repoUrl: 'https://github.com/nischalstha-ns/Snake-NP_Game' },
  // { id: 'proj3', title: 'Personal Blog', description: 'A dynamic personal blog platform with markdown support and a clean, responsive design.', imageUrl: 'YOUR_IMAGE_URL_HERE', tags: ['Next.js', 'GraphQL', 'Tailwind CSS'], liveUrl: '#', repoUrl: '#' },
];

// Chatbot Constants
export const CHATBOT_MODEL_NAME = 'Nischal_Shrestha';
export const CHATBOT_INITIAL_LANGUAGE: SupportedLanguage = 'en-US';

export const WELCOME_MESSAGES: Record<SupportedLanguage, string> = {
  'en-US': `Hello! I'm Nischal's AI Assistant. How can I help you learn more about his work and skills today? You can also click the microphone to talk to me!`,
  'ne-NP': `नमस्ते! म निश्चलको एआई सहायक हुँ। आज म तपाईंलाई निश्चलको काम र सीपहरूको बारेमा थप जान्न कसरी मद्दत गर्न सक्छु? तपाईं मसँग कुरा गर्न माइक्रोफोन बटनमा क्लिक गर्न सक्नुहुन्छ!`,
  'hi-IN': `नमस्ते! मैं निश्चल का एआई सहायक हूँ। आज मैं आपको निश्चल के काम और कौशल के बारे में अधिक जानने में कैसे मदद कर सकता हूँ? आप मुझसे बात करने के लिए माइक्रोफ़ोन बटन पर क्लिक कर सकते हैं!`,
};

export const getChatbotSystemInstruction = (language: SupportedLanguage): string => {
  const langName = SUPPORTED_LANGUAGES_MAP[language].name;

  const contactDetailsList = PERSONAL_DETAILS.contacts.map(contact => {
    let detail = `- ${contact.label}: ${contact.value}`;
    if (contact.link) {
      detail += ` (Accessible at: ${contact.link})`;
    }
    return detail;
  }).join('\n');

  const socialMediaList = PERSONAL_DETAILS.socials.map(social => 
    `- ${social.name}: ${social.url === '#' ? 'Link not specified, available on portfolio sidebar.' : social.url}`
  ).join('\n');

  const educationDetails = RESUME_DATA.education.map(edu => 
    `- ${edu.degree} from ${edu.institution} (${edu.period}). ${edu.description ? `Focus: ${edu.description}` : ''}`
  ).join('\n');

  const experienceDetails = RESUME_DATA.experience.map(exp => 
    `- ${exp.role} at ${exp.company} (${exp.period}). Responsibilities included: ${exp.responsibilities.join(', ')}.`
  ).join('\n');

  const skillsList = RESUME_DATA.skills.map(s => `${s.name} (Proficiency: ${s.level}%)`).join(', ');

  const projectDetails = PORTFOLIO_PROJECTS.map(p => 
    `- Project: "${p.title}". Description: ${p.description}. Tags: ${p.tags.join(', ')}. ${p.liveUrl !== '#' ? `Live demo: ${p.liveUrl}.` : ''} ${p.repoUrl !== '#' ? `Repository: ${p.repoUrl}.` : ''}`
  ).join('\n');
  
  const services = [
    { title: "Web Development", description: "Crafting responsive and dynamic websites using modern technologies like React, Next.js, and Node.js." },
    { title: "AI Engineering", description: "Exploring and implementing AI/ML solutions, with a focus on natural language processing and machine learning models." },
    { title: "UI/UX Design", description: "Focusing on creating intuitive and engaging user experiences with a keen eye for detail and aesthetics." }
  ];
  const servicesSummary = services.map(s => `- ${s.title}: ${s.description}`).join('\n');

  const philosophy = "Nischal believes in clean code, user-centric design, and continuous improvement. Collaboration and open communication are key to successful projects.";
  const interests = "Beyond coding, Nischal enjoys exploring new technologies, contributing to open-source projects, playing chess, and occasionally diving into sci-fi literature.";
  const aboutMeExtra = "He thrives on challenges and is constantly seeking opportunities to learn and grow, especially in the dynamic fields of web development and artificial intelligence. His goal is to leverage technology to build impactful and elegant solutions.";


  return `You are Nischal's AI Assistant, a friendly, professional, and helpful AI assistant for Nischal Shrestha's portfolio website.
Your primary goal is to provide comprehensive information about Nischal Shrestha based on the details provided below and guide users through his portfolio.
You MUST respond exclusively in ${langName}. Do not use any other language, regardless of the user's input language.
You have access to all of Nischal's portfolio information and you SHOULD share these details when asked, including contact information like email and phone numbers.

Key Information about Nischal Shrestha:
- Full Name: ${PERSONAL_DETAILS.name}
- Title: ${PERSONAL_DETAILS.title}
- Summary: ${RESUME_DATA.summary} ${aboutMeExtra}

Contact Information (You can share these details directly if asked):
${contactDetailsList}

Social Media Links:
${socialMediaList}

Education:
${educationDetails}

Experience:
${experienceDetails}

Skills:
Nischal is proficient in the following technologies and concepts: ${skillsList}.

Portfolio Projects:
${projectDetails}

Services Offered / What Nischal Does:
${servicesSummary}

Nischal's Philosophy:
${philosophy}

Nischal's Interests:
${interests}

General Guidelines:
- Keep your answers concise, informative, and maintain a friendly yet professional tone.
- If a user asks for information that is explicitly listed above (e.g., email, phone, project details), provide it directly and accurately.
- If you don't know an answer to a question because it's not in the information provided to you, politely state that you don't have that specific information. Do not invent information.
- Your knowledge is limited to the comprehensive information provided here.
- Always remember to respond only in ${langName}.

Start the conversation by being welcoming and offering assistance.
Current language for response: ${langName}.`;
};
