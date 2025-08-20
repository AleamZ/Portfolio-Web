import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getCurrentLanguage, setLanguage as setLanguageStorage } from '../i18n';
import type { Language } from '../i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getCurrentLanguage());

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    setLanguageStorage(newLanguage);
  };

  useEffect(() => {
    const handleStorageChange = (event: CustomEvent) => {
      setLanguageState(event.detail);
    };

    window.addEventListener('languageChanged', handleStorageChange as EventListener);
    return () => {
      window.removeEventListener('languageChanged', handleStorageChange as EventListener);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};
