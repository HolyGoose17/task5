'use client';

import { useTranslation } from 'react-i18next';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FaCode, FaUser } from 'react-icons/fa';

import { Snippet } from '@/src/utils/types';

interface HomePageProps {
  data: Snippet[];
}

export default function HomePage({ data }: HomePageProps) {
  const { t } = useTranslation();
  // const countMarks = data.data?.data.data.map((snippet) => {
  //   const { likes, dislikes } = snippet.marks.reduce();
  // });
  return (
    <div className="w-full mt-24">
      <div className="flex items-center flex-col gap-6">
        <h1 className="text-2xl font-bold">{t('helloHomePage')}</h1>
        <FaCode className="w-14 h-14" />
      </div>
      <div className="mt-6 h-full w-full flex flex-col items-center">
        {data.map((elem) => (
          <div key={elem.id} className="w-3/4 h-60 border rounded-lg">
            <div className="p-2 h-1/5 border border-gray-500 rounded-t-lg flex justify-between">
              <div className="flex items-center gap-2">
                <FaUser />
                <p>{elem.id}</p>
              </div>
              <p>{elem.language}</p>
            </div>
            <div className="h-3/5 border border-gray-500 flex">
              <div className="w-10 h-full bg-gray-200 border"></div>
              <div className="p-2">{elem.code}</div>
            </div>
            <div className="h-1/5 border border-gray-500 rounded-b-lg flex gap-4 items-center">
              <div>
                <p></p>
                <AiFillLike />
              </div>
              <div>
                <p></p>
                <AiFillDislike />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
