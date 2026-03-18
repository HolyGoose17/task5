'use client';

import { useTranslation } from 'react-i18next';

import { UserStatisticForm } from '@/src/utils/types';

interface UserProps {
  statistic: UserStatisticForm;
  username: string;
}

export function UserDetails({ statistic, username }: UserProps) {
  const { t } = useTranslation();
  return (
    <div className="mt-16 flex flex-col items-center">
      <div className="mt-2 text-3xl font-bold">
        Welcome, <span className="text-3xl text-blue-700">{username}</span>
      </div>
      <div className="border">
        <div>Photo</div>
        <div>
          <span>
            {t('user.rating')} {statistic.data.statistic.rating}
          </span>
          <span>
            {t('user.snippetsCount')} {statistic.data.statistic.snippetsCount}
          </span>
          <span>
            {t('user.commentsCount')} {statistic.data.statistic.commentsCount}
          </span>
          <span>
            {t('user.likesCount')} {statistic.data.statistic.likesCount}
          </span>
          <span>
            {t('user.dislikesCount')} {statistic.data.statistic.dislikesCount}
          </span>
          <span>
            {t('user.questionsCount')} {statistic.data.statistic.questionsCount}
          </span>
          <span>
            {t('user.correctAnswersCount')} {statistic.data.statistic.correctAnswersCount}
          </span>
          <span>
            {t('user.regularAnswersCount')} {statistic.data.statistic.regularAnswersCount}
          </span>
        </div>
      </div>
      <div>
        <span>Edit your profile</span>
        <div>
          <form action="">
            <span>Change your username:</span>
            <input placeholder="New username" type="text" />
            <button>Save</button>
          </form>
          <form action="">
            <span>Change your password:</span>
            <input placeholder="Old password" type="password" />
            <input placeholder="New password" type="password" />
            <input placeholder="Confirm password" type="password" />
            <button>Change password</button>
          </form>
        </div>
      </div>
    </div>
  );
}
