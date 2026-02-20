'use client';

import { useEffect } from 'react';

import i18n from '../config/i18n-config';

export default function LanguageSync({ lang }: { lang: string }) {
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return null;
}
