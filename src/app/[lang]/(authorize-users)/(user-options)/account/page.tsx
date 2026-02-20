'use client';

import { useTranslation } from 'react-i18next';

const AccountPage = () => {
  const { t } = useTranslation();
  return (
    // тут нужен fragment? (в результатирующем коде икак не мешает. Он нужен только когда возвращаем более одного элемента)
    <>
      <div className="pt-52 text-center">{t('helloAccountPage')}</div>
    </>
  );
};

export default AccountPage;
