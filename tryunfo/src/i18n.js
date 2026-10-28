// Canonical copy in shared/; each app keeps an identical copy in src/ (Create React App
// cannot import from outside src). The workflow fails the build if they drift.
import { useEffect, useState } from 'react';
import en from './locales/en.json';
import pt from './locales/pt.json';

const dictionaries = { en, pt };
export const LANGUAGES = Object.keys(dictionaries);

// The same key the portfolio uses, so one choice carries across gabrielncorreia.github.io.
const STORAGE_KEY = 'lang';
const listeners = new Set();

function savedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(saved) ? saved : 'en';
  } catch {
    return 'en';
  }
}

let language = savedLanguage();

export function t(key, values = {}) {
  const text = key.split('.')
    .reduce((node, part) => (node == null ? node : node[part]), dictionaries[language]);
  if (typeof text !== 'string') return key;
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in values ? values[name] : match));
}

// The BCP 47 tag for the current language, for Intl number, date and name formatting.
export function getLocale() {
  return language === 'pt' ? 'pt-BR' : 'en';
}

function applyToDocument() {
  document.documentElement.lang = getLocale();
  const title = t('document.title');
  if (title !== 'document.title') document.title = title;
}

applyToDocument();

export function getLanguage() {
  return language;
}

export function setLanguage(next) {
  if (!LANGUAGES.includes(next) || next === language) return;
  language = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The choice just won't persist.
  }
  applyToDocument();
  listeners.forEach((listener) => listener(next));
}

// Re-renders the caller when the language changes. Apps key their root on it,
// so class components and memoized Redux connections pick up the new strings too.
export function useLanguage() {
  const [current, setCurrent] = useState(language);
  useEffect(() => {
    listeners.add(setCurrent);
    return () => listeners.delete(setCurrent);
  }, []);
  return current;
}
