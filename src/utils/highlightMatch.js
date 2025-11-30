export function highlightMatch(text, query) {
  if (!query || !text) return text;
  
  const parts = String(text).split(new RegExp(`(${query})`, 'gi'));
  
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="search-highlight">{part}</mark>
      : part
  );
}
