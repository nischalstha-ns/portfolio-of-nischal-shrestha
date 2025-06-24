
import React, { useState, useEffect, useCallback } from 'react';
import { Theme, ActiveSection } from './types'; // Removed unused PersonalDetails, NavItem imports
import { PERSONAL_DETAILS, NAV_ITEMS, DEFAULT_SECTION } from './constants';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import AboutSection from './components/sections/AboutSection';
import ResumeSection from './components/sections/ResumeSection';
import PortfolioSection from './components/sections/PortfolioSection';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [activeSection, setActiveSection] = useState<ActiveSection>(DEFAULT_SECTION);
  const [isSidebarContactsOpen, setIsSidebarContactsOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Prefer dark mode if system prefers it
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleSidebarContacts = useCallback(() => {
    setIsSidebarContactsOpen(prev => !prev);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);
  
  const handleSetActiveSection = useCallback((section: ActiveSection) => {
    setActiveSection(section);
    setIsMobileSidebarOpen(false); // Close mobile sidebar on navigation
  }, []);


  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <AboutSection personalDetails={PERSONAL_DETAILS} />;
      case 'resume':
        return <ResumeSection />;
      case 'portfolio':
        return <PortfolioSection />;
      case 'blog':
        return <BlogSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection personalDetails={PERSONAL_DETAILS} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark transition-colors duration-300">
      <Sidebar
        personalDetails={PERSONAL_DETAILS}
        isContactsOpen={isSidebarContactsOpen}
        toggleContacts={toggleSidebarContacts}
        theme={theme}
        toggleTheme={toggleTheme}
        isMobileOpen={isMobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        setActiveSection={handleSetActiveSection}
      />
      <MainContent
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        setActiveSection={handleSetActiveSection}
        theme={theme}
        toggleTheme={toggleTheme}
        toggleMobileSidebar={toggleMobileSidebar}
      >
        {renderSection()}
      </MainContent>
    </div>
  );
};

export default App;
