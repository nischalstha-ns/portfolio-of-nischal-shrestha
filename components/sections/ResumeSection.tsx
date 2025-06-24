

import React from 'react';
import { RESUME_DATA } from '../../constants';
import { EducationEntry, ExperienceEntry, Skill } from '../../types';

const SectionTitle: React.FC<{ title: string; iconName: string }> = ({ title, iconName }) => (
  <div className="flex items-center mb-6">
    <ion-icon name={iconName} class="text-3xl text-accent dark:text-accent-dark mr-3"></ion-icon>
    <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark">{title}</h3>
  </div>
);

const TimelineItem: React.FC<{ period: string; title: string; subtitle: string; children?: React.ReactNode }> = ({ period, title, subtitle, children }) => (
  <li className="mb-8 ml-6 relative">
    <span className="absolute flex items-center justify-center w-6 h-6 bg-accent/20 dark:bg-accent-dark/20 rounded-full -left-3 ring-4 ring-secondary-light dark:ring-secondary-dark">
      <ion-icon name="ellipse" class="text-xs text-accent dark:text-accent-dark"></ion-icon>
    </span>
    <div className="p-4 bg-secondary-light dark:bg-secondary-dark rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <time className="block mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">{period}</time>
      <h4 className="text-lg font-semibold text-text-light dark:text-text-dark">{title}</h4>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{subtitle}</p>
      {children && <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">{children}</div>}
    </div>
  </li>
);

const SkillItem: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="mb-4 p-4 bg-secondary-light dark:bg-secondary-dark rounded-lg shadow-sm">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-text-light dark:text-text-dark flex items-center">
        {skill.iconName && <ion-icon name={skill.iconName} class="mr-2 text-accent dark:text-accent-dark text-lg"></ion-icon>}
        {skill.name}
      </span>
      <span className="text-xs font-medium text-accent dark:text-accent-dark">{skill.level}%</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div 
        className="bg-gradient-to-r from-green-400 to-accent dark:from-green-500 dark:to-accent-dark h-2.5 rounded-full transition-all duration-1000 ease-out" 
        style={{ width: `${skill.level}%` }}
      ></div>
    </div>
  </div>
);

const ResumeSection: React.FC = () => {
  const { education, experience, skills } = RESUME_DATA;

  return (
    <article className="space-y-10">
      <header className="pb-2">
        <h2 className="text-4xl font-bold text-text-light dark:text-text-dark mb-2">
          My <span className="text-accent dark:text-accent-dark">Resume</span>
        </h2>
        <div className="w-20 h-1 bg-accent dark:bg-accent-dark rounded-full"></div>
      </header>

      <section>
        <SectionTitle title="Education" iconName="school-outline" />
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {education.map((entry: EducationEntry, index: number) => (
            <TimelineItem key={index} period={entry.period} title={entry.degree} subtitle={entry.institution}>
              {entry.description && <p>{entry.description}</p>}
            </TimelineItem>
          ))}
        </ol>
      </section>

      <section>
        <SectionTitle title="Experience" iconName="briefcase-outline" />
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {experience.map((entry: ExperienceEntry, index: number) => (
            <TimelineItem key={index} period={entry.period} title={entry.role} subtitle={entry.company}>
              <ul className="list-disc list-inside pl-2">
                {entry.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
              </ul>
            </TimelineItem>
          ))}
        </ol>
      </section>

      <section>
        <SectionTitle title="Skills" iconName="barbell-outline" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {skills.map((skill: Skill, index: number) => (
            <SkillItem key={index} skill={skill} />
          ))}
        </div>
      </section>
    </article>
  );
};

export default ResumeSection;
