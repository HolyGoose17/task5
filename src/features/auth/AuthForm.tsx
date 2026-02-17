'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { testAction } from '@/src/actions/auth';
import { Button } from '@/src/shared/Button';
import { Input } from '@/src/shared/Input';
import { AuthSchema } from '@/src/utils/types';

type AuthFormType = z.infer<typeof AuthSchema>;

type InputAuth = {
  name: keyof AuthFormType;
  placeholder: string;
  type: string;
};

const inputsTypeAuth: InputAuth[] = [
  { name: 'username', placeholder: 'User Name', type: 'text' },
  { name: 'password', placeholder: 'Password', type: 'password' },
];

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
            // тут отображается ошибка валидации данного поля
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
