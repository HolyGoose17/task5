'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { registerUser } from '@/src/actions/auth';
import { Button } from '@/src/shared/Button';
import { Input } from '@/src/shared/Input';
import { RegisterActionState, RegisterForm, RegisterSchema } from '@/src/utils/types';

const initialState: RegisterActionState = {};

type InputRegister = {
  name: keyof RegisterForm;
  placeholder: string;
  type: string;
};

const inputsTypeReg: InputRegister[] = [
  { name: 'username', placeholder: 'User Name', type: 'text' },
  { name: 'password', placeholder: 'Password', type: 'password' },
  { name: 'repeatPassword', placeholder: 'Repeat Password', type: 'password' },
];

export default function RegistrationForm() {
  const [state, formAction, isPending] = useActionState<RegisterActionState, FormData>(
    registerUser,
    initialState
  );

  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { username: '', password: '', repeatPassword: '' },
  });

  const onSubmit = (data: RegisterForm) => {
    form.clearErrors();
    const formData = new FormData();

    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('repeatPassword', data.repeatPassword);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (state?.errors) {
      Object.entries(state.errors).forEach(([key, message]) => {
        if (message) {
          form.setError(key as keyof RegisterForm, { message, type: 'server' });
        }
      });
    }
  }, [state, form]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-h-dvh flex items-center justify-center p-2 ">
      <div className="p-8 w-full max-w-116 rounded-xl flex flex-col shadow-paper gap-6 text-center">
        <h1 className="text-center text-2xl font-semibold tracking-tight">Registration</h1>

        <form
          onSubmit={form.handleSubmit((data: RegisterForm) => {
            onSubmit(data);
          })}
          className="flex flex-col gap-4"
        >
          {inputsTypeReg.map(({ name, placeholder, type }) => (
            <Input
              key={name}
              type={type}
              placeholder={placeholder}
              error={form.formState.errors[name]?.message}
              {...form.register(name)}
              disabled={isPending}
            />
          ))}

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
}
