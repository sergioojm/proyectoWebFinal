'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';
import './ArtistsWidget.css';

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
        `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`, 
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
      }, 300) 
    );
  };

  const handleSelectArtist = (artist) => {
    onSelect([...selectedItems, artist]);
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
        {searchResults.length === 0 && !loading && <div className="no-results">No artists found</div>}
        {searchResults.map((artist) => (
          <div key={artist.id} className="search-result-item" onClick={() => handleSelectArtist(artist)}>
            <img
              src={artist.images[0]?.url || 'default-image.png'}
              alt={artist.name}
              className="artist-image"
            />
            <div className="artist-info">
              <h3>{artist.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
