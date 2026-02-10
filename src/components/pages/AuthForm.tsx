'use client';
import Link from 'next/link';
import { useActionState } from 'react';

import { testAction } from '@/src/actions/auth';
import { Button } from '@/src/modules/Button';
import { Input } from '@/src/modules/Input';
import { inputsTypeAuth } from '@/src/utils/constants';

const initialState = {
  error: undefined,
  fieldErrors: {},
};

function AuthForm() {
  const [state, formAction, isPending] = useActionState(testAction, initialState);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center p-2">
      <div className="p-8 w-full max-w-116 rounded-xl flex flex-col shadow-paper gap-6 bg-white">
        <h1 className="text-center text-2xl font-semibold">Authorization</h1>

        <form action={formAction} className="flex flex-col gap-4">
          {inputsTypeAuth.map(({ name, placeholder, type }) => (
            <Input
              key={name}
              name={name}
              type={type}
              placeholder={placeholder}
              error={state.fieldErrors?.[name]?.[0]}
              disabled={isPending}
            />
          ))}

          {state.error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
              {state.error}
            </div>
          )}

          <Button variant="primary" size="lg" type="submit" disabled={isPending}>
            {isPending ? 'SIGNING IN...' : 'SIGN IN'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account? <Link href="/registration">Registration</Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
