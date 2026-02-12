import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FaCode, FaUser } from 'react-icons/fa';

import { snippetsAction } from '@/src/actions/auth';

export default async function MainPage() {
  const snippets = await snippetsAction();
  const countMarks = snippets.data?.data.data.map((snippet) => {
    const { likes, dislikes } = snippet.marks.reduce();
  });
  return (
    <div className="w-full mt-24">
      <div className="flex items-center flex-col gap-6">
        <h1 className="text-2xl font-bold">Welcome to Codelang!</h1>
        <FaCode className="w-14 h-14" />
      </div>
      <div className="mt-6 h-full w-full flex flex-col items-center">
        {snippets.data?.data.data.map((elem) => (
          <div key={elem.id} className="w-3/4 h-60 border rounded-lg">
            <div className="h-1/5 border border-gray-500 rounded-t-lg">
              <div>
                <FaUser />
              </div>
              <p>{elem.language}</p>
            </div>
            <div className="h-3/5 border border-gray-500 flex">
              <div className="w-10 h-full bg-gray-200 border"></div>
              <div className="p-2">{elem.code}</div>
            </div>
            <div className="h-1/5 border border-gray-500 rounded-b-lg flex gap-4 items-center">
              <AiFillLike />
              <AiFillDislike />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
