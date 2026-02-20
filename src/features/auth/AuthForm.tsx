'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { loginAction } from '@/src/actions/auth';
import { Button } from '@/src/shared/Button';
import { Input } from '@/src/shared/Input';
import { AuthActionState, AuthForm, AuthSchema } from '@/src/utils/types';

const initialState: AuthActionState = {};

type InputAuth = {
  name: keyof AuthForm;
  placeholder: string;
  type: string;
};

const inputsTypeAuth: InputAuth[] = [
  { name: 'username', placeholder: 'User Name', type: 'text' },
  { name: 'password', placeholder: 'Password', type: 'password' },
];

export default function AuthorizationForm() {
  const [state, formAction, isPending] = useActionState<AuthActionState, FormData>(
    loginAction,
    initialState
  );

  const form = useForm<AuthForm>({
    resolver: zodResolver(AuthSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (data: AuthForm) => {
    form.clearErrors();
    const formData = new FormData();

    formData.append('username', data.username);
    formData.append('password', data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (state?.errors) {
      Object.entries(state.errors).forEach(([key, message]) => {
        if (message) {
          form.setError(key as keyof AuthForm, { message, type: 'server' });
        }
      });
    }
  }, [state, form]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center p-2">
      <div className="p-8 w-full max-w-116 rounded-xl flex flex-col shadow-paper gap-6 bg-white">
        <h1 className="text-center text-2xl font-semibold">Authorization</h1>

        <form
          onSubmit={form.handleSubmit((data: AuthForm) => {
            onSubmit(data);
          })}
          className="flex flex-col gap-4"
        >
          {inputsTypeAuth.map(({ name, placeholder, type }) => (
            <Input
              key={name}
              type={type}
              placeholder={placeholder}
              error={form.formState.errors[name]?.message}
              disabled={isPending}
              {...form.register(name)}
            />
          ))}

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
