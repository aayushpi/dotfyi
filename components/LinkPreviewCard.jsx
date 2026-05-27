export default function LinkPreviewCard({ preview, url, title }) {
  if (!preview) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm">
        View source ↗
      </a>
    );
  }

  return (
    <a
      href={preview.url || url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-3 py-2 rounded border border-ink/20 bg-ink/5 no-underline hover:bg-highlight hover:border-highlight transition-all duration-200"
    >
      <span className="text-sm font-semibold text-ink">
        {title || preview.title}
        {preview.author && (
          <>
            <span className="mx-1">—</span>
            {preview.author}
          </>
        )}
      </span>
      <span className="ml-1 text-ink text-sm">↗</span>
    </a>
  );
}
