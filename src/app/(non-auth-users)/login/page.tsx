'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { loginAction } from '@/src/actions/auth';
import { Button } from '@/src/modules/Button';
import { Input } from '@/src/modules/Input';
import { AuthForm, AuthSchema, InputAuth } from '@/src/utils/types';

export const inputsType: InputAuth[] = [
  { name: 'username', placeholder: 'User Name', type: 'text' },
  { name: 'password', placeholder: 'Password', type: 'password' },
];

const AuthorizationPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const result = await loginAction(data);

      if (!result?.error) {
        router.push('/home');
        router.refresh();
      } else {
        setError('root', {
          type: 'manual',
          message: result.error,
        });
      }
    });
  });

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center p-2">
      <div className="p-8 w-full max-w-116 rounded-xl flex flex-col shadow-paper gap-6 bg-white">
        <h1 className="text-center text-2xl font-semibold">Authorization</h1>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {inputsType.map(({ name, placeholder, type }) => (
            <Input
              key={name}
              type={type}
              placeholder={placeholder}
              error={errors[name]?.message}
              {...register(name)}
              disabled={isPending}
            />
          ))}

          {errors.root && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
              {errors.root.message}
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
};

export default AuthorizationPage;
