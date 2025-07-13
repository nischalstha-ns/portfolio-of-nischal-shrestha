import React, { useState, ChangeEvent, FormEvent } from 'react';
import { PERSONAL_DETAILS } from '../../constants';
import { ContactInfo } from '../../types';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const phoneNumber = '9779808548593'; 
    const text = `Hello, I'm ${name}
    Email: ${email}
    ${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank');

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(true);

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <article className="space-y-12">
      <header className="pb-2">
        <h2 className="text-4xl font-bold text-text-light dark:text-text-dark mb-2">
          Get in <span className="text-accent dark:text-accent-dark">Touch</span>
        </h2>
        <div className="w-20 h-1 bg-accent dark:bg-accent-dark rounded-full"></div>
      </header>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">Contact Information</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Feel free to reach out to me through any of the following channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
          </p>
          <ul className="space-y-4">
            {PERSONAL_DETAILS.contacts
              .filter((contact) => ['email', 'phone', 'location', 'github'].includes(contact.type))
              .map((contact: ContactInfo) => (
                <li key={contact.label} className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 dark:bg-accent-dark/10 flex items-center justify-center mr-4 shadow-sm">
                    <ion-icon name={contact.iconName} class="text-accent dark:text-accent-dark text-xl"></ion-icon>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 dark:text-gray-400">{contact.label}</p>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className="text-sm text-text-light dark:text-text-dark hover:text-accent dark:hover:text-accent-dark break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-sm text-text-light dark:text-text-dark break-all">{contact.value}</p>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* Contact Form Section */}
        <form onSubmit={handleSubmit} className="p-8 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl space-y-6">
          <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-1">Send Me a Message</h3>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-accent focus:border-accent transition-colors"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-accent focus:border-accent transition-colors"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-accent focus:border-accent transition-colors"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-accent hover:bg-green-600 dark:bg-accent-dark dark:hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200 transform hover:scale-105"
            >
              Send via WhatsApp
              <ion-icon name="logo-whatsapp" class="ml-2 text-xl"></ion-icon>
            </button>
          </div>

          {/* Confirmation */}
          {isSubmitted && (
            <p className="text-sm text-center text-green-600 dark:text-green-400 p-3 bg-green-100 dark:bg-green-900/50 rounded-md">
              Thank you for your message! I'll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </article>
  );
};

export default ContactSection;
