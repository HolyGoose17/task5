'use client';

import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: 'header',
  });
  return (
    <>
      <div className="pt-52 text-center">{t('helloHomePage')}</div>
    </>
  );
};

export default HomePage;
