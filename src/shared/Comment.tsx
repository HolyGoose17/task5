interface CommentProps {
  username: string;
  content: string;
}

export const Comment = ({ username, content }: CommentProps) => {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold">
        {username[0].toUpperCase()}
      </div>

      <div className="flex flex-col bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm max-w-full">
        <span className="text-sm font-semibold text-gray-700">{username}</span>
        <span className="text-sm text-gray-600">{content}</span>
      </div>
    </div>
  );
};
