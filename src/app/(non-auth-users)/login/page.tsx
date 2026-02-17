'use server';
import AuthForm from '@/src/features/auth/AuthForm';

export default async function AuthorizationPage() {
  return (
    <main>
      <AuthForm />
    </main>
  );
}
