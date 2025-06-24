

import React from 'react';

const BlogSection: React.FC = () => {
  return (
    <article className="space-y-8">
      <header className="pb-2">
        <h2 className="text-4xl font-bold text-text-light dark:text-text-dark mb-2">
          My <span className="text-accent dark:text-accent-dark">Blog</span>
        </h2>
        <div className="w-20 h-1 bg-accent dark:bg-accent-dark rounded-full"></div>
      </header>

      <div className="text-center py-10 bg-secondary-light dark:bg-secondary-dark rounded-lg shadow-md">
        <ion-icon name="construct-outline" class="text-6xl text-accent dark:text-accent-dark mx-auto mb-4"></ion-icon>
        <h3 className="text-2xl font-semibold mb-2 text-text-light dark:text-text-dark">Coming Soon!</h3>
        <p className="text-gray-600 dark:text-gray-400">
          I'm currently working on some exciting articles and tutorials. Stay tuned!
        </p>
      </div>
    </article>
  );
};

export default BlogSection;
