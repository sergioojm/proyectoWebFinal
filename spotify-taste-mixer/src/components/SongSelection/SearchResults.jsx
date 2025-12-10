'use client';

import '../SongSelectionWidget.css';

export function SearchResults({ results, onAddToFavorites }) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="search-results">
      {results.map((track) => (
        <div key={track.id} className="search-result-item">
          <p>{track.name} - {track.artists?.[0]?.name}</p>
          <button
            onClick={() => onAddToFavorites(track)}
            className="add-to-favorites"
          >
            Add to Selection
          </button>
        </div>
      ))}
    </div>
  );
}
