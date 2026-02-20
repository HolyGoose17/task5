'use server';

import RegistrationForm from '@/src/features/auth/RegistrationForm';

export default async function RegistrationPage() {
  return (
    <main className="flex flex-col items-center">
      <RegistrationForm />
    </main>
  );
}
