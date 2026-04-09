export const PostCard = ({ post }) => {
  return (
    <article className="card-border overflow-hidden rounded-3xl bg-white/6 p-[1px] shadow-glow transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_90px_rgba(0,0,0,0.38)]">
      <div className="h-full rounded-3xl bg-slate-950/70 p-6">
        <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-orange-200/70">
          <span>Post #{post.externalId || post.id}</span>
          <span>User {post.userId}</span>
        </div>
        <h2 className="font-display text-2xl leading-snug text-paper">
          {post.title}
        </h2>
        <p className="mt-4 line-clamp-4 text-sm leading-7 text-white/68">
          {post.body}
        </p>
      </div>
    </article>
  );
};
