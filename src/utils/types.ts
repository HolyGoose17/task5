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

export const AuthResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    username: z.string(),
    role: z.string(),
  }),
  message: z.string(),
});

export const SnippetsSchema = z.object({
  data: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        code: z.string(),
        language: z.string(),
        marks: z.array(
          z.object({
            id: z.string(),
            type: z.enum(['like', 'dislike']),
            user: z.object({
              id: z.string(),
              username: z.string(),
              role: z.string(),
            }),
          })
        ),
      })
    ),
  }),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export type RegisterForm = z.infer<typeof RegisterSchema>;
export type AuthForm = z.infer<typeof AuthSchema>;

export type RegisterActionState = {
  auth?: AuthResponse;
  errors?: Partial<Record<keyof RegisterForm, string>>;
  success?: boolean;
};
export type AuthActionState = {
  auth?: AuthResponse;
  errors?: Partial<Record<keyof AuthForm, string>>;
  success?: boolean;
};

export type AuthState = {
  error?: string;
  fieldErrors?: {
    username?: string[];
    password?: string[];
  };
};

export type RegisterState = {
  error?: string;
  fieldErrors?: {
    username?: string[];
    password?: string[];
    repeatPassword?: string[];
  };
};

export type SnippetsForm = z.infer<typeof SnippetsSchema>;
export type Snippet = SnippetsForm['data']['data'][number];
