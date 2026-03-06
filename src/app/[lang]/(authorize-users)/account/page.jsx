'use client';

import { useTranslation } from 'react-i18next';

const AccountPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="pt-52 text-center">{t('helloAccountPage')}</div>
    </>
  );
};

export default AccountPage;
