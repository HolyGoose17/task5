import z from 'zod';

export const AuthSchema = z.object({
  username: z.string().min(5, 'Minimum 5 symbols').max(40, 'Maximum 40 symbols'),
  password: z.string().min(6, 'Minimum 6 symbols').max(40, 'Maximum 40 symbols'),
});

export const RegisterSchema = z
  .object({
    username: z.string().min(5, 'Minimum 5 symbols').max(40, 'Maximum 40 symbols'),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol!'
      ),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords are not identical',
    path: ['repeatPassword'],
  });

export type RegisterFormType = {
  username: string;
  password: string;
  repeatPassword: string;
};

export type AuthResponse = {
  data: {
    username: string;
    role: string;
    id: string;
  };
  message: string;
};

export type RegisterType = z.infer<typeof RegisterSchema>;
export type RegisterActionState = {
  auth?: AuthResponse;
  errors?: Partial<Record<keyof RegisterFormType, string>>;
  success?: boolean;
};
