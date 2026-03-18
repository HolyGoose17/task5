'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { addNewSnippet } from '@/src/actions/snippets';
import { NewSnippetForm, PostSnippetSchema, SnippetLanguagesForm } from '@/src/utils/types';

const initialState = {};

export default function CreateSnippet({ languages }: { languages: SnippetLanguagesForm }) {
  const { t } = useTranslation();
  const [state, formAction, isPending] = useActionState(addNewSnippet, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewSnippetForm>({
    resolver: zodResolver(PostSnippetSchema),
  });

  const onSubmit = (values: NewSnippetForm) => {
    startTransition(() => {
      formAction(values);
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-24 max-w-2xl space-y-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-700">
          {t('snippet.languageSnippet')}
        </label>

        <select
          {...register('language')}
          disabled={isPending}
          className={`rounded-md border px-3 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:cursor-not-allowed disabled:bg-neutral-100
            ${errors.language ? 'border-red-500' : 'border-neutral-300'}
          `}
        >
          <option className="max-w-2/3" value="">
            ---
          </option>
          {languages.data.map((lang) => (
            <option className="max-w-2/3" key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        {errors.language && <span className="text-xs text-red-600">{errors.language.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-neutral-700">
          {t('snippet.snippetCodeHere')}
        </label>

        <textarea
          {...register('code')}
          disabled={isPending}
          rows={10}
          placeholder=""
          className={`font-mono text-sm rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:cursor-not-allowed disabled:bg-neutral-100
            ${errors.code ? 'border-red-500' : 'border-neutral-300'}
          `}
        />

        {errors.code && <span className="text-xs text-red-600">{errors.code.message}</span>}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white cursor-pointer hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400
          "
        >
          {isPending ? 'Saving…' : t('snippet.addNewSnippet')}
        </button>
      </div>
    </form>
  );
}
