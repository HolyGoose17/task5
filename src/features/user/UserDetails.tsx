'use client';

import { useTranslation } from 'react-i18next';

import { Button } from '@/src/shared/Button';
import { Input } from '@/src/shared/Input';
import { UserStatisticForm } from '@/src/utils/types';

interface UserProps {
  statistic: UserStatisticForm;
  username: string;
}

export function UserDetails({ statistic, username }: UserProps) {
  const { t } = useTranslation();
  const data = [
    { label: t('user.snippetsCount'), value: statistic.data.statistic.snippetsCount },
    { label: t('user.rating'), value: statistic.data.statistic.rating },
    { label: t('user.likesCount'), value: statistic.data.statistic.likesCount },
    { label: t('user.dislikesCount'), value: statistic.data.statistic.dislikesCount },
    { label: t('user.commentsCount'), value: statistic.data.statistic.commentsCount },
    { label: t('user.questionsCount'), value: statistic.data.statistic.questionsCount },
    { label: t('user.correctAnswersCount'), value: statistic.data.statistic.correctAnswersCount },
    { label: t('user.regularAnswersCount'), value: statistic.data.statistic.regularAnswersCount },
  ];
  return (
    <main className="mt-16 max-w-5xl mx-auto px-4 space-y-6">
      <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
          Photo
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, <span className="text-blue-600">{username}</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((elem, id) => (
          <div key={id} className="bg-white p-4 rounded-xl shadow text-center">
            <div className="text-gray-500 text-sm">{elem.label}</div>
            <div className="text-xl font-bold">{elem.value}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form className="bg-white p-6 rounded-2xl shadow space-y-3">
          <h2 className="font-semibold">{t('change.changeUsername')}</h2>
          <Input placeholder={t('change.newUsername')} />
          <Button>{t('save')}</Button>
        </form>

        <form className="bg-white p-6 rounded-2xl shadow space-y-3">
          <h2 className="font-semibold">{t('change.changePassword')}</h2>
          <Input type="password" placeholder={t('change.oldPassword')} />
          <Input type="password" placeholder={t('change.newPassword')} />
          <Input type="password" placeholder={t('change.confirmPassword')} />
          <Button>{t('change.changePassword')}</Button>
        </form>
      </div>
    </main>
  );
}
