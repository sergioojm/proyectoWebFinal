'use client';

import { useState } from 'react';
import { getAccessToken } from '@/lib/auth';
import './Search.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  
  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    const token = getAccessToken();

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track,artist&limit=5`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setSearchResults(data.tracks.items);
    } catch (error) {
      console.error('Error al buscar', error);
    } finally {
      setLoading(false);
    }
  };

 
  const addToFavorites = (track) => {
    const updatedFavorites = [...favorites, track];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
  };

  return (
    <div className="search-container flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Search for tracks or artists"
        className="search-input p-2 rounded-md bg-gray-700 text-white"
      />
      {loading && <div className="loading text-white">Loading...</div>}

      {query && !loading && (
        <div className="search-results mt-4 max-h-60 overflow-y-auto">
          {searchResults.map((item) => (
            <div key={item.id} className="search-result-item p-2 bg-gray-700 rounded-md text-white mb-2">
              <p>{item.name}</p>
              <p>{item.artists?.[0]?.name}</p>
              <button
                onClick={() => addToFavorites(item)}
                className="add-to-favorites bg-green-500 px-4 py-2 rounded-md text-white mt-2"
              >
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
