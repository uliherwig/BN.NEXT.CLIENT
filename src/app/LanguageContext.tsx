import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [language, setLanguage] = useState<string>(Cookies.get('bn-trading-app-language') || 'en');

  const changeLanguage = (lang: string) => {
    Cookies.set('bn-trading-app-language', lang);
    setLanguage(lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};