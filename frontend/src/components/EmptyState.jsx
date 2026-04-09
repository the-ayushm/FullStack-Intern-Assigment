export const EmptyState = ({ title, description }) => {
  return (
    <div className="glass-panel rounded-3xl px-8 py-12 text-center">
      <h3 className="font-display text-2xl text-paper">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/65">{description}</p>
    </div>
  );
};
