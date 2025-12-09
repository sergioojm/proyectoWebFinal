// src/app/search/page.js
'use client';

import { useState } from 'react';
import { getAccessToken } from '@/lib/auth';
import SearchResultCard from '@/components/SearchResultCard';
import '../search/page.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    const token = getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track,artist&limit=10`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    setSearchResults(data.tracks.items);
    setLoading(false);
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Search Spotify</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for tracks or artists"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="search-results">
          {searchResults.map((item) => (
            <SearchResultCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
