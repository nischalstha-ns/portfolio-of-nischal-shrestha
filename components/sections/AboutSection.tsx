
import React from 'react';
import { PersonalDetails } from '../../types'; // Removed ResumeContent as skills are not directly used here from RESUME_DATA for skills list
import { RESUME_DATA } from '../../constants';

interface AboutSectionProps {
  personalDetails: PersonalDetails;
}

const SectionCard: React.FC<{title: string, children: React.ReactNode, iconName?: string}> = ({ title, children, iconName }) => (
  <div className="bg-secondary-light dark:bg-secondary-dark p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <div className="flex items-center mb-4">
      {iconName && <ion-icon name={iconName} class="text-2xl text-accent dark:text-accent-dark mr-3"></ion-icon>}
      <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">{title}</h3>
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
      {children}
    </div>
  </div>
);


const AboutSection: React.FC<AboutSectionProps> = ({ personalDetails }) => {
  const { summary } = RESUME_DATA; // personalDetails is passed but not used. summary comes from RESUME_DATA

  return (
    <article className="space-y-8">
      <header className="pb-2">
        <h2 className="text-4xl font-bold text-text-light dark:text-text-dark mb-2">
          About <span className="text-accent dark:text-accent-dark">Me</span>
        </h2>
        <div className="w-20 h-1 bg-accent dark:bg-accent-dark rounded-full"></div>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <SectionCard title="Who I Am" iconName="person-outline">
          <p className="text-base leading-relaxed">{summary}</p>
          <p className="mt-4 text-base">
            I thrive on challenges and am constantly seeking opportunities to learn and grow, especially in the dynamic fields of web development and artificial intelligence. My goal is to leverage technology to build impactful and elegant solutions.
          </p>
        </SectionCard>

        <div className="space-y-8">
           <SectionCard title="My Philosophy" iconName="bulb-outline">
            <p>I believe in clean code, user-centric design, and continuous improvement. Collaboration and open communication are key to successful projects.</p>
          </SectionCard>
          <SectionCard title="Interests" iconName="game-controller-outline">
            <p>Beyond coding, I enjoy exploring new technologies, contributing to open-source projects, playing chess, and occasionally diving into sci-fi literature.</p>
          </SectionCard>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-6 mt-10 text-center">What I Do</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Web Development", description: "Crafting responsive and dynamic websites using modern technologies like React, Next.js, and Node.js.", icon: "code-slash-outline" },
            { title: "AI Engineering", description: "Exploring and implementing AI/ML solutions, with a focus on natural language processing and machine learning models.", icon: "cog-outline" },
            { title: "UI/UX Design", description: "Focusing on creating intuitive and engaging user experiences with a keen eye for detail and aesthetics.", icon: "color-palette-outline" }
          ].map(service => (
            <div key={service.title} className="bg-secondary-light dark:bg-secondary-dark p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
              <ion-icon name={service.icon} class="text-4xl text-accent dark:text-accent-dark mx-auto mb-4"></ion-icon>
              <h4 className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">{service.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default AboutSection;
