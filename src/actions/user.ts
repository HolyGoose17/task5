'use server';

import { cookies } from 'next/headers';

import { UserStatisticForm, UserStatisticSchema } from '../utils/types';

// interface UserStatisticProps {
//   userId: number;
// }

export async function getUserStatistic(): Promise<UserStatisticForm> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const userId = cookieStore.get('userId')?.value;
  const res = await fetch(`${process.env.BACKEND_URL}/api/users/${userId}/statistic`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: cookieStore.toString(),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Response text:', text);
    throw new Error('Failed to get user statistic');
  }

  const data = await res.json();
  const validated = UserStatisticSchema.safeParse(data);

  if (!validated.success) {
    console.error(validated.error);
    throw new Error('Data validation failed');
  }

  return validated.data;
}
