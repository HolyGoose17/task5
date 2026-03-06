import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

export const FooterSnippet = ({
  likes,
  dislikes,
  count,
  onLike,
  onDislike,
  addComment,
}: {
  likes: number;
  dislikes: number;
  count: number;
  onLike: () => void;
  onDislike: () => void;
  addComment: () => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-6 px-4 py-3 border-t">
      <div className="flex items-center gap-6">
        <div
          onClick={onLike}
          className="flex items-center gap-2 text-green-300 cursor-pointer hover:opacity-80"
        >
          <AiFillLike size={18} />
          <span>{likes}</span>
        </div>
        <div
          onClick={onDislike}
          className="flex items-center gap-2 text-red-400 cursor-pointer hover:opacity-80"
        >
          <AiFillDislike size={18} />
          <span>{dislikes}</span>
        </div>
      </div>
      <div
        onClick={addComment}
        className="flex items-center gap-2 text-red-400 cursor-pointer hover:opacity-80"
      >
        <FaComment size={18} />
        <span>{count}</span>
      </div>
    </div>
  );
};
