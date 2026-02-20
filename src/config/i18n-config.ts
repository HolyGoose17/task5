'use client';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '@/public/dictionaries/en/translation.json';
import ru from '@/public/dictionaries/ru/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    defaultNS: 'translation',
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    detection: {
      order: ['cookie'],
      caches: ['cookie'],
      lookupCookie: 'i18next',
    },
    react: {
      useSuspense: false,
    },
  });

export function setLocale(lang: string) {
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }
}

export default i18n;
