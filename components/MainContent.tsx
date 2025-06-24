

import React from 'react';
import { NavItem, ActiveSection, Theme } from '../types';

interface NavbarProps {
  navItems: NavItem[];
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

const Navbar: React.FC<NavbarProps> = ({ navItems, activeSection, setActiveSection }) => {
  return (
    <nav className="bg-secondary-light dark:bg-secondary-dark shadow-md rounded-lg mb-6">
      <ul className="flex flex-wrap justify-center sm:justify-start">
        {navItems.map((item) => (
          <li key={item.id} className="flex-grow sm:flex-grow-0">
            <button
              onClick={() => setActiveSection(item.id)}
              className={`
                w-full px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out
                hover:bg-accent/10 dark:hover:bg-accent-dark/10 hover:text-accent dark:hover:text-accent-dark
                focus:outline-none focus:ring-2 focus:ring-accent focus:z-10 relative
                ${activeSection === item.id 
                  ? 'text-accent dark:text-accent-dark border-b-2 border-accent dark:border-accent-dark' 
                  : 'text-text-light dark:text-text-dark'}
                first:rounded-l-lg last:rounded-r-lg sm:first:rounded-none sm:last:rounded-none
                sm:first:rounded-tl-lg sm:last:rounded-tr-lg 
              `}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

interface MainContentProps {
  children: React.ReactNode;
  navItems: NavItem[];
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  theme: Theme; 
  toggleTheme: () => void; 
  toggleMobileSidebar: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ 
  children, 
  navItems, 
  activeSection, 
  setActiveSection,
  toggleMobileSidebar
}) => {
  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between mb-4 p-2 bg-secondary-light dark:bg-secondary-dark rounded-lg shadow">
        <h1 className="text-xl font-bold text-accent dark:text-accent-dark">Nischal Shrestha</h1>
        <button 
          onClick={toggleMobileSidebar} 
          className="p-2 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent rounded"
          aria-label="Toggle sidebar"
        >
          <ion-icon name="menu-outline" class="text-2xl"></ion-icon>
        </button>
      </div>

      <div className="hidden md:block"> {/* Desktop Navbar */}
        <Navbar 
          navItems={navItems} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
      </div>
      
      <div className="animate-fadeIn">
        {children}
      </div>
    </main>
  );
};

export default MainContent;
