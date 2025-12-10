'use client';

import '../SongSelectionWidget.css';

export function SearchInput({ query, onChange, placeholder, loading }) {
  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        disabled={loading}
      />
      {loading && <div className="loading-indicator">Loading...</div>}
    </>
  );
}
