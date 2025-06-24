
import React from 'react';
import { PORTFOLIO_PROJECTS } from '../../constants';
import { PortfolioItem } from '../../types';

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 group">
      <figure className="aspect-video overflow-hidden">
        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </figure>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-text-light dark:text-text-dark">{item.title}</h3>
        <div className="mb-3">
          {item.tags.map(tag => (
            <span key={tag} className="inline-block bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-dark text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 h-20 overflow-y-auto">{item.description}</p>
        <div className="flex space-x-3">
          {item.liveUrl && item.liveUrl !== '#' && (
            <a 
              href={item.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent hover:bg-green-600 dark:bg-accent-dark dark:hover:bg-green-500 transition-colors duration-200"
            >
              <ion-icon name="eye-outline" class="mr-2"></ion-icon> Live Demo
            </a>
          )}
          {item.repoUrl && item.repoUrl !== '#' && (
            <a 
              href={item.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-text-light dark:text-text-dark bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <ion-icon name="logo-github" class="mr-2"></ion-icon> View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const PortfolioSection: React.FC = () => {
  return (
    <article className="space-y-8">
      <header className="pb-2">
        <h2 className="text-4xl font-bold text-text-light dark:text-text-dark mb-2">
          My <span className="text-accent dark:text-accent-dark">Portfolio</span>
        </h2>
        <div className="w-20 h-1 bg-accent dark:bg-accent-dark rounded-full"></div>
      </header>

      <p className="text-gray-600 dark:text-gray-300 text-center">
        Here are some of the projects I've worked on. Feel free to explore them!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {PORTFOLIO_PROJECTS.map((item: PortfolioItem) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </article>
  );
};

export default PortfolioSection;
