export default function Post({
  user,
  time,
  content,
  image,
}: {
  user: { name: string; avatar?: string };
  time: string;
  content: string;
  image?: string;
}) {
  const avatarSrc = user.avatar || "/defaultDp.png";

  return (
    <div className="bg-zinc-900 rounded-xl p-5 flex flex-col gap-4 border border-zinc-700 shadow-lg hover:shadow-xl transition duration-300">
      
      <div className="flex items-center gap-3">
        <img
          src={avatarSrc}
          alt={`${user.name}'s avatar`}
          className="rounded-full object-cover w-11 h-11 border-2 border-zinc-600"
        />

        <div>
          <p className="font-bold text-base text-white">{user.name}</p>
          <p className="text-xs text-zinc-400">{time}</p>
        </div>
      </div>

      <p className="text-base text-zinc-200 leading-relaxed">
        {content}
      </p>

      {image && (
        <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-md">
          <img
            src={image}
            alt="post image"
            className="object-cover w-full h-full"
          />
        </div>
      )}
      
      {/* Buttons */}
      <div className="flex justify-around border-t border-zinc-800 pt-3 mt-1">
        <button className="flex items-center gap-1 text-zinc-400 hover:text-red-500 transition p-2 rounded-lg hover:bg-zinc-800/50 text-sm">
          ❤️ Like
        </button>
        <button className="flex items-center gap-1 text-zinc-400 hover:text-blue-400 transition p-2 rounded-lg hover:bg-zinc-800/50 text-sm">
          💬 Comment
        </button>
        <button className="flex items-center gap-1 text-zinc-400 hover:text-green-400 transition p-2 rounded-lg hover:bg-zinc-800/50 text-sm">
          ↗️ Share
        </button>
      </div>

    </div>
  );
}
