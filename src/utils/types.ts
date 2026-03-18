import z from 'zod';

const MetaSchema = z.object({
  itemsPerPage: z.number(),
  totalItems: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  sortBy: z.array(z.tuple([z.string(), z.string()])),
});

const LinkSchema = z.object({
  first: z.string().optional(),
  previous: z.string().optional(),
  current: z.string(),
  next: z.string().optional(),
  last: z.string().optional(),
});

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.string(),
});

const SnippetSchema = z.object({
  id: z.string(),
  code: z.string(),
  language: z.string(),
  marks: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['like', 'dislike']),
      user: UserSchema,
    })
  ),
  user: UserSchema,
  comments: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
    })
  ),
});

export const DataSnippetsSchema = z.object({
  data: z.object({
    data: z.array(SnippetSchema),
    meta: MetaSchema,
    links: LinkSchema,
  }),
});

export const SnippetDetailsSchema = z.object({
  data: z.object({
    id: z.string(),
    code: z.string(),
    language: z.string(),
    marks: z.array(
      z.object({
        id: z.string(),
        type: z.string(),
        user: UserSchema,
      })
    ),
    comments: z.array(
      z.object({
        id: z.string(),
        content: z.string(),
        user: UserSchema,
      })
    ),
    user: UserSchema,
  }),
});

export const SnippetsLanguagesSchema = z.object({
  data: z.array(z.string()),
});

export const PostSnippetSchema = z.object({
  code: z.string(),
  language: z.string(),
});

export const SnippetResponseSchema = z.object({
  data: z.object({
    code: z.string(),
    language: z.string(),
    user: z.object({
      id: z.string(),
      username: z.string(),
      role: z.string(),
    }),
    id: z.string(),
  }),
});

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

export const UserStatisticSchema = z.object({
  data: z.object({
    // UserSchema,
    id: z.string(),
    username: z.string(),
    role: z.string(),
    statistic: z.object({
      snippetsCount: z.number(),
      rating: z.number(),
      commentsCount: z.number(),
      likesCount: z.number(),
      dislikesCount: z.number(),
      questionsCount: z.number(),
      correctAnswersCount: z.number(),
      regularAnswersCount: z.number(),
    }),
  }),
});

export const QuestionsSchema = z.object({
  data: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        attachedCode: z.string(),
        answers: z.array(
          z.object({
            id: z.string(),
            content: z.string(),
            isCorrect: z.boolean(),
          })
        ),
        user: z.object(),
        isResolved: z.boolean(),
      })
    ),
    meta: z.object({
      itemsPerPage: z.number(),
      totalItems: z.number(),
      currentPage: z.number(),
      totalPages: z.number(),
      sortBy: z.array(z.tuple([z.string(), z.string()])),
    }),
    links: z.object({
      first: z.string().optional(),
      previous: z.string().optional(),
      current: z.string(),
      next: z.string().optional(),
      last: z.string().optional(),
    }),
  }),
});

export type SnippetDetailsForm = z.infer<typeof SnippetDetailsSchema>;
export type NewSnippetForm = z.infer<typeof PostSnippetSchema>;
export type SnippetResponseForm = z.infer<typeof SnippetResponseSchema>;

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
export type NewSnippetActionState = {
  create?: SnippetResponseForm;
  errors?: Partial<Record<keyof NewSnippetForm, string>>;
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

export type SnippetsForm = z.infer<typeof DataSnippetsSchema>;
export type Snippet = z.infer<typeof SnippetSchema>;

export type SnippetLanguagesForm = z.infer<typeof SnippetsLanguagesSchema>;

export type UserStatisticForm = z.infer<typeof UserStatisticSchema>;
