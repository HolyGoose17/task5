import { cookies } from 'next/headers';

export async function getLocale() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18next')?.value;

  return lang ?? 'en';
}
