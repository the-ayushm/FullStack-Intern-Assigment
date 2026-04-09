export const SearchBar = ({ value, onChange, placeholder = 'Search posts by title or body...' }) => {
  return (
    <label className="glass-panel flex items-center gap-3 rounded-3xl px-4 py-4 shadow-glow">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/15 text-lg text-orange-200">
        Search
      </span>
      <div className="flex-1">
        <span className="block text-xs uppercase tracking-[0.35em] text-white/45">Live search</span>
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
