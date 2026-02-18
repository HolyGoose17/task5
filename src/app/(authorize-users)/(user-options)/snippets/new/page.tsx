'use client';

import { useTranslation } from 'react-i18next';

const PostSnippets = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: 'header',
  });
  return (
    <>
      <div className="pt-52 text-center">{t('helloAddSnippetsPage')}</div>
    </>
  );
};

export default PostSnippets;
