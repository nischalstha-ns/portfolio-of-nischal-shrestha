

import React from 'react';
import { PersonalDetails, ContactInfo, SocialLink, Theme, NavItem, ActiveSection } from '../types';

interface SidebarProps {
  personalDetails: PersonalDetails;
  isContactsOpen: boolean;
  toggleContacts: () => void;
  theme: Theme;
  toggleTheme: () => void;
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
  navItems: NavItem[];
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  personalDetails,
  isContactsOpen,
  toggleContacts,
  theme,
  toggleTheme,
  isMobileOpen,
  toggleMobileSidebar, // Prop is correctly destructured
  navItems, 
  activeSection, 
  setActiveSection, 
}) => {
  const { avatarUrl, name, title, contacts, socials } = personalDetails;

  return (
    <>
      {/* Overlay for mobile sidebar */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMobileSidebar} // Prop is correctly used
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:static top-0 left-0 h-full md:h-auto md:max-h-screen md:overflow-y-auto 
          w-72 bg-secondary-light dark:bg-secondary-dark 
          shadow-xl md:shadow-none 
          p-6 border-r border-gray-200 dark:border-gray-700 
          flex flex-col transition-transform duration-300 ease-in-out z-40 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col items-center mb-6 text-center">
          <figure className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent dark:border-accent-dark mb-4 shadow-lg animate-pulseSlow">
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          </figure>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">{name}</h1>
          <p className="text-sm bg-accent/20 dark:bg-accent-dark/20 text-accent dark:text-accent-dark px-3 py-1 rounded-full mt-1">{title}</p>
        </div>

        <button
          onClick={toggleContacts}
          className="w-full flex items-center justify-between p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
          aria-expanded={isContactsOpen}
          aria-controls="contacts-details"
        >
          <span className="font-medium text-sm text-text-light dark:text-text-dark">
            {isContactsOpen ? 'Hide Contacts' : 'Show Contacts'}
          </span>
          <ion-icon 
            name="chevron-down-outline" 
            class={`transition-transform duration-300 ${isContactsOpen ? 'transform rotate-180' : ''} text-text-light dark:text-text-dark`}
          ></ion-icon>
        </button>

        <div 
          id="contacts-details"
          className={`transition-all duration-500 ease-in-out overflow-hidden ${isContactsOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
          <ul className="space-y-3 py-3">
            {contacts.map((contact: ContactInfo) => (
              <li key={contact.label} className="flex items-start text-xs">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 dark:bg-accent-dark/10 flex items-center justify-center mr-3 shadow-sm">
                  <ion-icon name={contact.iconName} class="text-accent dark:text-accent-dark text-lg"></ion-icon>
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-gray-500 dark:text-gray-400">{contact.label}</p>
                  {contact.link ? (
                    <a href={contact.link} className="block text-text-light dark:text-text-dark hover:text-accent dark:hover:text-accent-dark break-all">
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-text-light dark:text-text-dark break-all">{contact.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
        </div>

        {/* Mobile Navigation - Duplicated from MainContent Navbar for mobile sidebar */}
        <nav className="md:hidden mt-auto mb-4">
            <ul className="space-y-1">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ease-in-out font-medium
                                ${activeSection === item.id 
                                    ? 'bg-accent dark:bg-accent-dark text-white' 
                                    : 'text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-accent dark:hover:text-accent-dark'
                                }`}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>


        <div className="mt-auto pt-4"> {/* Pushes social links and theme toggle to bottom */}
          <ul className="flex justify-center space-x-3 mb-6">
            {socials.map((social: SocialLink) => (
              <li key={social.name}>
                <a 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.name}
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-accent dark:hover:bg-accent-dark text-text-light dark:text-text-dark hover:text-white dark:hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <ion-icon name={social.iconName} class="text-xl"></ion-icon>
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-text-light dark:text-text-dark flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <ion-icon name={theme === 'light' ? 'moon-outline' : 'sunny-outline'} class="text-xl mr-2"></ion-icon>
            <span>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
