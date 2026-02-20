'use client';

import { useTranslation } from 'react-i18next';

const MySnippets = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="pt-52 text-center">{t('helloSnippetsPage')}</div>
    </>
  );
};

export default MySnippets;
