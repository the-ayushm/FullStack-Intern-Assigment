export const SearchBar = ({ value, onChange, placeholder = 'Search posts by title or body...' }) => {
  return (
    <label className="glass-panel group flex items-center gap-3 rounded-3xl px-4 py-3 shadow-glow transition focus-within:border-orange-300/60 focus-within:bg-white/10 sm:px-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <span className="block text-[11px] uppercase tracking-[0.28em] text-white/45">Live search</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="mt-1 w-full border-0 bg-transparent text-base text-paper outline-none placeholder:text-white/30"
        />
      </div>
    </label>
  );
};
