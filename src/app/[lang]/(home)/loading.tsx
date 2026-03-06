'use client';

import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation();
  return (
    <div className="mt-40">
      <span className="text-7xl">{t('loading.home')}</span>
      <span className="text-7xl">ЗДЕСЬ РЕЗЕРВНЫЙ КОНТЕНТ</span>
    </div>
  );
}
