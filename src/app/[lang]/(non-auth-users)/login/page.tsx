'use server';

import AuthorizationForm from '@/src/features/auth/AuthForm';

export default async function AuthorizationPage() {
  return (
    <main>
      <AuthorizationForm />
    </main>
  );
}
