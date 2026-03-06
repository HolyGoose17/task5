'use client';

import { useTranslation } from 'react-i18next';

const UsersPage = () => {
  const { t } = useTranslation();
  return <div className="pt-52 text-center">{t('helloUsersPage')}</div>;
};

export default UsersPage;
