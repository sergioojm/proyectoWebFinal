'use client';

import '../SongSelectionWidget.css';

export function FavoritesContainer({ favorites, onRemove }) {
  return (
    <div className="favorites-container">
      <h3 className="favorites-title">Your Selection</h3>
      {favorites.length > 0 ? (
        <div className="favorites-list">
          {favorites.map((track) => (
            <div key={track.id} className="favorite-item">
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="favorite-item-image"
              />
              <div className="favorite-item-info">
                <p className="favorite-item-name">{track.name}</p>
                <p className="favorite-item-artist">{track.artists?.[0]?.name}</p>
              </div>
              <button
                onClick={() => onRemove(track.id)}
                className="remove-favorite"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-favorites-selected">No tracks selected</p>
      )}
    </div>
  );
}
