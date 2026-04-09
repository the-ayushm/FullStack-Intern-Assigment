export const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`min-w-11 rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
            pageNumber === page
              ? 'border-orange-300/60 bg-orange-400/20 text-orange-100'
              : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10'
          }`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};
