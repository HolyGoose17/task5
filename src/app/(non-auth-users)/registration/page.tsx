'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Registration } from '@/src/api/Registration';
import { Button } from '@/src/modules/Button';
import { Input } from '@/src/modules/Input';
import { InputAuth, RegisterForm, RegisterSchema } from '@/src/utils/types';

export const inputsType: InputAuth[] = [
  { name: 'username', placeholder: 'User Name', type: 'text' },
  { name: 'password', placeholder: 'Password', type: 'password' },
  { name: 'password', placeholder: 'Repeat Password', type: 'password' },
];

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await Registration(data);
    } catch {
      setError('password', {
        message: 'Invalid password',
      });
    }
  });
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-h-dvh flex items-center justify-center p-2 ">
      <div className="border-amber-400 p-8 w-full max-w-116 rounded-xl flex flex-col shadow-paper gap-6 text-center">
        <h1 className="text-center text-2xl font-semibold tracking-tight">Registration</h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {inputsType.map(({ name, placeholder, type }) => (
            <Input
              key={name}
              type={type}
              placeholder={placeholder}
              error={errors[name]?.message}
              {...register(name)}
            />
          ))}

          <Button variant="primary" size="lg" type="submit">
            <Link href="/login">SIGN UP</Link>
          </Button>
        </form>
        <Link href="/login" className="text-center text-sm text-gray-600">
          Back to authorize
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
