import { cookies } from 'next/headers';

import { getUserStatistic } from '@/src/actions/user';
import { UserDetails } from '@/src/features/user/UserDetails';

export default async function AccountPage() {
  const statistic = await getUserStatistic();
  const username = (await cookies()).get('username').value;

  return (
    <main>
      <UserDetails statistic={statistic} username={username} />
    </main>
  );
}
