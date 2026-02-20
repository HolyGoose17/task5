'use client';

import { useTranslation } from 'react-i18next';

const QuestionPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="pt-52 text-center">{t('helloQuestionsPage')}</div>
    </>
  );
};

export default QuestionPage;
