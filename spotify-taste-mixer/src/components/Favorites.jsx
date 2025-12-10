'use client';

import { useEffect, useState } from 'react';

import './Favorites.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );


  const removeFromFavorites = (trackId) => {
    const updatedFavorites = favorites.filter((track) => track.id !== trackId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-container p-4 bg-gray-800 rounded-lg">
      <h3 className="favorites-title text-white text-xl mb-4">Your Favorites</h3>
      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p className="text-white">No favorites added yet.</p>
        ) : (
          favorites.map((track) => (
            <div key={track.id} className="favorite-item bg-gray-700 p-3 rounded-md mb-3 flex items-center gap-4">
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="favorite-item-image w-16 h-16 object-cover rounded-md"
              />
              <div className="text-white flex-grow">
                <p>{track.name}</p>
                <p>{track.artists?.[0]?.name}</p>
              </div>
              <button
                onClick={() => removeFromFavorites(track.id)}
                className="remove-favorite bg-red-600 px-4 py-2 rounded-md text-white"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
