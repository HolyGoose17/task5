'use client';
import Link from 'next/link';
import { useActionState } from 'react';

import { registerAction } from '@/src/actions/auth';
import { Button } from '@/src/modules/Button';
import { Input } from '@/src/modules/Input';
import { inputsTypeReg } from '@/src/utils/constants';

const initialState = { error: undefined, fieldErrors: {} };
const RegistrationForm = () => {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-h-dvh flex items-center justify-center p-2 ">
      <div className="p-8 w-full max-w-116 rounded-xl flex flex-col shadow-paper gap-6 text-center">
        <h1 className="text-center text-2xl font-semibold tracking-tight">Registration</h1>

        <form action={formAction} className="flex flex-col gap-4">
          {inputsTypeReg.map(({ name, placeholder, type }) => (
            <Input
              key={name}
              name={name}
              type={type}
              placeholder={placeholder}
              disabled={isPending}
              error={state.fieldErrors?.[name]?.[0]}
            />
          ))}

          {state.error && <p className="text-sm text-red-500">{state.error}</p>}

          <Button variant="primary" size="lg" type="submit" disabled={isPending}>
            {isPending ? 'Loading…' : 'SIGN UP'}
          </Button>
        </form>

        <Link href="/login" className="text-center text-sm text-gray-600">
          Back to authorize
        </Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
