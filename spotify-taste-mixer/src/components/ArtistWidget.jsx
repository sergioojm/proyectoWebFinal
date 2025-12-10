'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';
import './ArtistWidget.css';

export default function ArtistWidget({ onSelect, selectedItems }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    const token = getAccessToken();

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`, // Limitamos a 5 resultados
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setSearchResults(data.artists.items);
    } catch (error) {
      console.error('Error fetching artists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(() => {
        handleSearch(newQuery);
      }, 300) // 300 ms debounce
    );
  };

  const handleSelectArtist = (artist) => {
    if (!selectedItems.some((item) => item.id === artist.id)) {
      onSelect([...selectedItems, artist]);
    }
  };

  const handleRemoveArtist = (artistId) => {
    onSelect(selectedItems.filter((item) => item.id !== artistId));
  };

  return (
    <div className="widget-container">
      <h2 className="widget-title">Search Artists</h2>

      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search for an artist"
        className="search-input"
      />

      {loading && <div className="loading-text">Loading...</div>}

      <div className="search-results">
        {searchResults.length === 0 && !loading && (
          <div className="no-results">No artists found</div>
        )}
        {searchResults.map((artist) => (
          <div
            key={artist.id}
            className="search-result-item"
            onClick={() => handleSelectArtist(artist)}
          >
            <p>{artist.name}</p>
          </div>
        ))}
      </div>

      <div className="selected-artists">
        <h3 className="selected-artists-title">Selected Artists</h3>
        {selectedItems.length > 0 ? (
          <div className="selected-artists-list">
            {selectedItems.map((artist) => (
              <div key={artist.id} className="selected-artist-item">
                <img
                  src={artist.images[0]?.url || 'default-image.png'}
                  alt={artist.name}
                  className="selected-artist-image"
                />
                <div className="selected-artist-info">
                  <p>{artist.name}</p>
                </div>
                <button
                  onClick={() => handleRemoveArtist(artist.id)}
                  className="remove-artist-button"
                  aria-label={`Remove ${artist.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-artists-selected">No artists selected</p>
        )}
      </div>
    </div>
  );
}
