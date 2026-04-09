export const Header = ({ isConnected, onRefresh, isRefreshing }) => {
  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/90">
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(255,127,80,0.85)]" />
          Signal Posts
        </div>
        <div className="space-y-4">
          <h1 className="font-display text-4xl leading-tight text-paper sm:text-5xl lg:text-6xl">
            Real-time JSONPlaceholder posts, stored in MongoDB and searched live.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
            A production-style full-stack build with an Express REST API, Socket.io search,
            and a React frontend that keeps the UI fast, clear, and responsive.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="glass-panel rounded-2xl px-4 py-3 text-sm text-white/75 shadow-glow">
          <span className={`mr-2 inline-block h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          {isConnected ? 'Socket connected' : 'Socket disconnected'}
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-paper transition hover:border-orange-300/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRefreshing ? 'Refreshing...' : 'Sync posts'}
        </button>
      </div>
    </header>
  );
};
