import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, defaultLang } from '../data/translations.js';

const AppContext = createContext(null);

const LANG_STORAGE_KEY = 'synapto-lang';
const THEME_STORAGE_KEY = 'synapto-theme';

/**
 * AppContext — Central state for:
 *  - language (default: 'en')
 *  - theme    (default: 'dark', persisted)
 *  - page navigation (currentPage + setter)
 */
export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return defaultLang;
    return localStorage.getItem(LANG_STORAGE_KEY) || defaultLang;
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  });

  const [currentPage, setCurrentPage] = useState('home');
  const [selectedModel, setSelectedModel] = useState(null);

  // Persist language
  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Apply theme to <html data-theme>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Convenience: navigate and scroll to top
  const navigate = useCallback((page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  const value = {
    lang,
    setLang,
    toggleLang,
    isRtl,
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    t,
    currentPage,
    setCurrentPage: navigate,
    selectedModel,
    setSelectedModel,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within <AppProvider>');
  }
  return ctx;
}
