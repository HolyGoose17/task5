'use server';
import AuthForm from '@/src/components/pages/AuthForm';

export default async function AuthorizationPage() {
  return (
    <main>
      <AuthForm />
    </main>
  );
}
